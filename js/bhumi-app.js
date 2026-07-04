/* Bhumi Karmchari Allocation Portal — core logic (vanilla JS, no dependencies).
   ponytail: allocation/render mirror js/app.js but the model is simpler
   (current circle only, per-circle capacity), so this is a separate self-
   contained file rather than a shared-module refactor of the live exec page. */
(function () {
  "use strict";

  var BLOCKS = window.BK_BLOCKS || [];
  var BLOCK = {};
  BLOCKS.forEach(function (b) { BLOCK[b.id] = b; });
  var TOTAL_CAP = BLOCKS.reduce(function (s, b) { return s + b.cap; }, 0);

  var roster = []; // { id, name, nameHi, current, allocated }
  var nextId = 1;

  var I18N = window.I18N;
  function t(key, vars) { return I18N ? I18N.t(key, vars) : key; }
  function lang() { return I18N ? I18N.getLang() : "en"; }

  /* ----------------------------- DOM refs ----------------------------- */
  var addForm = document.getElementById("addForm");
  var empName = document.getElementById("empName");
  var currentBlock = document.getElementById("currentBlock");
  var tableBody = document.getElementById("execTableBody");
  var emptyState = document.getElementById("emptyState");
  var countBadge = document.getElementById("countBadge");
  var allocateBtn = document.getElementById("allocateBtn");
  var printBtn = document.getElementById("printBtn");
  var clearBtn = document.getElementById("clearBtn");
  var loadSeedBtn = document.getElementById("loadSeedBtn");
  var allocNote = document.getElementById("allocNote");
  var unplacedBox = document.getElementById("unplacedBox");
  var capBox = document.getElementById("capBox");
  var printMeta = document.getElementById("printMeta");

  /* ----------------------------- Display helpers ----------------------------- */
  function blockLabel(id) {
    var b = BLOCK[id];
    return b ? (lang() === "hi" ? b.hi : b.en) : "";
  }
  function displayName(x) {
    return lang() === "hi" && x.nameHi ? x.nameHi : x.name;
  }

  /* ----------------------------- Setup ----------------------------- */
  function populateDropdown() {
    var html = '<option value="" disabled selected>' + escapeHtml(t("opt_select")) + "</option>";
    BLOCKS.forEach(function (b) {
      html += '<option value="' + b.id + '">' + escapeHtml(blockLabel(b.id)) + "</option>";
    });
    currentBlock.innerHTML = html;
  }

  function renderCapacities() {
    if (!capBox) return;
    var items = BLOCKS.map(function (b) {
      return '<span class="cap-chip">' + escapeHtml(blockLabel(b.id)) +
        ' <b>' + b.cap + "</b></span>";
    }).join("");
    capBox.innerHTML = '<div class="cap-title">' + escapeHtml(t("bk_cap_title", { cap: TOTAL_CAP })) +
      '</div><div class="cap-list">' + items + "</div>";
  }

  /* ----------------------------- Add / Remove ----------------------------- */
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = empName.value.trim();
    if (!name) return;
    if (!currentBlock.value) { alert(t("alert_pick_current_bk")); return; }
    roster.push({
      id: nextId++, name: name, nameHi: "",
      current: currentBlock.value, allocated: null
    });
    addForm.reset();
    populateDropdown();
    empName.focus();
    render();
  });

  function removeEmp(id) {
    roster = roster.filter(function (x) { return x.id !== id; });
    render();
  }

  clearBtn.addEventListener("click", function () {
    if (!roster.length) return;
    if (confirm(t("confirm_clear"))) { roster = []; render(); }
  });

  /* ----------------------------- Allocation ----------------------------- */
  // Capacity-limited assignment: each employee gets a circle != their current,
  // up to each circle's capacity. Expand circles into capacity slots and run
  // Kuhn's augmenting-path matching. Randomised order → different valid result
  // each run. If the roster exceeds total capacity, extra employees stay unplaced.
  function allocate() {
    if (!roster.length) { allocNote.textContent = ""; if (unplacedBox) unplacedBox.innerHTML = ""; return; }
    roster.forEach(function (x) { x.allocated = null; });

    var slotBlock = [];
    BLOCKS.forEach(function (b) {
      for (var i = 0; i < b.cap; i++) slotBlock.push(b.id);
    });

    function allowed(x, blockId) { return blockId !== x.current; }

    var order = shuffle(roster.slice());
    var slotOrder = shuffle(slotBlock.map(function (_, i) { return i; }));
    var slotEmp = new Array(slotBlock.length).fill(null);
    var byId = {};
    roster.forEach(function (x) { byId[x.id] = x; });

    function tryAssign(empId, visited) {
      var x = byId[empId];
      for (var k = 0; k < slotOrder.length; k++) {
        var s = slotOrder[k];
        if (visited[s] || !allowed(x, slotBlock[s])) continue;
        visited[s] = true;
        if (slotEmp[s] === null || tryAssign(slotEmp[s], visited)) {
          slotEmp[s] = empId;
          return true;
        }
      }
      return false;
    }

    order.forEach(function (x) { tryAssign(x.id, {}); });
    slotEmp.forEach(function (empId, s) {
      if (empId !== null) byId[empId].allocated = slotBlock[s];
    });

    render();

    var unplaced = roster.filter(function (x) { return !x.allocated; });
    if (!unplaced.length) {
      allocNote.className = "alloc-note no-print ok";
      allocNote.textContent = t("bk_alloc_ok", { n: roster.length });
      if (unplacedBox) unplacedBox.innerHTML = "";
    } else {
      allocNote.className = "alloc-note no-print warn";
      allocNote.textContent = t("bk_alloc_partial", {
        placed: roster.length - unplaced.length, n: roster.length,
        un: unplaced.length, cap: TOTAL_CAP
      });
      if (unplacedBox) {
        unplacedBox.innerHTML = '<div class="unplaced-title">' +
          escapeHtml(t("bk_unplaced_title", { n: unplaced.length })) + "</div>" +
          '<div class="unplaced-list">' +
          unplaced.map(function (x) {
            return "<span>" + escapeHtml(displayName(x)) +
              ' <em>(' + escapeHtml(blockLabel(x.current)) + ")</em></span>";
          }).join("") + "</div>";
      }
    }
  }

  allocateBtn.addEventListener("click", allocate);

  /* ----------------------------- Render ----------------------------- */
  function render() {
    tableBody.innerHTML = "";
    countBadge.textContent = roster.length;
    emptyState.style.display = roster.length ? "none" : "block";

    roster.forEach(function (x, i) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td class="col-num">' + (i + 1) + "</td>" +
        "<td>" + escapeHtml(displayName(x)) + "</td>" +
        "<td>" + escapeHtml(blockLabel(x.current)) + "</td>" +
        '<td class="col-alloc">' +
          (x.allocated
            ? '<span class="alloc-pill">' + escapeHtml(blockLabel(x.allocated)) + "</span>"
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
          removeEmp(parseInt(btn.getAttribute("data-id"), 10));
        });
      }
    );
  }

  /* ----------------------------- Print / PDF ----------------------------- */
  printBtn.addEventListener("click", function () {
    if (!roster.length) { alert(t("alert_print_empty")); return; }
    var d = new Date();
    var dateStr = d.toLocaleDateString(lang() === "hi" ? "hi-IN" : "en-IN", {
      day: "2-digit", month: "long", year: "numeric"
    });
    printMeta.innerHTML =
      '<div class="pm-title">' + escapeHtml(t("bk_print_title")) + "</div>" +
      '<div class="pm-row"><span>' + escapeHtml(t("pm_district")) + "</span>" +
      "<span>" + escapeHtml(t("pm_date")) + ": " + escapeHtml(dateStr) + "</span>" +
      "<span>" + escapeHtml(t("pm_total")) + ": " + roster.length + "</span></div>";

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
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ----------------------------- Seed ----------------------------- */
  function loadSeed() {
    var seed = window.BK_SEED || [];
    roster = seed.map(function (s) {
      return { id: nextId++, name: s.name, nameHi: s.nameHi || "", current: s.current, allocated: null };
    });
    render();
  }
  if (loadSeedBtn) {
    if (!(window.BK_SEED && window.BK_SEED.length)) {
      loadSeedBtn.style.display = "none"; // no seed yet
    }
    loadSeedBtn.addEventListener("click", function () {
      if (roster.length && !confirm(t("confirm_reload"))) return;
      nextId = 1;
      loadSeed();
    });
  }

  /* ----------------------------- Language ----------------------------- */
  // Override the shared title (i18n applies the executive page_title) with this
  // page's own title, without modifying i18n.js.
  function setTitle() {
    document.title = t("bk_page_title") + " | " + (lang() === "hi" ? "बिहार सरकार" : "Government of Bihar");
  }
  document.addEventListener("langchange", function () {
    populateDropdown();
    renderCapacities();
    render();
    setTitle();
  });

  /* ----------------------------- Init ----------------------------- */
  if (I18N) { I18N.applyStatic(document); I18N.initToggle(); setTitle(); }
  var yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  populateDropdown();
  renderCapacities();
  loadSeed();
})();
