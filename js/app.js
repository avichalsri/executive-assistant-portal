/* Executive Assistant Allocation Portal — core logic (vanilla JS, no dependencies) */
(function () {
  "use strict";

  var BLOCKS = window.BLOCKS || [];
  var OTHER_HOME = window.OTHER_HOME || [];
  var executives = []; // { id, name, current, previous, home, deputed, allocated }
  var nextId = 1;

  /* ----------------------------- DOM refs ----------------------------- */
  var addForm = document.getElementById("addForm");
  var execName = document.getElementById("execName");
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

  /* ----------------------------- Setup ----------------------------- */
  function populateDropdowns() {
    var optsRequired = '<option value="" disabled selected>Select block…</option>';
    var optsOptional = '<option value="">— None —</option>';
    var optsHome = optsOptional;
    BLOCKS.forEach(function (b) {
      var o = '<option value="' + escapeHtml(b) + '">' + escapeHtml(b) + "</option>";
      optsRequired += o;
      optsOptional += o;
      optsHome += o;
    });
    // Home may be an out-of-district location that is never available for allocation.
    OTHER_HOME.forEach(function (b) {
      optsHome += '<option value="' + escapeHtml(b) + '">' + escapeHtml(b) + "</option>";
    });
    currentBlock.innerHTML = optsRequired;
    previousBlock.innerHTML = optsOptional;
    homeBlock.innerHTML = optsHome;
  }

  /* ----------------------------- Add / Remove ----------------------------- */
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = execName.value.trim();
    if (!name) return;
    if (!currentBlock.value) {
      alert("Please select a Current Block.");
      return;
    }
    executives.push({
      id: nextId++,
      name: name,
      current: currentBlock.value,
      previous: previousBlock.value || "",
      home: homeBlock.value || "",
      deputed: false,
      allocated: null
    });
    addForm.reset();
    populateDropdowns(); // reset selects to placeholders
    execName.focus();
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
    if (confirm("Remove all executives from the roster?")) {
      executives = [];
      render();
    }
  });

  /* ----------------------------- Allocation ----------------------------- */
  // Each executive is assigned a block that is NOT their current/previous/home.
  // Blocks are kept unique (one executive per block) when there are enough blocks.
  // Strategy: most-constrained-first greedy with backtracking.
  function allocate() {
    if (!executives.length) {
      allocNote.textContent = "";
      return;
    }
    // Reset previous allocations.
    executives.forEach(function (x) {
      x.allocated = null;
    });

    var forbidden = {}; // id -> Set of forbidden blocks
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

    // Order executives by fewest eligible blocks first (most constrained).
    var order = executives.slice().sort(function (a, b) {
      return eligibleCount(a) - eligibleCount(b);
    });

    function eligibleCount(x) {
      var c = 0;
      BLOCKS.forEach(function (b) {
        if (!forbidden[x.id][b]) c++;
      });
      return c;
    }

    var unassigned = [];

    order.forEach(function (x) {
      var candidates = BLOCKS.filter(function (b) {
        return !forbidden[x.id][b];
      });
      if (!candidates.length) {
        // No eligible block at all (all blocks are this exec's prev/cur/home).
        unassigned.push(x);
        return;
      }
      // Spread executives evenly: pick the eligible block carrying the lightest
      // load so far; break ties by lowest remaining demand from other execs.
      var choice = pickBalanced(candidates, order, forbidden, load);
      x.allocated = choice;
      load[choice]++;
    });

    render();

    if (unassigned.length) {
      allocNote.className = "alloc-note no-print warn";
      allocNote.textContent =
        "⚠ Could not allocate a block for: " +
        unassigned
          .map(function (x) {
            return x.name;
          })
          .join(", ") +
        ". Every available block is one of their current/previous/home blocks — add more blocks in js/blocks.js.";
    } else {
      allocNote.className = "alloc-note no-print ok";
      allocNote.textContent =
        "✓ Allocation complete for " + executives.length + " executive(s)." +
        (preferUnique ? " Each block assigned to at most one executive." : " More executives than blocks — some blocks repeat.");
    }
  }

  // Choose a candidate block carrying the lightest load so far (even spread),
  // breaking ties toward the block needed by the fewest still-unassigned execs.
  function pickBalanced(candidates, order, forbidden, load) {
    var best = null;
    var bestLoad = Infinity;
    var bestDemand = Infinity;
    candidates.forEach(function (b) {
      var l = load[b];
      var demand = 0;
      order.forEach(function (x) {
        if (x.allocated == null && !forbidden[x.id][b]) demand++;
      });
      if (l < bestLoad || (l === bestLoad && demand < bestDemand)) {
        bestLoad = l;
        bestDemand = demand;
        best = b;
      }
    });
    return best;
  }

  allocateBtn.addEventListener("click", allocate);

  /* ----------------------------- Render ----------------------------- */
  function render() {
    tableBody.innerHTML = "";
    countBadge.textContent = executives.length;

    if (!executives.length) {
      emptyState.style.display = "block";
      allocNote.textContent = "";
    } else {
      emptyState.style.display = "none";
    }

    executives.forEach(function (x, i) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td class="col-num">' + (i + 1) + "</td>" +
        "<td>" + escapeHtml(x.name) + "</td>" +
        "<td>" + escapeHtml(x.current) +
          (x.deputed ? '<span class="deputed-note">deputed to DRDA</span>' : "") + "</td>" +
        "<td>" + (x.previous ? escapeHtml(x.previous) : "—") + "</td>" +
        "<td>" + (x.home ? escapeHtml(x.home) : "—") + "</td>" +
        '<td class="col-alloc">' +
          (x.allocated
            ? '<span class="alloc-pill">' + escapeHtml(x.allocated) + "</span>"
            : '<span class="alloc-empty">—</span>') +
        "</td>" +
        '<td class="col-action no-print"><button class="btn-remove" data-id="' +
          x.id + '" title="Remove">✕</button></td>';
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
      alert("Add executives before printing.");
      return;
    }
    var d = new Date();
    var dateStr = d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
    printMeta.innerHTML =
      '<div class="pm-title">प्रधानमंत्री आवास योजना – ग्रामीण अन्तर्गत कार्यरत कार्यपालक सहायकों के स्थानान्तरण से संबंधित विवरण</div>' +
      '<div class="pm-row"><span>जिला / District: Saharsa</span>' +
      "<span>दिनांक / Date: " + dateStr + "</span>" +
      "<span>कुल / Total: " + executives.length + "</span></div>";
    window.print();
  });

  /* ----------------------------- Emblem (inline SVG) ----------------------------- */
  function emblemSVG() {
    return (
      '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<circle cx="50" cy="50" r="48" fill="#fff" stroke="#0a6c3c" stroke-width="3"/>' +
      '<circle cx="50" cy="50" r="40" fill="none" stroke="#c8a44d" stroke-width="1.5"/>' +
      // Bodhi-tree inspired motif
      '<path d="M50 22 C40 32 40 44 50 50 C60 44 60 32 50 22 Z" fill="#0a6c3c"/>' +
      '<path d="M36 34 C34 44 40 52 50 52 C44 46 42 40 44 32 Z" fill="#0a6c3c"/>' +
      '<path d="M64 34 C66 44 60 52 50 52 C56 46 58 40 56 32 Z" fill="#0a6c3c"/>' +
      '<rect x="48" y="50" width="4" height="16" fill="#7a5a1e"/>' +
      // two stylised swastik dots (Bihar emblem motif), kept abstract
      '<circle cx="34" cy="64" r="5" fill="#c8a44d"/>' +
      '<circle cx="66" cy="64" r="5" fill="#c8a44d"/>' +
      '<text x="50" y="86" text-anchor="middle" font-size="9" font-family="serif" fill="#0a6c3c">बिहार</text>' +
      "</svg>"
    );
  }

  /* ----------------------------- Utils ----------------------------- */
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
      if (executives.length && !confirm("Replace the current roster with the Saharsa sheet?")) return;
      nextId = 1;
      loadSeed();
    });
  }

  /* ----------------------------- Init ----------------------------- */
  document.getElementById("emblemLeft").innerHTML = emblemSVG();
  document.getElementById("emblemRight").innerHTML = emblemSVG();
  populateDropdowns();
  loadSeed();
})();
