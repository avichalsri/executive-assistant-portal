/* Executive Assistant Allocation Portal — core logic (vanilla JS, no dependencies) */
(function () {
  "use strict";

  var BLOCKS = window.BLOCKS || [];
  var OTHER_HOME = window.OTHER_HOME || [];
  var BLOCK_HI = window.BLOCK_HI || {};
  var executives = []; // { id, name, nameHi, current, previous, home, deputed, allocated }
  var nextId = 1;

  var I18N = window.I18N;
  function t(key, vars) { return I18N ? I18N.t(key, vars) : key; }
  function lang() { return I18N ? I18N.getLang() : "en"; }

  /* ----------------------------- DOM refs ----------------------------- */
  var addForm = document.getElementById("addForm");
  var execNameInput = document.getElementById("execName");
  var currentBlock = document.getElementById("currentBlock");
  var previousBlock = document.getElementById("previousBlock");
  var homeBlock = document.getElementById("homeBlock");
  var tableBody = document.getElementById("execTableBody");
  var emptyState = document.getElementById("emptyState");
  var countBadge = document.getElementById("countBadge");
  var allocateBtn = document.getElementById("allocateBtn");
  var printBtn = document.getElementById("printBtn");
  var clearBtn = document.getElementById("clearBtn");
  var allocNote = document.getElementById("allocNote");
  var printMeta = document.getElementById("printMeta");

  /* ----------------------------- Display helpers ----------------------------- */
  // Block ids are canonical English; show Hindi label when in Hindi mode.
  function blockLabel(id) {
    if (!id) return "";
    return lang() === "hi" && BLOCK_HI[id] ? BLOCK_HI[id] : id;
  }
  function displayName(x) {
    return lang() === "hi" && x.nameHi ? x.nameHi : x.name;
  }

  /* ----------------------------- Setup ----------------------------- */
  function populateDropdowns() {
    var optSelect = '<option value="" disabled selected>' + escapeHtml(t("opt_select")) + "</option>";
    var optNone = '<option value="">' + escapeHtml(t("opt_none")) + "</option>";
    var optsRequired = optSelect;
    var optsOptional = optNone;
    var optsHome = optNone;
    BLOCKS.forEach(function (b) {
      var o = '<option value="' + escapeHtml(b) + '">' + escapeHtml(blockLabel(b)) + "</option>";
      optsRequired += o;
      optsOptional += o;
      optsHome += o;
    });
    // Home may be an out-of-district location that is never available for allocation.
    OTHER_HOME.forEach(function (b) {
      optsHome += '<option value="' + escapeHtml(b) + '">' + escapeHtml(blockLabel(b)) + "</option>";
    });
    currentBlock.innerHTML = optsRequired;
    previousBlock.innerHTML = optsOptional;
    homeBlock.innerHTML = optsHome;
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
    executives.push({
      id: nextId++,
      name: name,
      nameHi: "",
      current: currentBlock.value,
      previous: previousBlock.value || "",
      home: homeBlock.value || "",
      deputed: false,
      allocated: null
    });
    addForm.reset();
    populateDropdowns(); // reset selects to placeholders
    execNameInput.focus();
    render();
  });

  function removeExec(id) {
    executives = executives.filter(function (x) {
      return x.id !== id;
    });
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
  // Each executive is assigned a block that is NOT their current/previous/home.
  // Executives are spread evenly across blocks (least-loaded first).
  function allocate() {
    if (!executives.length) {
      allocNote.textContent = "";
      return;
    }
    executives.forEach(function (x) {
      x.allocated = null;
    });

    var forbidden = {}; // id -> map of forbidden blocks
    executives.forEach(function (x) {
      var f = {};
      [x.current, x.previous, x.home].forEach(function (b) {
        if (b) f[b] = true;
      });
      forbidden[x.id] = f;
    });

    var preferUnique = executives.length <= BLOCKS.length;
    var load = {}; // block -> number of executives assigned so far
    BLOCKS.forEach(function (b) {
      load[b] = 0;
    });

    // Randomise executive order so each run yields a different valid assignment.
    var order = shuffle(executives.slice());

    var unassigned = [];

    order.forEach(function (x) {
      var candidates = BLOCKS.filter(function (b) {
        return !forbidden[x.id][b];
      });
      if (!candidates.length) {
        unassigned.push(x);
        return;
      }
      var choice = pickBalanced(candidates, load);
      x.allocated = choice;
      load[choice]++;
    });

    render();

    if (unassigned.length) {
      allocNote.className = "alloc-note no-print warn";
      allocNote.textContent = t("alloc_warn", {
        names: unassigned
          .map(function (x) { return displayName(x); })
          .join(", ")
      });
    } else {
      allocNote.className = "alloc-note no-print ok";
      allocNote.textContent =
        t("alloc_ok", { n: executives.length }) +
        (preferUnique ? t("alloc_unique") : t("alloc_repeat"));
    }
  }

  // Among eligible candidates, pick randomly from those with the lightest load,
  // so allocations stay evenly spread but vary on each run.
  function pickBalanced(candidates, load) {
    var minLoad = Infinity;
    candidates.forEach(function (b) { if (load[b] < minLoad) minLoad = load[b]; });
    var lightest = candidates.filter(function (b) { return load[b] === minLoad; });
    return lightest[Math.floor(Math.random() * lightest.length)];
  }

  allocateBtn.addEventListener("click", allocate);

  /* ----------------------------- Render ----------------------------- */
  function render() {
    tableBody.innerHTML = "";
    countBadge.textContent = executives.length;
    emptyState.style.display = executives.length ? "none" : "block";

    var dash = t("none_dash");
    executives.forEach(function (x, i) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td class="col-num">' + (i + 1) + "</td>" +
        "<td>" + escapeHtml(displayName(x)) + "</td>" +
        "<td>" + escapeHtml(blockLabel(x.current)) +
          (x.deputed ? '<span class="deputed-note">' + escapeHtml(t("deputed_note")) + "</span>" : "") + "</td>" +
        "<td>" + (x.previous ? escapeHtml(blockLabel(x.previous)) : dash) + "</td>" +
        "<td>" + (x.home ? escapeHtml(blockLabel(x.home)) : dash) + "</td>" +
        '<td class="col-alloc">' +
          (x.allocated
            ? '<span class="alloc-pill">' + escapeHtml(blockLabel(x.allocated)) + "</span>"
            : '<span class="alloc-empty">' + dash + "</span>") +
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
    if (!executives.length) {
      alert(t("alert_print_empty"));
      return;
    }
    var d = new Date();
    var dateStr = d.toLocaleDateString(lang() === "hi" ? "hi-IN" : "en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
    printMeta.innerHTML =
      '<div class="pm-title">' + escapeHtml(t("print_title")) + "</div>" +
      '<div class="pm-row"><span>' + escapeHtml(t("pm_district")) + "</span>" +
      "<span>" + escapeHtml(t("pm_date")) + ": " + escapeHtml(dateStr) + "</span>" +
      "<span>" + escapeHtml(t("pm_total")) + ": " + executives.length + "</span></div>";

    // Blank the document title so the browser's auto header doesn't print
    // the portal name; restore it afterwards.
    var savedTitle = document.title;
    document.title = " ";
    var restore = function () {
      document.title = savedTitle;
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    window.print();
    // Fallback for browsers that don't fire afterprint.
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
        current: s.current,
        previous: s.previous || "",
        home: s.home || "",
        deputed: !!s.deputed,
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
  // Re-render dynamic content (dropdowns, table, notes) when language changes.
  document.addEventListener("langchange", function () {
    populateDropdowns();
    render();
  });

  /* ----------------------------- Init ----------------------------- */
  if (I18N) {
    I18N.applyStatic(document);
    I18N.initToggle();
  }
  var yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  populateDropdowns();
  loadSeed();
})();
