/* ============================================================
   i18n.js — Bilingual (English / Hindi) support (no modules).
   - Mark static text with  data-i18n="key"
   - Placeholders with       data-i18n-placeholder="key"
   - Read a string:          I18N.t("key")
   - Switch language:        I18N.setLang("hi")  (fires "langchange")
   ============================================================ */
(function () {
  "use strict";

  var STRINGS = {
    en: {
      page_title: "Executive Assistant Allocation Portal",
      app_title: "Executive Assistant Allocation Portal",
      app_subtitle: "Saharsa District, Government of Bihar",
      scheme: "Pradhan Mantri Awaas Yojana – Gramin",
      gov_title: "बिहार सरकार",
      gov_sub: "Government of Bihar",
      dm_name: "Shri Deepesh Kumar",
      dm_role: "District Magistrate, Saharsa",
      hero_label: "Saharsa Administration",
      hero_title: "Executive Assistant Transfer & Block Allocation",
      hero_lead: "Add executive assistants with their current, previous and home block, then allocate each a new block — never one of those three. Export the result as an official PDF.",

      add_title: "Add Executive",
      f_name: "Executive Name",
      f_name_ph: "e.g. Ramesh Kumar",
      f_current: "Current Block",
      f_previous: "Previous Block",
      f_home: "Home Block",
      opt_select: "Select block…",
      opt_none: "— None —",
      btn_add: "+ Add",
      add_hint: "An allocated block will never be the executive's Current, Previous, or Home block.",

      roster_title: "Executive Roster",
      btn_allocate: "⚙ Allocate Blocks",
      btn_print: "🖨 Print / Export PDF",
      btn_load: "↻ Load Saharsa Sheet",
      btn_clear: "Clear All",

      th_num: "#",
      th_name: "Executive Name",
      th_current: "Current Block",
      th_previous: "Previous Block",
      th_home: "Home Block",
      th_alloc: "Allocated Block",
      th_alloc_hi: "स्थानान्तरित प्रखंड",
      th_action: "Action",
      deputed_note: "deputed to DRDA",
      empty_state: "No executives added yet. Use the form above to add one.",
      remove_title: "Remove",

      print_title: "Pradhan Mantri Awaas Yojana – Gramin: Details of transfer of working Executive Assistants",
      pm_district: "District: Saharsa",
      pm_date: "Date",
      pm_total: "Total",

      footer_note: "© Government of Bihar — Executive Assistant Allocation Portal. For administrative use.",

      alert_pick_current: "Please select a Current Block.",
      alert_print_empty: "Add executives before printing.",
      confirm_clear: "Remove all executives from the roster?",
      confirm_reload: "Replace the current roster with the Saharsa sheet?",
      none_dash: "—",
      alloc_ok: "✓ Allocation complete for {n} executive(s).",
      alloc_unique: " Each block assigned to at most one executive.",
      alloc_repeat: " More executives than blocks — some blocks repeat.",
      alloc_warn: "⚠ Could not allocate a block for: {names}. Every available block is one of their current/previous/home blocks — add more blocks in js/blocks.js."
    },
    hi: {
      page_title: "कार्यपालक सहायक आवंटन पोर्टल",
      app_title: "कार्यपालक सहायक आवंटन पोर्टल",
      app_subtitle: "सहरसा जिला, बिहार सरकार",
      scheme: "प्रधानमंत्री आवास योजना – ग्रामीण",
      gov_title: "बिहार सरकार",
      gov_sub: "Government of Bihar",
      dm_name: "श्री दीपेश कुमार",
      dm_role: "जिला अधिकारी, सहरसा",
      hero_label: "सहरसा प्रशासन",
      hero_title: "कार्यपालक सहायक स्थानान्तरण एवं प्रखंड आवंटन",
      hero_lead: "कार्यपालक सहायकों को उनके वर्तमान, पूर्व एवं गृह प्रखंड के साथ जोड़ें, फिर प्रत्येक को नया प्रखंड आवंटित करें — जो इन तीनों में से कोई नहीं होगा। परिणाम को आधिकारिक PDF के रूप में निर्यात करें।",

      add_title: "कार्यपालक सहायक जोड़ें",
      f_name: "कार्यपालक सहायक का नाम",
      f_name_ph: "उदा. रमेश कुमार",
      f_current: "वर्तमान पदस्थापित प्रखंड",
      f_previous: "पूर्व पदस्थापित प्रखंड",
      f_home: "गृह प्रखंड",
      opt_select: "प्रखंड चुनें…",
      opt_none: "— कोई नहीं —",
      btn_add: "+ जोड़ें",
      add_hint: "आवंटित प्रखंड कभी भी कार्यपालक सहायक का वर्तमान, पूर्व या गृह प्रखंड नहीं होगा।",

      roster_title: "कार्यपालक सहायक सूची",
      btn_allocate: "⚙ प्रखंड आवंटित करें",
      btn_print: "🖨 प्रिंट / PDF निर्यात",
      btn_load: "↻ सहरसा सूची लोड करें",
      btn_clear: "सभी हटाएँ",

      th_num: "क्र०",
      th_name: "कार्यपालक सहायक नाम",
      th_current: "वर्तमान पदस्थापित प्रखंड",
      th_previous: "पूर्व पदस्थापित प्रखंड",
      th_home: "गृह प्रखंड",
      th_alloc: "स्थानान्तरित प्रखंड",
      th_alloc_hi: "Allocated Block",
      th_action: "कार्रवाई",
      deputed_note: "प्रतिनियुक्त डी.आर.डी.ए.",
      empty_state: "अभी तक कोई कार्यपालक सहायक नहीं जोड़ा गया। ऊपर दिए फॉर्म का उपयोग करें।",
      remove_title: "हटाएँ",

      print_title: "प्रधानमंत्री आवास योजना – ग्रामीण अन्तर्गत कार्यरत कार्यपालक सहायकों के स्थानान्तरण से संबंधित विवरण",
      pm_district: "जिला: सहरसा",
      pm_date: "दिनांक",
      pm_total: "कुल",

      footer_note: "© बिहार सरकार — कार्यपालक सहायक आवंटन पोर्टल। प्रशासनिक उपयोग हेतु।",

      alert_pick_current: "कृपया वर्तमान प्रखंड चुनें।",
      alert_print_empty: "प्रिंट करने से पहले कार्यपालक सहायक जोड़ें।",
      confirm_clear: "सूची से सभी कार्यपालक सहायकों को हटाएँ?",
      confirm_reload: "वर्तमान सूची को सहरसा सूची से बदलें?",
      none_dash: "—",
      alloc_ok: "✓ {n} कार्यपालक सहायक(कों) हेतु आवंटन पूर्ण।",
      alloc_unique: " प्रत्येक प्रखंड अधिकतम एक कार्यपालक सहायक को आवंटित।",
      alloc_repeat: " प्रखंडों से अधिक कार्यपालक सहायक — कुछ प्रखंड दोहराए गए हैं।",
      alloc_warn: "⚠ इनके लिए प्रखंड आवंटित नहीं हो सका: {names}। प्रत्येक उपलब्ध प्रखंड इनका वर्तमान/पूर्व/गृह प्रखंड है — js/blocks.js में और प्रखंड जोड़ें।"
    }
  };

  var LS_KEY = "eap_lang";
  var lang = "en";
  try {
    var saved = localStorage.getItem(LS_KEY);
    if (saved === "en" || saved === "hi") lang = saved;
  } catch (e) {}

  function t(key, vars) {
    var s = (STRINGS[lang] && STRINGS[lang][key]) || (STRINGS.en && STRINGS.en[key]) || key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        s = s.replace("{" + k + "}", vars[k]);
      });
    }
    return s;
  }

  function applyStatic(root) {
    root = root || document;
    Array.prototype.forEach.call(root.querySelectorAll("[data-i18n]"), function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    Array.prototype.forEach.call(root.querySelectorAll("[data-i18n-placeholder]"), function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    if (document.title) document.title = t("page_title") + " | " + (lang === "hi" ? "बिहार सरकार" : "Government of Bihar");
    document.documentElement.setAttribute("lang", lang);
    document.body && document.body.setAttribute("data-lang", lang);
  }

  function setLang(next) {
    if (next !== "en" && next !== "hi") return;
    lang = next;
    try { localStorage.setItem(LS_KEY, lang); } catch (e) {}
    applyStatic(document);
    updateToggle();
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
  }

  function getLang() { return lang; }

  function updateToggle() {
    Array.prototype.forEach.call(document.querySelectorAll(".lang-toggle button[data-lang]"), function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === lang ? "true" : "false");
    });
  }

  function initToggle() {
    Array.prototype.forEach.call(document.querySelectorAll(".lang-toggle button[data-lang]"), function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang"));
      });
    });
    updateToggle();
  }

  window.I18N = {
    t: t,
    getLang: getLang,
    setLang: setLang,
    applyStatic: applyStatic,
    initToggle: initToggle
  };
})();
