/* ===== Data for the Executive Assistant Allocation Portal =====
   Source: PMAY-Gramin Executive Assistant transfer sheet, District Saharsa.
   Edit these lists to match your own district / roster. */

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

/* Roster pre-loaded from the official sheet (dated 11.04.2026).
   current / previous / home use the block names above. "deputed" is an
   optional note (प्रतिनियुक्त डी.आर.डी.ए.) shown alongside the current block. */
window.SEED_EXECUTIVES = [
  { name: "Ravi Kumar",          current: "Sour Bazar",         previous: "Sonbarsa",           home: "Khagaria (District)", deputed: true },
  { name: "Sanjeev Kumar Singh", current: "Banma Itahari",      previous: "Salkhua",            home: "Kahara" },
  { name: "Dinesh Kumar",        current: "Mahishi",            previous: "Banma Itahari",      home: "Kahara" },
  { name: "Sandhya Kumari",      current: "Mahishi",            previous: "Simri Bakhtiyarpur", home: "Simri Bakhtiyarpur" },
  { name: "Sikandar Sah",        current: "Kahara",             previous: "Mahishi",            home: "Sattar Kataiya" },
  { name: "Amrendra Kumar Gupta",current: "Simri Bakhtiyarpur", previous: "Patarghat",          home: "Banma Itahari" },
  { name: "Chandan Kumar",       current: "Nauhatta",           previous: "Sour Bazar",         home: "Patarghat", deputed: true },
  { name: "Lakshman Kumar",      current: "Salkhua",            previous: "Kahara",             home: "Simri Bakhtiyarpur" },
  { name: "Rakesh Kumar",        current: "Simri Bakhtiyarpur", previous: "Nauhatta",           home: "Kahara" },
  { name: "Parmanand Yadav",     current: "Sonbarsa",           previous: "Nauhatta",           home: "Sattar Kataiya" },
  { name: "Manajir Alam",        current: "Sattar Kataiya",     previous: "Mahishi",            home: "Supaul (District)" },
  { name: "Amit Kumar Singh",    current: "Sour Bazar",         previous: "Simri Bakhtiyarpur", home: "Sonbarsa" },
  { name: "Gandharv Kumar",      current: "Sonbarsa",           previous: "Patarghat",          home: "Kahara", deputed: true },
  { name: "Pappu Kumar Thakur",  current: "Nauhatta",           previous: "Sattar Kataiya",     home: "Simri Bakhtiyarpur" },
  { name: "Santosh Kumar Sah",   current: "Patarghat",          previous: "Sour Bazar",         home: "Sattar Kataiya" }
];
