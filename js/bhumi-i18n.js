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
      page_title: "Bhumi Karmchari Allocation Portal",
      app_title: "Bhumi Karmchari Allocation Portal",
      app_subtitle: "Saharsa District, Government of Bihar",
      scheme: "Bihar Prashasanik Sudhar Mission Society",
      gov_title: "बिहार सरकार",
      gov_sub: "Government of Bihar",
      dm_name: "Shri Deepesh Kumar",
      dm_role: "District Magistrate, Saharsa",
      hero_label: "Saharsa Administration",
      hero_title: "Bhumi Karmchari Transfer & Office Allocation",
      hero_lead: "Add employees with their previous and current office, then allocate each a new office — never their current or previous — within each office's capacity. Export the result as an official PDF.",

      add_title: "Add Employee",
      f_name: "Employee Name",
      f_name_ph: "e.g. Ramesh Kumar",
      f_current: "Current Office",
      f_previous: "Previous Office",
      opt_select: "Select office…",
      opt_none: "— None (newly appointed) —",
      btn_add: "+ Add",
      tatkal: "(immediate service)",
      add_hint: "An allocated office is never the employee's Current or Previous office, and each office is filled only up to its capacity.",

      roster_title: "Employee Roster",
      btn_allocate: "⚙ Allocate Offices",
      btn_print: "🖨 Print / Export PDF",
      btn_load: "↻ Load Saharsa Sheet",
      btn_clear: "Clear All",

      th_num: "#",
      th_name: "Employee Name",
      th_current: "Current Office",
      th_previous: "Previous Office",
      th_alloc: "Allocated Office",
      th_alloc_hi: "नवपदस्थापित कार्यालय",
      th_action: "Action",
      empty_state: "No employees added yet. Use the form above to add one.",
      remove_title: "Remove",

      print_title: "Details of transfer of Bhumi Karmchari — District Saharsa",
      pm_district: "District: Saharsa",
      pm_date: "Date",
      pm_total: "Total",

      footer_note: "© Government of Bihar — Bhumi Karmchari Allocation Portal. For administrative use.",

      alert_pick_current: "Please select a Current Office.",
      alert_same_office: "Current and Previous office cannot be the same.",
      alert_print_empty: "Add employees before printing.",
      confirm_clear: "Remove all employees from the roster?",
      confirm_reload: "Replace the current roster with the Saharsa sheet?",
      none_dash: "—",
      alloc_ok: "✓ Allocation complete for {n} employee(s). Each office is filled within its capacity.",
      alloc_warn: "⚠ Could not place {count} employee(s): {names}. No eligible office slot is free (offices excluded are their current/previous; capacities are full).",

      nav_exec: "Executive Portal",
      nav_bhumi: "Bhumi Karmchari Portal",

      bk_page_title: "Bhumi Karmchari Allocation Portal",
      bk_app_title: "Bhumi Karmchari Allocation Portal",
      bk_hero_title: "Revenue Employee (Bhumi Karmchari) Transfer & Circle Allocation",
      bk_hero_lead: "Add revenue employees with their current circle, then allocate each a new circle — never their current one — within each circle's capacity.",
      bk_add_title: "Add Revenue Employee",
      bk_f_name: "Employee Name",
      bk_f_current: "Current Circle (Anchal)",
      bk_th_current: "Current Circle",
      bk_th_alloc: "Allocated Circle",
      bk_th_alloc_hi: "नवपदस्थापित अंचल",
      bk_th_cap: "Capacity",
      bk_add_hint: "An allocated circle is never the employee's current circle, and each circle is filled only up to its capacity.",
      bk_roster_title: "Revenue Employee Roster",
      bk_btn_allocate: "⚙ Allocate Circles",
      bk_cap_title: "Circle capacities (total {cap})",
      bk_unplaced_title: "Not placed — capacity full ({n})",
      bk_alloc_ok: "✓ Allocation complete: all {n} employee(s) placed within capacity.",
      bk_alloc_partial: "✓ Placed {placed} of {n}. {un} could not be placed — total capacity ({cap}) is less than the roster size.",
      bk_print_title: "Transfer of Revenue Employees posted in one circle for more than 03 years — District Saharsa",
      bk_th_name: "Employee Name",
      bk_empty_state: "No employees added yet. Use the form above to add one.",
      bk_confirm_clear: "Remove all employees from the roster?",
      bk_alert_print_empty: "Add employees before printing.",
      alert_pick_current_bk: "Please select a Current Circle."
    },
    hi: {
      page_title: "भूमि कर्मचारी आवंटन पोर्टल",
      app_title: "भूमि कर्मचारी आवंटन पोर्टल",
      app_subtitle: "सहरसा जिला, बिहार सरकार",
      scheme: "बिहार प्रशासनिक सुधार मिशन सोसाईटी",
      gov_title: "बिहार सरकार",
      gov_sub: "Government of Bihar",
      dm_name: "श्री दीपेश कुमार",
      dm_role: "जिला अधिकारी, सहरसा",
      hero_label: "सहरसा प्रशासन",
      hero_title: "भूमि कर्मचारी स्थानान्तरण एवं कार्यालय आवंटन",
      hero_lead: "कर्मचारियों को उनके पूर्व एवं वर्तमान कार्यालय के साथ जोड़ें, फिर प्रत्येक को नया कार्यालय आवंटित करें — जो उनका वर्तमान या पूर्व कार्यालय नहीं होगा — प्रत्येक कार्यालय की क्षमता के अनुसार। परिणाम को आधिकारिक PDF के रूप में निर्यात करें।",

      add_title: "कर्मचारी जोड़ें",
      f_name: "कर्मचारी का नाम",
      f_name_ph: "उदा. रमेश कुमार",
      f_current: "वर्तमान पदस्थापन कार्यालय",
      f_previous: "पूर्व पदस्थापन कार्यालय",
      opt_select: "कार्यालय चुनें…",
      opt_none: "— कोई नहीं (नवनियुक्त) —",
      btn_add: "+ जोड़ें",
      tatkal: "(तत्काल सेवा हेतु)",
      add_hint: "आवंटित कार्यालय कभी भी कर्मचारी का वर्तमान या पूर्व कार्यालय नहीं होगा, और प्रत्येक कार्यालय अपनी क्षमता तक ही भरा जाएगा।",

      roster_title: "कर्मचारी सूची",
      btn_allocate: "⚙ कार्यालय आवंटित करें",
      btn_print: "🖨 प्रिंट / PDF निर्यात",
      btn_load: "↻ सहरसा सूची लोड करें",
      btn_clear: "सभी हटाएँ",

      th_num: "क्र०",
      th_name: "कर्मचारी नाम",
      th_current: "वर्तमान पदस्थापन कार्यालय",
      th_previous: "पूर्व पदस्थापन कार्यालय",
      th_alloc: "नवपदस्थापित कार्यालय",
      th_alloc_hi: "Allocated Office",
      th_action: "कार्रवाई",
      empty_state: "अभी तक कोई कर्मचारी नहीं जोड़ा गया। ऊपर दिए फॉर्म का उपयोग करें।",
      remove_title: "हटाएँ",

      print_title: "भूमि कर्मचारियों के स्थानान्तरण से संबंधित विवरण — जिला सहरसा",
      pm_district: "जिला: सहरसा",
      pm_date: "दिनांक",
      pm_total: "कुल",

      footer_note: "© बिहार सरकार — भूमि कर्मचारी आवंटन पोर्टल। प्रशासनिक उपयोग हेतु।",

      alert_pick_current: "कृपया वर्तमान कार्यालय चुनें।",
      alert_same_office: "वर्तमान एवं पूर्व कार्यालय एक ही नहीं हो सकते।",
      alert_print_empty: "प्रिंट करने से पहले कर्मचारी जोड़ें।",
      confirm_clear: "सूची से सभी कर्मचारियों को हटाएँ?",
      confirm_reload: "वर्तमान सूची को सहरसा सूची से बदलें?",
      none_dash: "—",
      alloc_ok: "✓ {n} कर्मचारी(यों) हेतु आवंटन पूर्ण। प्रत्येक कार्यालय अपनी क्षमता तक भरा गया।",
      alloc_warn: "⚠ {count} कर्मचारी(यों) को स्थान नहीं मिला: {names}। कोई उपयुक्त रिक्त कार्यालय उपलब्ध नहीं (वर्तमान/पूर्व वर्जित; क्षमता पूर्ण)।",

      nav_exec: "कार्यपालक सहायक पोर्टल",
      nav_bhumi: "भूमि कर्मचारी पोर्टल",

      bk_page_title: "भूमि कर्मचारी आवंटन पोर्टल",
      bk_app_title: "भूमि कर्मचारी आवंटन पोर्टल",
      bk_hero_title: "राजस्व कर्मचारी (भूमि कर्मचारी) स्थानान्तरण एवं अंचल आवंटन",
      bk_hero_lead: "राजस्व कर्मचारियों को उनके वर्तमान अंचल के साथ जोड़ें, फिर प्रत्येक को नया अंचल आवंटित करें — जो उनका वर्तमान अंचल नहीं होगा — प्रत्येक अंचल की क्षमता के अनुसार।",
      bk_add_title: "राजस्व कर्मचारी जोड़ें",
      bk_f_name: "कर्मचारी का नाम",
      bk_f_current: "वर्तमान अंचल",
      bk_th_current: "वर्तमान अंचल",
      bk_th_alloc: "नवपदस्थापित अंचल",
      bk_th_alloc_hi: "Allocated Circle",
      bk_th_cap: "क्षमता",
      bk_add_hint: "आवंटित अंचल कभी भी कर्मचारी का वर्तमान अंचल नहीं होगा, और प्रत्येक अंचल अपनी क्षमता तक ही भरा जाएगा।",
      bk_roster_title: "राजस्व कर्मचारी सूची",
      bk_btn_allocate: "⚙ अंचल आवंटित करें",
      bk_cap_title: "अंचल क्षमता (कुल {cap})",
      bk_unplaced_title: "स्थान नहीं मिला — क्षमता पूर्ण ({n})",
      bk_alloc_ok: "✓ आवंटन पूर्ण: सभी {n} कर्मचारी क्षमता अनुसार आवंटित।",
      bk_alloc_partial: "✓ {n} में से {placed} आवंटित। {un} को स्थान नहीं मिला — कुल क्षमता ({cap}) सूची से कम है।",
      bk_print_title: "03 वर्ष से अधिक एक अंचल में पदस्थापित राजस्व कर्मचारियों के स्थानान्तरण से संबंधित विवरण — जिला सहरसा",
      bk_th_name: "कर्मचारी नाम",
      bk_empty_state: "अभी तक कोई कर्मचारी नहीं जोड़ा गया। ऊपर दिए फॉर्म का उपयोग करें।",
      bk_confirm_clear: "सूची से सभी कर्मचारियों को हटाएँ?",
      bk_alert_print_empty: "प्रिंट करने से पहले कर्मचारी जोड़ें।",
      alert_pick_current_bk: "कृपया वर्तमान अंचल चुनें।"
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
