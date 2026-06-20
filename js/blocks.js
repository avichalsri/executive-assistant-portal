/* ===== Data for the Executive Assistant Allocation Portal =====
   Source: PMAY-Gramin Executive Assistant transfer sheet, District Saharsa.
   Edit these lists to match your own district / roster.
   Each block has a canonical English id (used internally) and a Hindi label. */

/* The 10 administrative blocks of Saharsa district that can be allocated. */
window.BLOCKS = [
  "Sour Bazar",
  "Sonbarsa",
  "Banma Itahari",
  "Salkhua",
  "Mahishi",
  "Kahara",
  "Simri Bakhtiyarpur",
  "Patarghat",
  "Nauhatta",
  "Sattar Kataiya"
];

/* Out-of-district home locations (selectable as Home only — never allocated). */
window.OTHER_HOME = [
  "Khagaria (District)",
  "Supaul (District)"
];

/* Hindi display labels for every block / location id above. */
window.BLOCK_HI = {
  "Sour Bazar": "सौर बाजार",
  "Sonbarsa": "सोनवर्षा",
  "Banma Itahari": "बनमा ईटहरी",
  "Salkhua": "सलखुआ",
  "Mahishi": "महिषी",
  "Kahara": "कहरा",
  "Simri Bakhtiyarpur": "सिमरी बख्तियारपुर",
  "Patarghat": "पतरघट",
  "Nauhatta": "नवहट्टा",
  "Sattar Kataiya": "सत्तर कटैया",
  "Khagaria (District)": "खगड़िया (जिला)",
  "Supaul (District)": "सुपौल (जिला)"
};

/* Roster pre-loaded from the official sheet (dated 11.04.2026).
   current / previous / home use the block ids above. nameHi is the Hindi
   name; deputed marks प्रतिनियुक्त डी.आर.डी.ए. (deputed to DRDA). */
window.SEED_EXECUTIVES = [
  { name: "Ravi Kumar",           nameHi: "श्री रवि कुमार",           current: "Sour Bazar",         previous: "Sonbarsa",           home: "Khagaria (District)", deputed: true },
  { name: "Sanjeev Kumar Singh",  nameHi: "श्री संजीव कुमार सिंह",     current: "Banma Itahari",      previous: "Salkhua",            home: "Kahara" },
  { name: "Dinesh Kumar",         nameHi: "श्री दिनेश कुमार",          current: "Mahishi",            previous: "Banma Itahari",      home: "Kahara" },
  { name: "Sandhya Kumari",       nameHi: "सुश्री संध्या कुमारी",       current: "Mahishi",            previous: "Simri Bakhtiyarpur", home: "Simri Bakhtiyarpur" },
  { name: "Sikandar Sah",         nameHi: "श्री सिकन्दर साह",          current: "Kahara",             previous: "Mahishi",            home: "Sattar Kataiya" },
  { name: "Amrendra Kumar Gupta", nameHi: "श्री अमरेन्द्र कुमार गुप्ता", current: "Simri Bakhtiyarpur", previous: "Patarghat",          home: "Banma Itahari" },
  { name: "Chandan Kumar",        nameHi: "श्री चंदन कुमार",           current: "Nauhatta",           previous: "Sour Bazar",         home: "Patarghat", deputed: true },
  { name: "Lakshman Kumar",       nameHi: "श्री लक्ष्मण कुमार",         current: "Salkhua",            previous: "Kahara",             home: "Simri Bakhtiyarpur" },
  { name: "Rakesh Kumar",         nameHi: "श्री राकेश कुमार",          current: "Simri Bakhtiyarpur", previous: "Nauhatta",           home: "Kahara" },
  { name: "Parmanand Yadav",      nameHi: "श्री परमानन्द यादव",        current: "Sonbarsa",           previous: "Nauhatta",           home: "Sattar Kataiya" },
  { name: "Manajir Alam",         nameHi: "मो0 मनाजीर आलम",          current: "Sattar Kataiya",     previous: "Mahishi",            home: "Supaul (District)" },
  { name: "Amit Kumar Singh",     nameHi: "श्री अमित कुमार सिंह",       current: "Sour Bazar",         previous: "Simri Bakhtiyarpur", home: "Sonbarsa" },
  { name: "Gandharv Kumar",       nameHi: "श्री गंधर्व कुमार",          current: "Sonbarsa",           previous: "Patarghat",          home: "Kahara", deputed: true },
  { name: "Pappu Kumar Thakur",   nameHi: "श्री पप्पु कुमार ठाकुर",      current: "Nauhatta",           previous: "Sattar Kataiya",     home: "Simri Bakhtiyarpur" },
  { name: "Santosh Kumar Sah",    nameHi: "श्री संतोष कुमार साह",       current: "Patarghat",          previous: "Sour Bazar",         home: "Sattar Kataiya" }
];
