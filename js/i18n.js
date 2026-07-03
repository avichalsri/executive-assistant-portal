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
      f_current: "Current Office",
      f_previous: "Previous Office",
      opt_select: "Select office…",
      opt_none: "— None (newly appointed) —",
      btn_add: "+ Add",
      tatkal: "(immediate service)",
      add_hint: "An allocated office is never the executive's Current or Previous office, and each office is filled only up to its capacity.",

      roster_title: "Executive Roster",
      btn_allocate: "⚙ Allocate Offices",
      btn_print: "🖨 Print / Export PDF",
      btn_load: "↻ Load Saharsa Sheet",
      btn_clear: "Clear All",

      th_num: "#",
      th_name: "Executive Name",
      th_current: "Current Office",
      th_previous: "Previous Office",
      th_alloc: "Allocated Office",
      th_alloc_hi: "नवपदस्थापित कार्यालय",
      th_action: "Action",
      empty_state: "No executives added yet. Use the form above to add one.",
      remove_title: "Remove",

      print_title: "Pradhan Mantri Awaas Yojana – Gramin: Details of transfer of working Executive Assistants",
      pm_district: "District: Saharsa",
      pm_date: "Date",
      pm_total: "Total",

      footer_note: "© Government of Bihar — Executive Assistant Allocation Portal. For administrative use.",

      alert_pick_current: "Please select a Current Office.",
      alert_same_office: "Current and Previous office cannot be the same.",
      alert_print_empty: "Add executives before printing.",
      confirm_clear: "Remove all executives from the roster?",
      confirm_reload: "Replace the current roster with the Saharsa sheet?",
      none_dash: "—",
      alloc_ok: "✓ Allocation complete for {n} executive(s). Each office is filled within its capacity.",
      alloc_warn: "⚠ Could not place {count} executive(s): {names}. No eligible office slot is free (offices excluded are their current/previous; capacities are full)."
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
      f_current: "वर्तमान पदस्थापन कार्यालय",
      f_previous: "पूर्व पदस्थापन कार्यालय",
      opt_select: "कार्यालय चुनें…",
      opt_none: "— कोई नहीं (नवनियुक्त) —",
      btn_add: "+ जोड़ें",
      tatkal: "(तत्काल सेवा हेतु)",
      add_hint: "आवंटित कार्यालय कभी भी कार्यपालक सहायक का वर्तमान या पूर्व कार्यालय नहीं होगा, और प्रत्येक कार्यालय अपनी क्षमता तक ही भरा जाएगा।",

      roster_title: "कार्यपालक सहायक सूची",
      btn_allocate: "⚙ कार्यालय आवंटित करें",
      btn_print: "🖨 प्रिंट / PDF निर्यात",
      btn_load: "↻ सहरसा सूची लोड करें",
      btn_clear: "सभी हटाएँ",

      th_num: "क्र०",
      th_name: "कार्यपालक सहायक नाम",
      th_current: "वर्तमान पदस्थापन कार्यालय",
      th_previous: "पूर्व पदस्थापन कार्यालय",
      th_alloc: "नवपदस्थापित कार्यालय",
      th_alloc_hi: "Allocated Office",
      th_action: "कार्रवाई",
      empty_state: "अभी तक कोई कार्यपालक सहायक नहीं जोड़ा गया। ऊपर दिए फॉर्म का उपयोग करें।",
      remove_title: "हटाएँ",

      print_title: "प्रधानमंत्री आवास योजना – ग्रामीण अन्तर्गत कार्यरत कार्यपालक सहायकों के स्थानान्तरण से संबंधित विवरण",
      pm_district: "जिला: सहरसा",
      pm_date: "दिनांक",
      pm_total: "कुल",

      footer_note: "© बिहार सरकार — कार्यपालक सहायक आवंटन पोर्टल। प्रशासनिक उपयोग हेतु।",

      alert_pick_current: "कृपया वर्तमान कार्यालय चुनें।",
      alert_same_office: "वर्तमान एवं पूर्व कार्यालय एक ही नहीं हो सकते।",
      alert_print_empty: "प्रिंट करने से पहले कार्यपालक सहायक जोड़ें।",
      confirm_clear: "सूची से सभी कार्यपालक सहायकों को हटाएँ?",
      confirm_reload: "वर्तमान सूची को सहरसा सूची से बदलें?",
      none_dash: "—",
      alloc_ok: "✓ {n} कार्यपालक सहायक(कों) हेतु आवंटन पूर्ण। प्रत्येक कार्यालय अपनी क्षमता तक भरा गया।",
      alloc_warn: "⚠ {count} कार्यपालक सहायक(कों) को स्थान नहीं मिला: {names}। कोई उपयुक्त रिक्त कार्यालय उपलब्ध नहीं (वर्तमान/पूर्व वर्जित; क्षमता पूर्ण)।"
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
