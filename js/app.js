/* Executive Assistant Allocation Portal — core logic (vanilla JS, no dependencies) */
(function () {
  "use strict";

  var OFFICES = window.OFFICES || [];
  var OFFICE = {}; // id -> office
  OFFICES.forEach(function (o) { OFFICE[o.id] = o; });
  var ALLOC = OFFICES.filter(function (o) { return o.cap > 0; }); // allocation targets

  var executives = []; // { id, name, nameHi, prev, curr, allocated }
  var nextId = 1;

  var I18N = window.I18N;
  function t(key, vars) { return I18N ? I18N.t(key, vars) : key; }
  function lang() { return I18N ? I18N.getLang() : "en"; }

  /* ----------------------------- DOM refs ----------------------------- */
  var addForm = document.getElementById("addForm");
  var execNameInput = document.getElementById("execName");
  var currentBlock = document.getElementById("currentBlock");
  var previousBlock = document.getElementById("previousBlock");
  var tableBody = document.getElementById("execTableBody");
  var emptyState = document.getElementById("emptyState");
  var countBadge = document.getElementById("countBadge");
  var allocateBtn = document.getElementById("allocateBtn");
  var printBtn = document.getElementById("printBtn");
  var clearBtn = document.getElementById("clearBtn");
  var allocNote = document.getElementById("allocNote");
  var printMeta = document.getElementById("printMeta");

  /* ----------------------------- Display helpers ----------------------------- */
  function officeLabel(id) {
    var o = OFFICE[id];
    if (!o) return "";
    return lang() === "hi" ? o.hi : o.en;
  }
  function displayName(x) {
    return lang() === "hi" && x.nameHi ? x.nameHi : x.name;
  }
  // Deputation / tatkal annotation shown as subtext under a posting.
  function postingNote(p) {
    if (!p) return "";
    var parts = [];
    if (p.tatkal) parts.push(t("tatkal"));
    if (p.dep) parts.push(p.dep);
    return parts.join(" ");
  }
  function postingCell(p) {
    if (!p || !p.office) return t("none_dash");
    var s = escapeHtml(officeLabel(p.office));
    var note = postingNote(p);
    if (note) s += '<span class="deputed-note">' + escapeHtml(note) + "</span>";
    return s;
  }

  /* ----------------------------- Setup ----------------------------- */
  function officeOptions(includeNone) {
    var html = includeNone
      ? '<option value="">' + escapeHtml(t("opt_none")) + "</option>"
      : '<option value="" disabled selected>' + escapeHtml(t("opt_select")) + "</option>";
    OFFICES.forEach(function (o) {
      html += '<option value="' + o.id + '">' + escapeHtml(officeLabel(o.id)) + "</option>";
    });
    return html;
  }
  function populateDropdowns() {
    previousBlock.innerHTML = officeOptions(true);   // previous optional (newly appointed)
    currentBlock.innerHTML = officeOptions(false);   // current required
  }

  /* ----------------------------- Add / Remove ----------------------------- */
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = execNameInput.value.trim();
    if (!name) return;
    if (!currentBlock.value) {
      alert(t("alert_pick_current"));
      return;
    }
    if (previousBlock.value && previousBlock.value === currentBlock.value) {
      alert(t("alert_same_office"));
      return;
    }
    executives.push({
      id: nextId++,
      name: name,
      nameHi: "",
      prev: { office: previousBlock.value || "" },
      curr: { office: currentBlock.value },
      allocated: null
    });
    addForm.reset();
    populateDropdowns();
    execNameInput.focus();
    render();
  });

  function removeExec(id) {
    executives = executives.filter(function (x) { return x.id !== id; });
    render();
  }

  clearBtn.addEventListener("click", function () {
    if (!executives.length) return;
    if (confirm(t("confirm_clear"))) {
      executives = [];
      render();
    }
  });

  /* ----------------------------- Allocation ----------------------------- */
  // Assign each executive an office that is neither their current nor previous
  // office, respecting per-office capacity. This is a capacitated bipartite
  // matching: expand each office into `cap` slots and run Kuhn's augmenting-path
  // algorithm. Maximises placements, so it finds a complete assignment whenever
  // one exists (34 slots for 34 executives → perfect matching when feasible).
  function allocate() {
    if (!executives.length) { allocNote.textContent = ""; return; }
    executives.forEach(function (x) { x.allocated = null; });

    // Build slots: one entry per unit of capacity.
    var slotOffice = [];
    ALLOC.forEach(function (o) {
      for (var i = 0; i < o.cap; i++) slotOffice.push(o.id);
    });

    function allowed(x, officeId) {
      return officeId !== x.curr.office && officeId !== (x.prev && x.prev.office);
    }

    // Randomise executive order and slot-visit order so each run yields a
    // different (still complete) assignment. Kuhn's finds a max matching from
    // any order, so 34/34 placement is preserved whenever feasible.
    var order = shuffle(executives.slice());
    var slotOrder = shuffle(slotOffice.map(function (_, i) { return i; }));

    var slotExec = new Array(slotOffice.length).fill(null); // slot -> exec id
    var execById = {};
    executives.forEach(function (x) { execById[x.id] = x; });

    function tryAssign(execId, visited) {
      var x = execById[execId];
      for (var k = 0; k < slotOrder.length; k++) {
        var s = slotOrder[k];
        if (visited[s] || !allowed(x, slotOffice[s])) continue;
        visited[s] = true;
        if (slotExec[s] === null || tryAssign(slotExec[s], visited)) {
          slotExec[s] = execId;
          return true;
        }
      }
      return false;
    }

    order.forEach(function (x) { tryAssign(x.id, {}); });

    // Read matching back onto executives.
    slotExec.forEach(function (execId, s) {
      if (execId !== null) execById[execId].allocated = slotOffice[s];
    });

    render();

    var unassigned = executives.filter(function (x) { return !x.allocated; });
    if (unassigned.length) {
      allocNote.className = "alloc-note no-print warn";
      allocNote.textContent = t("alloc_warn", {
        count: unassigned.length,
        names: unassigned.map(displayName).join(", ")
      });
    } else {
      allocNote.className = "alloc-note no-print ok";
      allocNote.textContent = t("alloc_ok", { n: executives.length });
    }
  }

  allocateBtn.addEventListener("click", allocate);

  /* ----------------------------- Render ----------------------------- */
  function render() {
    tableBody.innerHTML = "";
    countBadge.textContent = executives.length;
    emptyState.style.display = executives.length ? "none" : "block";

    executives.forEach(function (x, i) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td class="col-num">' + (i + 1) + "</td>" +
        "<td>" + escapeHtml(displayName(x)) + "</td>" +
        "<td>" + postingCell(x.prev) + "</td>" +
        "<td>" + postingCell(x.curr) + "</td>" +
        '<td class="col-alloc">' +
          (x.allocated
            ? '<span class="alloc-pill">' + escapeHtml(officeLabel(x.allocated)) + "</span>"
            : '<span class="alloc-empty">' + t("none_dash") + "</span>") +
        "</td>" +
        '<td class="col-action no-print"><button class="btn-remove" data-id="' +
          x.id + '" title="' + escapeHtml(t("remove_title")) + '">✕</button></td>';
      tableBody.appendChild(tr);
    });

    Array.prototype.forEach.call(
      tableBody.querySelectorAll(".btn-remove"),
      function (btn) {
        btn.addEventListener("click", function () {
          removeExec(parseInt(btn.getAttribute("data-id"), 10));
        });
      }
    );
  }

  /* ----------------------------- Print / PDF ----------------------------- */
  printBtn.addEventListener("click", function () {
    if (!executives.length) { alert(t("alert_print_empty")); return; }
    var d = new Date();
    var dateStr = d.toLocaleDateString(lang() === "hi" ? "hi-IN" : "en-IN", {
      day: "2-digit", month: "long", year: "numeric"
    });
    printMeta.innerHTML =
      '<div class="pm-title">' + escapeHtml(t("print_title")) + "</div>" +
      '<div class="pm-row"><span>' + escapeHtml(t("pm_district")) + "</span>" +
      "<span>" + escapeHtml(t("pm_date")) + ": " + escapeHtml(dateStr) + "</span>" +
      "<span>" + escapeHtml(t("pm_total")) + ": " + executives.length + "</span></div>";

    var savedTitle = document.title;
    document.title = " ";
    var restore = function () {
      document.title = savedTitle;
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    window.print();
    setTimeout(restore, 1000);
  });

  /* ----------------------------- Utils ----------------------------- */
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ----------------------------- Seed ----------------------------- */
  function loadSeed() {
    var seed = window.SEED_EXECUTIVES || [];
    executives = seed.map(function (s) {
      return {
        id: nextId++,
        name: s.name,
        nameHi: s.nameHi || "",
        prev: s.prev || { office: "" },
        curr: s.curr || { office: "" },
        allocated: null
      };
    });
    render();
  }

  var loadSeedBtn = document.getElementById("loadSeedBtn");
  if (loadSeedBtn) {
    loadSeedBtn.addEventListener("click", function () {
      if (executives.length && !confirm(t("confirm_reload"))) return;
      nextId = 1;
      loadSeed();
    });
  }

  /* ----------------------------- Language ----------------------------- */
  document.addEventListener("langchange", function () {
    populateDropdowns();
    render();
  });

  /* ----------------------------- Init ----------------------------- */
  if (I18N) { I18N.applyStatic(document); I18N.initToggle(); }
  var yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  populateDropdowns();
  loadSeed();
})();
