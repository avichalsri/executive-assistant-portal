/* ===== Data for the Bhumi Karmchari (Revenue Employee) Allocation Portal =====
   Source: Saharsa circle capacity note + revenue-employee posting sheets.
   Each circle (अंचल) has a capacity = how many employees it can receive.
   Capacities per the officer's note; total = 60. */
window.BK_BLOCKS = [
  { id: "kahara",        en: "Kahara",              hi: "कहरा",               cap: 4 },
  { id: "sattarkataiya", en: "Sattar Kataiya",      hi: "सत्तर कटैया",         cap: 4 },
  { id: "sourbazar",     en: "Sour Bazar",          hi: "सौर बाजार",           cap: 9 },
  { id: "nauhatta",      en: "Nauhatta",            hi: "नवहट्टा",             cap: 6 },
  { id: "mahishi",       en: "Mahishi",             hi: "महिषी",               cap: 8 },
  { id: "simri",         en: "Simri Bakhtiyarpur",  hi: "सिमरी बख्तियारपुर",   cap: 10 },
  { id: "banma",         en: "Banma Itahari",       hi: "बनमा ईटहरी",          cap: 3 },
  { id: "patarghat",     en: "Patarghat",           hi: "पतरघट",               cap: 5 },
  { id: "sonbarsa",      en: "Sonbarsa",            hi: "सोनवर्षा",            cap: 8 },
  { id: "salkhua",       en: "Salkhua",             hi: "सलखुआ",               cap: 3 }
];

/* Roster of revenue employees (to be provided from the posting sheets).
   Each entry: { name, nameHi, current: <circle id> }.
   Leave empty until the names are transcribed / verified. */
window.BK_SEED = [];
