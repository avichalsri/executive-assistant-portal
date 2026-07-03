/* ===== Data for the Executive Assistant Allocation Portal =====
   Source: PMAY-G / BPSM transfer sheets, District Saharsa (Transfer Proposal June 2026).

   OFFICES = allocation targets + offices that only appear as current/previous.
     cap > 0  → allocatable target, cap = max executives it can hold
     cap = 0  → shown in dropdowns only (never allocated)
   Capacities: Circle=2, Block=1, Subdivision=1, RTPS=1, Welfare=1
     → 10*2 + 10*1 + 2 + 1 + 1 = 34 slots for 34 executives. */

var AREAS = [
  ["kahara", "Kahara", "कहरा"],
  ["sourbazar", "Sour Bazar", "सौर बाजार"],
  ["sonbarsa", "Sonbarsa", "सोनवर्षा"],
  ["mahishi", "Mahishi", "महिषी"],
  ["nauhatta", "Nauhatta", "नवहट्टा"],
  ["patarghat", "Patarghat", "पतरघट"],
  ["simri", "Simri Bakhtiyarpur", "सिमरी बख्तियारपुर"],
  ["salkhua", "Salkhua", "सलखुआ"],
  ["banma", "Banma Itahari", "बनमा ईटहरी"],
  ["sattarkataiya", "Sattar Kataiya", "सत्तर कटैया"]
];

var OFFICES = [];
// Circle offices (अंचल कार्यालय) — capacity 2
AREAS.forEach(function (a) {
  OFFICES.push({ id: "circle-" + a[0], type: "circle", cap: 2,
    en: "Circle Office, " + a[1], hi: "अंचल कार्यालय, " + a[2] });
});
// Block offices (प्रखंड कार्यालय) — capacity 1
AREAS.forEach(function (a) {
  OFFICES.push({ id: "block-" + a[0], type: "block", cap: 1,
    en: "Block Office, " + a[1], hi: "प्रखंड कार्यालय, " + a[2] });
});
// Subdivision offices (अनुमंडल कार्यालय) — capacity 1
OFFICES.push({ id: "subdiv-sadar", type: "subdiv", cap: 1,
  en: "Subdivision Office, Sadar Saharsa", hi: "अनुमंडल कार्यालय, सदर सहरसा" });
OFFICES.push({ id: "subdiv-simri", type: "subdiv", cap: 1,
  en: "Subdivision Office, Simri Bakhtiyarpur", hi: "अनुमंडल कार्यालय, सिमरी बख्तियारपुर" });
// District offices — capacity 1
OFFICES.push({ id: "rtps", type: "district", cap: 1,
  en: "RTPS Cell, Collectorate, Saharsa", hi: "जिला आर.टी.पी.एस., समाहरणालय, सहरसा" });
OFFICES.push({ id: "welfare", type: "district", cap: 1,
  en: "District Welfare Office, Saharsa (SC/ST Welfare)", hi: "जिला कल्याण कार्यालय, सहरसा (अनुसूचित जाति/जनजाति कल्याण हेतु)" });
// Offices that only appear as a current/previous posting (never allocated)
OFFICES.push({ id: "lokshikayat-simri", type: "other", cap: 0,
  en: "Subdivisional Public Grievance Office, Simri Bakhtiyarpur", hi: "अनुमंडलीय लोक शिकायत निवारण कार्यालय, सिमरी बख्तियारपुर" });

window.OFFICES = OFFICES;

/* Roster from the official transfer sheets (34 executives).
   prev / curr: { office: <id>, tatkal: true?, dep: "<Hindi deputation note>"? }
   A blank prev (नवनियुक्त / newly appointed) is { office: "" }. */
window.SEED_EXECUTIVES = [
  { name: "Kundan Kumar",        nameHi: "श्री कुन्दन कुमार",        prev: { office: "rtps" },                              curr: { office: "block-mahishi" } },
  { name: "Rajeev Ranjan Verma", nameHi: "श्री राजीव रंजन वर्मा",     prev: { office: "subdiv-sadar" },                      curr: { office: "circle-mahishi" } },
  { name: "Gautam Prakash",      nameHi: "श्री गौतम प्रकाश",          prev: { office: "block-mahishi" },                     curr: { office: "block-salkhua" } },
  { name: "Ashok Kumar Gupta",   nameHi: "श्री अशोक कुमार गुप्ता",     prev: { office: "circle-sonbarsa" },                   curr: { office: "circle-nauhatta", tatkal: true } },
  { name: "Ratnesh Nandan Prasad", nameHi: "श्री रत्नेश नन्दन प्रसाद", prev: { office: "circle-banma" },                      curr: { office: "circle-sonbarsa", tatkal: true } },
  { name: "Sanjeet Kumar",       nameHi: "श्री संजीत कुमार",          prev: { office: "circle-mahishi" },                    curr: { office: "circle-simri" } },
  { name: "Amit Kumar Jha",      nameHi: "श्री अमित कुमार झा",         prev: { office: "circle-salkhua" },                    curr: { office: "circle-simri", tatkal: true } },
  { name: "Arun Kumar Gupta",    nameHi: "श्री अरुण कुमार गुप्ता",     prev: { office: "circle-sourbazar" },                  curr: { office: "circle-patarghat" } },
  { name: "Amit Kumar Jha",      nameHi: "श्री अमित कुमार झा",         prev: { office: "block-sonbarsa" },                    curr: { office: "block-nauhatta" } },
  { name: "Pintu Kumar",         nameHi: "श्री पिन्टु कुमार",          prev: { office: "circle-kahara" },                     curr: { office: "block-banma" } },
  { name: "Bhaskar Kumar",       nameHi: "श्री भास्कर कुमार",          prev: { office: "circle-mahishi", tatkal: true, dep: "प्रतिनियुक्त जिला स्थापना शाखा, सहरसा" }, curr: { office: "block-simri" } },
  { name: "Ruby Kumari",         nameHi: "श्रीमती रूबी कुमारी",        prev: { office: "circle-patarghat", tatkal: true, dep: "प्रतिनियुक्त अनुमंडल कार्यालय, सदर सहरसा" }, curr: { office: "circle-patarghat", tatkal: true } },
  { name: "Sudarshan Kumar",     nameHi: "श्री सुदर्शन कुमार",         prev: { office: "circle-banma" },                      curr: { office: "circle-salkhua" } },
  { name: "Praveen Kumar",       nameHi: "श्री प्रवीण कुमार",          prev: { office: "circle-kahara" },                     curr: { office: "block-sattarkataiya" } },
  { name: "Vishwajeet Kumar",    nameHi: "श्री विश्वजीत कुमार",        prev: { office: "block-kahara" },                      curr: { office: "circle-sattarkataiya" } },
  { name: "Kapildev Ram",        nameHi: "श्री कपिलदेव राम",          prev: { office: "subdiv-simri" },                      curr: { office: "circle-nauhatta" } },
  { name: "Sudhir Kumar",        nameHi: "श्री सुधीर कुमार",          prev: { office: "block-patarghat" },                   curr: { office: "welfare" } },
  { name: "Pawan Kumar",         nameHi: "श्री पवन कुमार",            prev: { office: "block-nauhatta" },                    curr: { office: "circle-sonbarsa" } },
  { name: "Bhardwaj Thakur",     nameHi: "श्री भारद्वाज ठाकुर",        prev: { office: "circle-sonbarsa", dep: "प्रतिनियुक्त अनुमंडल कार्यालय, सहरसा" }, curr: { office: "circle-kahara" } },
  { name: "Neeraj Kumar",        nameHi: "श्री नीरज कुमार",           prev: { office: "circle-sattarkataiya" },              curr: { office: "circle-kahara", tatkal: true } },
  { name: "Naveen Kumar",        nameHi: "श्री नवीन कुमार",           prev: { office: "circle-simri" },                      curr: { office: "block-patarghat" } },
  { name: "Vishwajeet Kashyap",  nameHi: "श्री विश्वजीत कश्यप",        prev: { office: "circle-nauhatta" },                   curr: { office: "circle-sourbazar" } },
  { name: "Ajeet Kumar Verma",   nameHi: "श्री अजीत कुमार वर्मा",      prev: { office: "circle-sattarkataiya", tatkal: true },curr: { office: "circle-mahishi", tatkal: true } },
  { name: "Kumar Hemant",        nameHi: "श्री कुमार हेमन्त",          prev: { office: "block-kahara" },                      curr: { office: "circle-banma" } },
  { name: "Prateek Karn",        nameHi: "श्री प्रतीक कर्ण",           prev: { office: "circle-simri", tatkal: true },        curr: { office: "block-sourbazar" } },
  { name: "Ravishankar Pathak",  nameHi: "श्री रविशंकर पाठक",         prev: { office: "circle-kahara", tatkal: true },       curr: { office: "circle-sattarkataiya", tatkal: true } },
  { name: "Premlata Kumari",     nameHi: "श्री कुमारी प्रेमलता",       prev: { office: "subdiv-sadar" },                      curr: { office: "block-kahara" } },
  { name: "Ved Prakash Prem",    nameHi: "श्री वेद प्रकाश प्रेम",       prev: { office: "circle-salkhua", tatkal: true },      curr: { office: "subdiv-simri" } },
  { name: "Rohan Raja",          nameHi: "श्री रोहन राजा",            prev: { office: "circle-sonbarsa", tatkal: true },     curr: { office: "subdiv-sadar" } },
  { name: "Santosh Rajak",       nameHi: "श्री संतोष रजक",            prev: { office: "circle-banma", tatkal: true, dep: "प्रतिनियुक्त जिला गोपनीय शाखा, सहरसा" }, curr: { office: "circle-salkhua", tatkal: true, dep: "प्रतिनियुक्त जिला गोपनीय प्रशाखा, सहरसा" } },
  { name: "Pradeep Kumar",       nameHi: "श्री प्रदीप कुमार",          prev: { office: "lokshikayat-simri" },                 curr: { office: "rtps" } },
  { name: "Kumar Suman Singh",   nameHi: "श्री कुमार सुमन सिंह",       prev: { office: "block-simri" },                       curr: { office: "block-sonbarsa" } },
  { name: "Nisha Kumari",        nameHi: "सुश्री निशा कुमारी",         prev: { office: "lokshikayat-simri" },                 curr: { office: "circle-banma", tatkal: true } },
  { name: "Ajay Kumar",          nameHi: "श्री अजय कुमार",            prev: { office: "" },                                  curr: { office: "circle-sourbazar" } }
];
