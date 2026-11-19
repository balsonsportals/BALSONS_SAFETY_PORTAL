/**
 * BALSONS CONTROLLED 7 PERMIT FORMS MASTER SPECIFICATION
 * Extracted directly with 100% fidelity from:
 * BALSONS_JTRWF_PTW_FORMS_V1_1_SEVEN_PERMITS.docx
 */

const BALSONS_EXACT_PTW_FORMS = [
  {
    "code": "PTW-GEN",
    "title": "GENERAL WORK PERMIT",
    "has_sec04": false,
    "stop_work": "Work only within the approved scope, location, conditions and validity.",
    "meta_table": [
      [
        "FORM CODE",
        "PTW-GEN",
        "REVISION",
        "V1.1 \u2013 DRAFT"
      ],
      [
        "PROJECT",
        "JTRWF \u2013 KHORDHA, ODISHA",
        "PERMIT CATEGORY",
        "GENERAL WORK"
      ]
    ],
    "sec01_table": [
      [
        "Applicant / Supervisor",
        "________________________",
        "Contractor / Department",
        "________________________"
      ],
      [
        "Contact No.",
        "________________________",
        "No. of persons",
        "____________"
      ],
      [
        "Work start (date / time)",
        "________________________",
        "Work end (date / time)",
        "________________________"
      ],
      [
        "Exact location / asset",
        "________________________",
        "Related permit reference(s)",
        "________________________"
      ]
    ],
    "sec02_table": [
      [
        "Work activity / task description",
        "____________________________",
        "Exact work location / equipment ID",
        "____________________________"
      ],
      [
        "RA / JSA / method statement reference",
        "____________________________",
        "Personnel / contractor / supervisor",
        "____________________________"
      ],
      [
        "Tools, equipment and materials",
        "____________________________",
        "Work boundary / barricading arrangement",
        "____________________________"
      ],
      [
        "Simultaneous operations / nearby activities",
        "____________________________",
        "Additional details",
        "____________________________"
      ]
    ],
    "sec03_table": [
      [
        "\u2610  Approved RA/JSA and method statement available     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Work area inspected and safe for planned activity     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Personnel briefed and competent for assigned task     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Required PPE available and worn     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Tools and equipment inspected and fit for use     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Access, lighting and housekeeping adequate     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Barricading / warning signage installed where required     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Emergency arrangements and communication understood     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Nearby operations and interfaces reviewed     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Required supporting permits / isolations identified     [ ] Y  [ ] N  [ ] N/A"
      ]
    ],
    "sec05_table": [
      [
        "Identified hazards",
        "____________________________________________________________"
      ],
      [
        "Additional control measures",
        "____________________________________________________________"
      ],
      [
        "PPE / special equipment",
        "____________________________________________________________"
      ],
      [
        "Emergency / rescue arrangements",
        "____________________________________________________________"
      ],
      [
        "RA / JSA / MS / plan / certificate references",
        "____________________________________________________________"
      ]
    ],
    "approval_table": [
      [
        "STAGE",
        "NAME / DESIGNATION",
        "DECISION / SIGNATURE",
        "DATE & TIME"
      ],
      [
        "1. Work Supervisor",
        "____________________",
        "[ ] Submit  [ ] Return",
        "____________"
      ],
      [
        "2. Safety Officer",
        "____________________",
        "[ ] Approve  [ ] Reject",
        "____________"
      ],
      [
        "3. Authorised Site Manager",
        "____________________",
        "[ ] Approve  [ ] Reject",
        "____________"
      ]
    ],
    "closure_table": [
      [
        "Work completed? [ ] Yes [ ] No",
        "Worksite inspected by",
        "Tools / materials removed? [ ] Yes [ ] No",
        "Area left safe? [ ] Yes [ ] No"
      ],
      [
        "Isolation removed by / authority",
        "Outstanding issues / remarks",
        "Closed by / signature",
        "Closure date & time"
      ]
    ]
  },
  {
    "code": "PTW-HOT",
    "title": "HOT WORK PERMIT",
    "has_sec04": false,
    "stop_work": "Stop work if fire protection, atmosphere conditions or fire-watch coverage becomes inadequate.",
    "meta_table": [
      [
        "FORM CODE",
        "PTW-HOT",
        "REVISION",
        "V1.1 \u2013 DRAFT"
      ],
      [
        "PROJECT",
        "JTRWF \u2013 KHORDHA, ODISHA",
        "PERMIT CATEGORY",
        "HOT WORK"
      ]
    ],
    "sec01_table": [
      [
        "Applicant / Supervisor",
        "________________________",
        "Contractor / Department",
        "________________________"
      ],
      [
        "Contact No.",
        "________________________",
        "No. of persons",
        "____________"
      ],
      [
        "Work start (date / time)",
        "________________________",
        "Work end (date / time)",
        "________________________"
      ],
      [
        "Exact location / asset",
        "________________________",
        "Related permit reference(s)",
        "________________________"
      ]
    ],
    "sec02_table": [
      [
        "Hot work type (welding / cutting / grinding / heating)",
        "____________________________",
        "Exact work location and equipment",
        "____________________________"
      ],
      [
        "Combustible materials / fire load",
        "____________________________",
        "Nearby openings, drains, ducts or concealed spaces",
        "____________________________"
      ],
      [
        "Fire watch name and contact",
        "____________________________",
        "Fire extinguisher / hose location",
        "____________________________"
      ],
      [
        "Gas cylinder details and securing arrangement",
        "____________________________",
        "Additional details",
        "____________________________"
      ]
    ],
    "sec03_table": [
      [
        "\u2610  Hot work RA/JSA and method statement approved     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Combustibles removed or protected     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Flammable atmosphere checked where required     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Gas cylinders upright and secured as required     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Hoses, regulators and flashback arrestors inspected     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Suitable fire extinguisher accessible     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Fire watch assigned and briefed     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Screens / spark containment installed     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Adjacent areas checked for fire exposure     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Post-work fire watch duration defined by site procedure     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Hot work equipment isolated and removed after completion     [ ] Y  [ ] N  [ ] N/A",
        ""
      ]
    ],
    "sec05_table": [
      [
        "Identified hazards",
        "____________________________________________________________"
      ],
      [
        "Additional control measures",
        "____________________________________________________________"
      ],
      [
        "PPE / special equipment",
        "____________________________________________________________"
      ],
      [
        "Emergency / rescue arrangements",
        "____________________________________________________________"
      ],
      [
        "RA / JSA / MS / plan / certificate references",
        "____________________________________________________________"
      ]
    ],
    "approval_table": [
      [
        "STAGE",
        "NAME / DESIGNATION",
        "DECISION / SIGNATURE",
        "DATE & TIME"
      ],
      [
        "1. Work Supervisor",
        "____________________",
        "[ ] Submit  [ ] Return",
        "____________"
      ],
      [
        "2. Safety Officer",
        "____________________",
        "[ ] Approve  [ ] Reject",
        "____________"
      ],
      [
        "3. Authorised Site Manager",
        "____________________",
        "[ ] Approve  [ ] Reject",
        "____________"
      ]
    ],
    "closure_table": [
      [
        "Work completed? [ ] Yes [ ] No",
        "Worksite inspected by",
        "Tools / materials removed? [ ] Yes [ ] No",
        "Area left safe? [ ] Yes [ ] No"
      ],
      [
        "Isolation removed by / authority",
        "Outstanding issues / remarks",
        "Closed by / signature",
        "Closure date & time"
      ]
    ]
  },
  {
    "code": "PTW-HT",
    "title": "WORK AT HEIGHT PERMIT",
    "has_sec04": false,
    "stop_work": "Stop work if fall protection, anchorage, access or rescue arrangements are compromised.",
    "meta_table": [
      [
        "FORM CODE",
        "PTW-HT",
        "REVISION",
        "V1.1 \u2013 DRAFT"
      ],
      [
        "PROJECT",
        "JTRWF \u2013 KHORDHA, ODISHA",
        "PERMIT CATEGORY",
        "WORK AT HEIGHT"
      ]
    ],
    "sec01_table": [
      [
        "Applicant / Supervisor",
        "________________________",
        "Contractor / Department",
        "________________________"
      ],
      [
        "Contact No.",
        "________________________",
        "No. of persons",
        "____________"
      ],
      [
        "Work start (date / time)",
        "________________________",
        "Work end (date / time)",
        "________________________"
      ],
      [
        "Exact location / asset",
        "________________________",
        "Related permit reference(s)",
        "________________________"
      ]
    ],
    "sec02_table": [
      [
        "Work height and exact location",
        "____________________________",
        "Access method (scaffold / MEWP / ladder / platform)",
        "____________________________"
      ],
      [
        "Fall prevention system",
        "____________________________",
        "Fall arrest equipment and anchor point details",
        "____________________________"
      ],
      [
        "Rescue plan and rescue equipment",
        "____________________________",
        "Weather / wind conditions",
        "____________________________"
      ]
    ],
    "sec03_table": [
      [
        "\u2610  Work-at-height RA/JSA approved     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Safe platform / access selected     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Scaffold / platform inspected and tagged where required     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Ladders suitable and secured     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Harness, lanyard and connectors inspected     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Anchor / lifeline suitability verified by competent person     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Dropped-object controls and exclusion zone established     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Tools and materials secured against falling     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Weather conditions acceptable     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Rescue plan, trained rescuers and equipment available     [ ] Y  [ ] N  [ ] N/A"
      ]
    ],
    "sec05_table": [
      [
        "Identified hazards",
        "____________________________________________________________"
      ],
      [
        "Additional control measures",
        "____________________________________________________________"
      ],
      [
        "PPE / special equipment",
        "____________________________________________________________"
      ],
      [
        "Emergency / rescue arrangements",
        "____________________________________________________________"
      ],
      [
        "RA / JSA / MS / plan / certificate references",
        "____________________________________________________________"
      ]
    ],
    "approval_table": [
      [
        "STAGE",
        "NAME / DESIGNATION",
        "DECISION / SIGNATURE",
        "DATE & TIME"
      ],
      [
        "1. Work Supervisor",
        "____________________",
        "[ ] Submit  [ ] Return",
        "____________"
      ],
      [
        "2. Safety Officer",
        "____________________",
        "[ ] Approve  [ ] Reject",
        "____________"
      ],
      [
        "3. Authorised Site Manager",
        "____________________",
        "[ ] Approve  [ ] Reject",
        "____________"
      ]
    ],
    "closure_table": [
      [
        "Work completed? [ ] Yes [ ] No",
        "Worksite inspected by",
        "Tools / materials removed? [ ] Yes [ ] No",
        "Area left safe? [ ] Yes [ ] No"
      ],
      [
        "Isolation removed by / authority",
        "Outstanding issues / remarks",
        "Closed by / signature",
        "Closure date & time"
      ]
    ]
  },
  {
    "code": "PTW-CSE",
    "title": "CONFINED SPACE ENTRY PERMIT",
    "has_sec04": true,
    "stop_work": "Evacuate immediately if ventilation fails, gas alarm sounds or communication is lost.",
    "meta_table": [
      [
        "FORM CODE",
        "PTW-CSE",
        "REVISION",
        "V1.1 \u2013 DRAFT"
      ],
      [
        "PROJECT",
        "JTRWF \u2013 KHORDHA, ODISHA",
        "PERMIT CATEGORY",
        "CONFINED SPACE"
      ]
    ],
    "sec01_table": [
      [
        "Applicant / Supervisor",
        "________________________",
        "Contractor / Department",
        "________________________"
      ],
      [
        "Contact No.",
        "________________________",
        "No. of persons",
        "____________"
      ],
      [
        "Work start (date / time)",
        "________________________",
        "Work end (date / time)",
        "________________________"
      ],
      [
        "Exact location / asset",
        "________________________",
        "Related permit reference(s)",
        "________________________"
      ]
    ],
    "sec02_table": [
      [
        "Space identification and entry point",
        "____________________________",
        "Purpose and scope of entry",
        "____________________________"
      ],
      [
        "Authorised entrants",
        "____________________________",
        "Standby attendant / hole watch",
        "____________________________"
      ],
      [
        "Entry supervisor",
        "____________________________",
        "Gas detector ID and calibration status",
        "____________________________"
      ],
      [
        "Continuous / periodic monitoring plan",
        "____________________________",
        "Isolation / blanking / ventilation details",
        "____________________________"
      ],
      [
        "Rescue and retrieval arrangement",
        "____________________________",
        "Additional details",
        "____________________________"
      ]
    ],
    "sec03_table": [
      [
        "\u2610  Confined-space classification and RA approved     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Energy and material sources isolated and verified     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Space cleaned / purged / ventilated as specified     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Atmosphere tested by authorised competent person     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Oxygen, flammable and toxic readings recorded below     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Continuous / periodic monitoring confirmed     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Standby attendant present and communication tested     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Entrants trained and fit as required     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Suitable lighting, tools and PPE available     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Rescue team and equipment ready     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Entry / exit headcount register maintained     [ ] Y  [ ] N  [ ] N/A",
        ""
      ]
    ],
    "sec04_title": "04  ATMOSPHERIC TEST RECORD",
    "sec04_table": [
      [
        "TEST TIME",
        "O\u2082 %",
        "LEL %",
        "TOXIC GAS / READING",
        "TESTER",
        "INSTRUMENT ID"
      ],
      [
        "Before entry",
        "______",
        "______",
        "________________",
        "__________",
        "__________"
      ],
      [
        "During work",
        "______",
        "______",
        "________________",
        "__________",
        "__________"
      ],
      [
        "After break / retest",
        "______",
        "______",
        "________________",
        "__________",
        "__________"
      ]
    ],
    "sec04_note": "Instrument type / serial / calibration date: __________________________________________________",
    "sec05_table": [
      [
        "Identified hazards",
        "____________________________________________________________"
      ],
      [
        "Additional control measures",
        "____________________________________________________________"
      ],
      [
        "PPE / special equipment",
        "____________________________________________________________"
      ],
      [
        "Emergency / rescue arrangements",
        "____________________________________________________________"
      ],
      [
        "RA / JSA / MS / plan / certificate references",
        "____________________________________________________________"
      ]
    ],
    "approval_table": [
      [
        "STAGE",
        "NAME / DESIGNATION",
        "DECISION / SIGNATURE",
        "DATE & TIME"
      ],
      [
        "1. Work Supervisor",
        "____________________",
        "[ ] Submit  [ ] Return",
        "____________"
      ],
      [
        "2. Safety Officer",
        "____________________",
        "[ ] Approve  [ ] Reject",
        "____________"
      ],
      [
        "3. Authorised Site Manager",
        "____________________",
        "[ ] Approve  [ ] Reject",
        "____________"
      ]
    ],
    "closure_table": [
      [
        "Work completed? [ ] Yes [ ] No",
        "Worksite inspected by",
        "Tools / materials removed? [ ] Yes [ ] No",
        "Area left safe? [ ] Yes [ ] No"
      ],
      [
        "Isolation removed by / authority",
        "Outstanding issues / remarks",
        "Closed by / signature",
        "Closure date & time"
      ]
    ]
  },
  {
    "code": "PTW-ELE",
    "title": "ELECTRICAL WORK & LOTO PERMIT",
    "has_sec04": true,
    "stop_work": "Only authorised competent electrical personnel may perform electrical isolation, testing or work.",
    "meta_table": [
      [
        "FORM CODE",
        "PTW-ELE",
        "REVISION",
        "V1.1 \u2013 DRAFT"
      ],
      [
        "PROJECT",
        "JTRWF \u2013 KHORDHA, ODISHA",
        "PERMIT CATEGORY",
        "ELECTRICAL / LOTO"
      ]
    ],
    "sec01_table": [
      [
        "Applicant / Supervisor",
        "________________________",
        "Contractor / Department",
        "________________________"
      ],
      [
        "Contact No.",
        "________________________",
        "No. of persons",
        "____________"
      ],
      [
        "Work start (date / time)",
        "________________________",
        "Work end (date / time)",
        "________________________"
      ],
      [
        "Exact location / asset",
        "________________________",
        "Related permit reference(s)",
        "________________________"
      ]
    ],
    "sec02_table": [
      [
        "Equipment / circuit identification",
        "____________________________",
        "Voltage / supply source",
        "____________________________"
      ],
      [
        "Isolation points and lock numbers",
        "____________________________",
        "Authorised electrical person",
        "____________________________"
      ],
      [
        "Test instrument ID",
        "____________________________",
        "Earthing / discharge requirements",
        "____________________________"
      ],
      [
        "Affected equipment and interfaces",
        "____________________________",
        "Additional details",
        "____________________________"
      ]
    ],
    "sec03_table": [
      [
        "\u2610  Electrical RA/JSA and switching plan available     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Competent authorised electrical personnel assigned     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  All supply sources including backfeed identified     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Isolation carried out by authorised person     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Lockout and tagout applied at identified points     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Absence of voltage tested with approved tester     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Tester proved before and after test where required     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Stored energy discharged / earthing applied as required     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Barriers and warning notices installed     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Adjacent live parts protected     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Re-energisation and handback process agreed     [ ] Y  [ ] N  [ ] N/A",
        ""
      ]
    ],
    "sec04_title": "04  ISOLATION VERIFICATION RECORD",
    "sec04_table": [
      [
        "Isolation point / tag",
        "________________",
        "Lock / tag reference",
        "________________"
      ],
      [
        "Verified by",
        "________________",
        "Verification date / time",
        "________________"
      ],
      [
        "Zero-energy state confirmed",
        "[ ] Yes  [ ] No",
        "Independent check required / done",
        "[ ] Yes  [ ] No"
      ]
    ],
    "sec05_table": [
      [
        "Identified hazards",
        "____________________________________________________________"
      ],
      [
        "Additional control measures",
        "____________________________________________________________"
      ],
      [
        "PPE / special equipment",
        "____________________________________________________________"
      ],
      [
        "Emergency / rescue arrangements",
        "____________________________________________________________"
      ],
      [
        "RA / JSA / MS / plan / certificate references",
        "____________________________________________________________"
      ]
    ],
    "approval_table": [
      [
        "STAGE",
        "NAME / DESIGNATION",
        "DECISION / SIGNATURE",
        "DATE & TIME"
      ],
      [
        "1. Work Supervisor",
        "____________________",
        "[ ] Submit  [ ] Return",
        "____________"
      ],
      [
        "2. Safety Officer",
        "____________________",
        "[ ] Approve  [ ] Reject",
        "____________"
      ],
      [
        "3. Authorised Site Manager",
        "____________________",
        "[ ] Approve  [ ] Reject",
        "____________"
      ]
    ],
    "closure_table": [
      [
        "Work completed? [ ] Yes [ ] No",
        "Worksite inspected by",
        "Tools / materials removed? [ ] Yes [ ] No",
        "Area left safe? [ ] Yes [ ] No"
      ],
      [
        "Isolation removed by / authority",
        "Outstanding issues / remarks",
        "Closed by / signature",
        "Closure date & time"
      ]
    ]
  },
  {
    "code": "PTW-MHI",
    "title": "MECHANICAL / HYDRAULIC ISOLATION PERMIT",
    "has_sec04": true,
    "stop_work": "Do not rely solely on switches, gauges or software indications as proof of isolation.",
    "meta_table": [
      [
        "FORM CODE",
        "PTW-MHI",
        "REVISION",
        "V1.1 \u2013 DRAFT"
      ],
      [
        "PROJECT",
        "JTRWF \u2013 KHORDHA, ODISHA",
        "PERMIT CATEGORY",
        "MECHANICAL / HYDRAULIC ISOLATION"
      ]
    ],
    "sec01_table": [
      [
        "Applicant / Supervisor",
        "________________________",
        "Contractor / Department",
        "________________________"
      ],
      [
        "Contact No.",
        "________________________",
        "No. of persons",
        "____________"
      ],
      [
        "Work start (date / time)",
        "________________________",
        "Work end (date / time)",
        "________________________"
      ],
      [
        "Exact location / asset",
        "________________________",
        "Related permit reference(s)",
        "________________________"
      ]
    ],
    "sec02_table": [
      [
        "Machine / system identification",
        "____________________________",
        "Mechanical, hydraulic, pneumatic and gravity energy sources",
        "____________________________"
      ],
      [
        "Isolation points and lock / tag numbers",
        "____________________________",
        "Stored pressure / accumulator details",
        "____________________________"
      ],
      [
        "Blocking / chocking / restraint details",
        "____________________________",
        "Verification method and responsible person",
        "____________________________"
      ]
    ],
    "sec03_table": [
      [
        "\u2610  Approved isolation plan and RA/JSA available     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  All energy sources identified     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Machine stopped and secured against restart     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Associated electrical energy isolated as required     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Hydraulic / pneumatic pressure safely released or contained     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Accumulators and stored energy addressed     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Raised / suspended components mechanically supported     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Gravity movement and rotating parts restrained     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Zero-energy state verified by competent person     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Locks / tags and warning notices applied     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Safe reinstatement sequence defined     [ ] Y  [ ] N  [ ] N/A",
        ""
      ]
    ],
    "sec04_title": "04  ISOLATION VERIFICATION RECORD",
    "sec04_table": [
      [
        "Isolation point / tag",
        "________________",
        "Lock / tag reference",
        "________________"
      ],
      [
        "Verified by",
        "________________",
        "Verification date / time",
        "________________"
      ],
      [
        "Zero-energy state confirmed",
        "[ ] Yes  [ ] No",
        "Independent check required / done",
        "[ ] Yes  [ ] No"
      ]
    ],
    "sec05_table": [
      [
        "Identified hazards",
        "____________________________________________________________"
      ],
      [
        "Additional control measures",
        "____________________________________________________________"
      ],
      [
        "PPE / special equipment",
        "____________________________________________________________"
      ],
      [
        "Emergency / rescue arrangements",
        "____________________________________________________________"
      ],
      [
        "RA / JSA / MS / plan / certificate references",
        "____________________________________________________________"
      ]
    ],
    "approval_table": [
      [
        "STAGE",
        "NAME / DESIGNATION",
        "DECISION / SIGNATURE",
        "DATE & TIME"
      ],
      [
        "1. Work Supervisor",
        "____________________",
        "[ ] Submit  [ ] Return",
        "____________"
      ],
      [
        "2. Safety Officer",
        "____________________",
        "[ ] Approve  [ ] Reject",
        "____________"
      ],
      [
        "3. Authorised Site Manager",
        "____________________",
        "[ ] Approve  [ ] Reject",
        "____________"
      ]
    ],
    "closure_table": [
      [
        "Work completed? [ ] Yes [ ] No",
        "Worksite inspected by",
        "Tools / materials removed? [ ] Yes [ ] No",
        "Area left safe? [ ] Yes [ ] No"
      ],
      [
        "Isolation removed by / authority",
        "Outstanding issues / remarks",
        "Closed by / signature",
        "Closure date & time"
      ]
    ]
  },
  {
    "code": "PTW-LFT",
    "title": "LIFTING & RIGGING PERMIT",
    "has_sec04": true,
    "stop_work": "Any change in load, configuration, radius, ground or conditions requires reassessment.",
    "meta_table": [
      [
        "FORM CODE",
        "PTW-LFT",
        "REVISION",
        "V1.1 \u2013 DRAFT"
      ],
      [
        "PROJECT",
        "JTRWF \u2013 KHORDHA, ODISHA",
        "PERMIT CATEGORY",
        "LIFTING / RIGGING"
      ]
    ],
    "sec01_table": [
      [
        "Applicant / Supervisor",
        "________________________",
        "Contractor / Department",
        "________________________"
      ],
      [
        "Contact No.",
        "________________________",
        "No. of persons",
        "____________"
      ],
      [
        "Work start (date / time)",
        "________________________",
        "Work end (date / time)",
        "________________________"
      ],
      [
        "Exact location / asset",
        "________________________",
        "Related permit reference(s)",
        "________________________"
      ]
    ],
    "sec02_table": [
      [
        "Load description and verified weight",
        "____________________________",
        "Load dimensions / centre of gravity",
        "____________________________"
      ],
      [
        "Crane / lifting machine ID and configuration",
        "____________________________",
        "Rated capacity at operating radius",
        "____________________________"
      ],
      [
        "Lifting accessories and identification numbers",
        "____________________________",
        "Lift supervisor / operator / rigger / signalman",
        "____________________________"
      ],
      [
        "Lifting plan reference and lift classification",
        "____________________________",
        "Ground bearing / support condition",
        "____________________________"
      ],
      [
        "Exclusion zone and travel path",
        "____________________________",
        "Additional details",
        "____________________________"
      ]
    ],
    "sec03_table": [
      [
        "\u2610  Approved lifting plan and task risk assessment available     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Load weight and centre of gravity verified     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Crane capacity checked for radius and configuration     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Crane inspection / statutory documents valid as required     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Operator competency verified     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Rigger and signalman competency verified     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Slings, shackles, hooks and accessories inspected     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Sling angles and rigging arrangement checked by competent person     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Ground condition, outrigger support and mats verified     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Weather / wind limits checked     [ ] Y  [ ] N  [ ] N/A"
      ],
      [
        "\u2610  Trial lift and communication method agreed     [ ] Y  [ ] N  [ ] N/A",
        "\u2610  Exclusion zone and tag-line arrangements established     [ ] Y  [ ] N  [ ] N/A"
      ]
    ],
    "sec04_title": "04  LIFTING CONFIGURATION RECORD",
    "sec04_table": [
      [
        "Load weight",
        "____________",
        "Operating radius",
        "____________"
      ],
      [
        "Crane capacity at radius",
        "____________",
        "Utilisation / margin",
        "____________"
      ],
      [
        "Accessory capacity / ID",
        "____________",
        "Ground support verified by",
        "____________"
      ]
    ],
    "sec05_table": [
      [
        "Identified hazards",
        "____________________________________________________________"
      ],
      [
        "Additional control measures",
        "____________________________________________________________"
      ],
      [
        "PPE / special equipment",
        "____________________________________________________________"
      ],
      [
        "Emergency / rescue arrangements",
        "____________________________________________________________"
      ],
      [
        "RA / JSA / MS / plan / certificate references",
        "____________________________________________________________"
      ]
    ],
    "approval_table": [
      [
        "STAGE",
        "NAME / DESIGNATION",
        "DECISION / SIGNATURE",
        "DATE & TIME"
      ],
      [
        "1. Work Supervisor",
        "____________________",
        "[ ] Submit  [ ] Return",
        "____________"
      ],
      [
        "2. Safety Officer",
        "____________________",
        "[ ] Approve  [ ] Reject",
        "____________"
      ],
      [
        "3. Authorised Site Manager",
        "____________________",
        "[ ] Approve  [ ] Reject",
        "____________"
      ]
    ],
    "closure_table": [
      [
        "Work completed? [ ] Yes [ ] No",
        "Worksite inspected by",
        "Tools / materials removed? [ ] Yes [ ] No",
        "Area left safe? [ ] Yes [ ] No"
      ],
      [
        "Isolation removed by / authority",
        "Outstanding issues / remarks",
        "Closed by / signature",
        "Closure date & time"
      ]
    ]
  }
];

/**
 * BALSONS HIGH-FIDELITY SAMPLE DEMO DATA FOR ALL 7 CONTROLLED PERMITS
 * Authentic JTRWF Khordha Project heavy engineering and rigging parameters.
 */
const BALSONS_PTW_SAMPLE_DATA = {
  "PTW-GEN": {
    permitNo: "PTW-JTRWF-2026-0042",
    date: "2026-11-19",
    area: "AREA-01 AXLE FORGING LINE",
    applicant: "R. K. Sharma (Sr. Erection Engineer)",
    contact: "+91 94370 12345",
    contractor: "BALSONS HEAVY LIFT & SHIFT",
    persons: "8 Persons (Inducted & Medically Fit)",
    startDt: "2026-11-19T08:00",
    endDt: "2026-11-19T18:00",
    location: "Bay-3, Axle Press 4000T Foundation Pit",
    related: "PTW-LFT-0022, PTW-ELE-0018",
    sec02: {
      "Work activity / task": "Unloading, shifting & precision positioning of 4000T Axle Press Main Hydraulic Cylinder (Weight: 68 MT)",
      "Purpose and scope": "Erection & alignment onto foundation bed plate as per Jupiter Project Drawing #JTRWF-DWG-AX-004",
      "Tools / equipment to be used": "150T Crawler Crane, 200T Hydraulic Jacking System, Heavy Slings, D-Shackles, Torque Wrenches",
      "Exact work location / asset ID": "Bay-3, Axle Press Line Pit #01",
      "Applicable RA / JSA ref.": "JSA-JTRWF-AREA01-042-REV02"
    },
    hazards: "Suspended heavy load (68 MT), hydraulic line residual pressure, pinch points, trip hazards.",
    controls: "15M barricaded exclusion zone, qualified rigger and banksman stationed, hydraulic lines tagged and depressurised.",
    ppe: "Safety helmet, steel toe boots, high-vis vest, cut-resistant gloves, safety goggles.",
    emergency: "Site Ambulance / OHC: Ext 222 (+91 94370 99911), Fire Control: Ext 101",
    references: "JSA-JTRWF-AREA01-042-REV02, Lift Plan #LP-2026-018, Rigging Drawing #RD-09",
    declName: "R. K. Sharma",
    declSigned: true,
    declDt: "2026-11-19T07:45",
    supDecision: "SUBMITTED",
    supName: "R. K. Sharma",
    supDate: "2026-11-19",
    soDecision: "ENDORSED",
    soName: "Manoj Kumar (Site Safety Officer)",
    soDate: "2026-11-19",
    smDecision: "APPROVED",
    smName: "Gajendra Rao (Project Manager)",
    smDate: "2026-11-19",
    issuerName: "Gajendra Rao",
    validFrom: "2026-11-19T08:00",
    validTo: "2026-11-19T18:00",
    closeStatus: "ACTIVE",
    closeNotes: "Permit active in execution under continuous safety supervision."
  },
  "PTW-HOT": {
    permitNo: "PTW-JTRWF-2026-0043",
    date: "2026-11-19",
    area: "AREA-02 WHEEL FORGING LINE",
    applicant: "V. Suresh (Welding Supervisor)",
    contact: "+91 94370 23456",
    contractor: "BALSONS FABRICATION WING",
    persons: "4 Certified Welders & 2 Riggers",
    startDt: "2026-11-19T09:00",
    endDt: "2026-11-19T17:00",
    location: "Wheel Press Bedframe Line, Grid B4-B6",
    related: "PTW-GEN-0039",
    sec02: {
      "Description of hot work / task": "Structural fillet welding and oxy-acetylene gouging on Wheel Press Base Frame reinforcement stiffener plates",
      "Specific equipment / process": "Shielded Metal Arc Welding (SMAW), Oxy-Acetylene Torch, 9\" Angle Grinder",
      "Fire watch person(s)": "Subhash Patra (Certified Fire Watch)",
      "Fire watch duration after completion": "60 minutes post hot-work continuous watch",
      "Location and clearance radius": "Bay 2, 10-meter combustible clearance perimeter maintained",
      "Applicable RA / JSA ref.": "JSA-JTRWF-AREA02-HOT-011"
    },
    hazards: "Open flame, hot sparks, flying slag, flammable gases (O2 & Acetylene), fume inhalation, burn injury.",
    controls: "Fire retardant blanket containment booth, spark arrestors, flash back arrestors on gas cylinders, 10m perimeter cleared.",
    ppe: "Auto-darkening welding helmet, leather welding gloves, leather apron & spats, safety boots, safety glasses, N95 fume mask.",
    emergency: "2x 9kg DCP extinguishers & 1x 45L mechanical foam trolley at hot work station, site fire alarm call point Bay 2.",
    references: "Hot Work JSA Rev-03, Welder Qualification Records (WQR), Cylinder Inspection Checklist.",
    declName: "V. Suresh",
    declSigned: true,
    declDt: "2026-11-19T08:30",
    supDecision: "SUBMITTED",
    supName: "V. Suresh",
    supDate: "2026-11-19",
    soDecision: "ENDORSED",
    soName: "Manoj Kumar (Site Safety Officer)",
    soDate: "2026-11-19",
    smDecision: "APPROVED",
    smName: "Gajendra Rao (Project Manager)",
    smDate: "2026-11-19",
    issuerName: "Gajendra Rao",
    validFrom: "2026-11-19T09:00",
    validTo: "2026-11-19T17:00",
    closeStatus: "ACTIVE",
    closeNotes: "Active under certified fire watch supervision."
  },
  "PTW-HT": {
    permitNo: "PTW-JTRWF-2026-0044",
    date: "2026-11-19",
    area: "AREA-01 AXLE FORGING LINE",
    applicant: "A. K. Verma (Rigger In-Charge)",
    contact: "+91 94370 34567",
    contractor: "BALSONS HEAVY LIFT & SHIFT",
    persons: "5 Certified Scaffolders & Riggers",
    startDt: "2026-11-19T08:30",
    endDt: "2026-11-19T16:30",
    location: "EOT Crane Runway Girders, Bay 1 (Level +12.5m)",
    related: "PTW-ELE-0021 (Busbar Isolation)",
    sec02: {
      "Description of work at height": "Overhead crane runway rail alignment, fishplate bolt tightening, and structural bracket torque verification",
      "Maximum working height": "12.5 Meters above ground level",
      "Primary access method": "Engineered Cuplock Mobile Scaffold Tower & certified structural caged ladder",
      "Scaffold / access equipment ID": "SCAF-BAY1-088 (Green Tag Inspected Today)",
      "Fall-arrest system details": "Continuous 12mm stainless steel lifeline with dual shock-absorbing lanyards and fall arrest harness",
      "Anchor point specification": "15 kN rated overhead structural beam anchor clamps",
      "Drop / exclusion zone controls": "Full perimeter ground barricade tape with warning signage, chin-strapped helmets, tool lanyards on all hand tools",
      "Applicable RA / JSA ref.": "JSA-JTRWF-HT-019-REV01"
    },
    hazards: "Fall from height (12.5m), falling objects/tools striking personnel below, structural slip/trip, windy gusts.",
    controls: "100% tie-off mandatory, green tagged scaffold, barricaded drop zone below, tool tethering lanyards on all tools.",
    ppe: "EN 361 certified full body harness with twin lanyard & shock absorber, safety helmet with chin strap, high-grip safety boots.",
    emergency: "Rescue harness kit and descent recovery device on standby, trained rescue team leader stationed at platform base.",
    references: "Height Work JSA Rev-02, Daily Scaffold Inspection Checklist Tag #088.",
    declName: "A. K. Verma",
    declSigned: true,
    declDt: "2026-11-19T08:00",
    supDecision: "SUBMITTED",
    supName: "A. K. Verma",
    supDate: "2026-11-19",
    soDecision: "ENDORSED",
    soName: "Manoj Kumar (Site Safety Officer)",
    soDate: "2026-11-19",
    smDecision: "APPROVED",
    smName: "Gajendra Rao (Project Manager)",
    smDate: "2026-11-19",
    issuerName: "Gajendra Rao",
    validFrom: "2026-11-19T08:30",
    validTo: "2026-11-19T16:30",
    closeStatus: "ACTIVE",
    closeNotes: "Working with 100% tie-off compliance."
  },
  "PTW-CSE": {
    permitNo: "PTW-JTRWF-2026-0045",
    date: "2026-11-19",
    area: "AREA-03 MACHINE SHOP",
    applicant: "D. C. Jena (Mechanical Engineer)",
    contact: "+91 94370 45678",
    contractor: "BALSONS MECHANICAL TEAM",
    persons: "3 Entrants, 1 Standby Person, 1 Gas Tester",
    startDt: "2026-11-19T09:00",
    endDt: "2026-11-19T15:00",
    location: "Underground Hydraulic Sump & Sludge Trench (Pit Depth: 4.2m)",
    related: "PTW-ELE-0024 (Sump Pump Isolation), PTW-MHI-0012",
    sec02: {
      "Confined space identification": "Machine Shop Hydraulic Return Pit #CSP-03",
      "Purpose of entry": "Internal inspection of suction strainer, cleaning of sludge deposits, and ultrasonic wall thickness measurement",
      "Identified atmosphere risks": "Oxygen deficiency, accumulation of organic oil vapours, combustible hydrocarbon gases",
      "Isolation status summary": "Inlet gravity drains blanked; sump pump 415V supply locked out at MCC; hydraulic lines depressurised",
      "Ventilation method and duration": "Forced mechanical ventilation using 3500 CFM explosion-proof air blower for 45 mins prior to entry and continuous during entry",
      "Standby person(s) name": "K. C. Nayak (Certified Standby / Attendant)",
      "Rescue plan reference": "CSE-RESCUE-PLAN-REV02 (Tripod & Sala Retrieval Winch Installed)",
      "Applicable RA / JSA ref.": "JSA-JTRWF-CSE-007-REV03"
    },
    sec04_cse: [
      { time: "08:30 (Before entry)", o2: "20.9%", lel: "0%", toxic: "CO: 0 ppm, H2S: 0 ppm", tester: "Manoj Kumar", inst: "Altair 4XR #GT-012" },
      { time: "10:30 (Shift 1)", o2: "20.9%", lel: "0%", toxic: "CO: 1 ppm, H2S: 0 ppm", tester: "Manoj Kumar", inst: "Altair 4XR #GT-012" },
      { time: "12:30 (Shift 2)", o2: "20.8%", lel: "0%", toxic: "CO: 1 ppm, H2S: 0 ppm", tester: "Manoj Kumar", inst: "Altair 4XR #GT-012" },
      { time: "13:45 (Post break)", o2: "20.9%", lel: "0%", toxic: "CO: 0 ppm, H2S: 0 ppm", tester: "Manoj Kumar", inst: "Altair 4XR #GT-012" }
    ],
    hazards: "Oxygen deficiency, hazardous hydrocarbon vapours, restricted egress through 600mm manhole, slipping in sludge.",
    controls: "Continuous forced mechanical air ventilation, calibrated multi-gas monitor with audible alarm, tripod retrieval winch.",
    ppe: "Chemical resistant overalls, nitrile inner and heavy rubber outer boots, full body harness connected to retrieval winch line.",
    emergency: "Retrieval tripod winch ready at opening, escape SCBA (15-min bottle) at entrance, medical emergency team alerted.",
    references: "CSE Entry & Rescue Plan #007, Altair 4XR Calibration Certificate #CAL-9921.",
    declName: "D. C. Jena",
    declSigned: true,
    declDt: "2026-11-19T08:30",
    supDecision: "SUBMITTED",
    supName: "D. C. Jena",
    supDate: "2026-11-19",
    soDecision: "ENDORSED",
    soName: "Manoj Kumar (Site Safety Officer)",
    soDate: "2026-11-19",
    smDecision: "APPROVED",
    smName: "Gajendra Rao (Project Manager)",
    smDate: "2026-11-19",
    issuerName: "Gajendra Rao",
    validFrom: "2026-11-19T09:00",
    validTo: "2026-11-19T15:00",
    closeStatus: "ACTIVE",
    closeNotes: "Attendant in continuous communication."
  },
  "PTW-ELE": {
    permitNo: "PTW-JTRWF-2026-0046",
    date: "2026-11-19",
    area: "AREA-04 DIE SHOP",
    applicant: "P. K. Mishra (Chief Electrical Engineer)",
    contact: "+91 94370 56789",
    contractor: "BALSONS ELECTRICAL SERVICES",
    persons: "4 Licenced Electrical Technicians",
    startDt: "2026-11-19T08:00",
    endDt: "2026-11-19T14:00",
    location: "Substation-2, LT Switchgear Panel-4 & Die Shop Transformer TR-02",
    related: "PTW-GEN-0041",
    sec02: {
      "Description of electrical work": "Internal busbar contact cleaning, torque checking of main breaker terminals, and dielectric insulation resistance (Megger) testing",
      "System / circuit / equipment ID": "11kV / 433V 2000kVA Transformer TR-02 & Incomer Breaker ACB-04",
      "Operating voltage": "11,000 Volts HT / 415 Volts LT",
      "Isolation boundaries": "11kV HT Breaker VCB-02 racked out & locked; 415V LT Incomer ACB-04 racked out & locked",
      "Live testing / verification required": "Zero energy potential testing with calibrated 11kV HT capacitive detector rod before earthing",
      "Earthing details": "HT side integral earth switch closed & padlocked; portable discharge grounding leads connected on LT bus",
      "Competent electrical supervisor": "P. K. Mishra (Licence #EL-OR-44821-HT)",
      "Applicable RA / JSA ref.": "JSA-JTRWF-ELE-014-REV02"
    },
    sec04_ele: {
      point: "Substation-2, HT Incomer VCB-02 & LT Panel Incomer ACB-04",
      lock: "LOTO-JTRWF-E-044 / Red Padlocks #77 & #78",
      verifier: "P. K. Mishra (Electrical Supervisor)",
      dt: "2026-11-19T07:30"
    },
    hazards: "Electric shock, arc flash exposure (Category 4), electrocution, residual capacitive charge.",
    controls: "Locked out and tagged out (LOTO), racked out breaker shutters locked, zero energy verified, portable earth leads clamped.",
    ppe: "40 cal/cm² Arc Flash suit with hood, 15kV rated electrical insulating rubber gloves with leather outer, dielectric safety shoes.",
    emergency: "Insulated rescue hook positioned outside panel room, CPR trained first aider on standby, Substation main trip button marked.",
    references: "Switching Sequence Plan #SSP-TR02, LOTO Register Entry #44.",
    declName: "P. K. Mishra",
    declSigned: true,
    declDt: "2026-11-19T07:45",
    supDecision: "SUBMITTED",
    supName: "P. K. Mishra",
    supDate: "2026-11-19",
    soDecision: "ENDORSED",
    soName: "Manoj Kumar (Site Safety Officer)",
    soDate: "2026-11-19",
    smDecision: "APPROVED",
    smName: "Gajendra Rao (Project Manager)",
    smDate: "2026-11-19",
    issuerName: "Gajendra Rao",
    validFrom: "2026-11-19T08:00",
    validTo: "2026-11-19T14:00",
    closeStatus: "ACTIVE",
    closeNotes: "Breakers racked out and locked under LOTO."
  },
  "PTW-MHI": {
    permitNo: "PTW-JTRWF-2026-0047",
    date: "2026-11-19",
    area: "AREA-02 WHEEL FORGING LINE",
    applicant: "B. N. Mohanty (Hydraulic Specialist)",
    contact: "+91 94370 67890",
    contractor: "BALSONS HEAVY LIFT & SHIFT",
    persons: "5 Hydraulic Mechanics & Riggers",
    startDt: "2026-11-19T08:30",
    endDt: "2026-11-19T17:30",
    location: "Wheel Forging Press 3150T - Main Ram & Hydraulic Power Pack",
    related: "PTW-ELE-0025 (Pump Motor LOTO)",
    sec02: {
      "Equipment / machine / system ID": "3150T Hydraulic Forging Press - High Pressure Manifold & Accumulator Rack (250 Bar)",
      "Scope of mechanical / hydraulic work": "Replacement of high-pressure proportional control servo valve and high-pressure flex hoses on ram return circuit",
      "Energy types involved": "Hydraulic fluid pressure (250 bar), gravity load of 45-ton moving crosshead slide, nitrogen pre-charge in accumulators",
      "Isolation points": "HP Supply Ball Valve V-101, Return Valve V-102, Accumulator discharge dump valves V-103 & V-104",
      "Depressurisation / zero energy verification": "Manual accumulator bleed valve opened; pressure gauge G-01 reading 0 bar confirmed; hydraulic reservoir lock pin engaged",
      "Mechanical locking / chocking / propping": "Two 50-ton mechanical safety prop columns inserted beneath moving crosshead and mechanical lock wedges driven home",
      "Applicable RA / JSA ref.": "JSA-JTRWF-MHI-009-REV01"
    },
    sec04_mhi: {
      point: "HP Manifold Supply Valve V-101 & Accumulator Dump V-103",
      lock: "LOTO-JTRWF-M-019 / Lock #33 & Yellow Hasps",
      verifier: "B. N. Mohanty (Hydraulic Specialist)",
      dt: "2026-11-19T08:00"
    },
    hazards: "High pressure fluid injection (250 bar), crushing under unpropped 45T ram slide, oil slip hazard, pinching in valve linkage.",
    controls: "System depressurised to 0 bar, dual mechanical safety props inserted and pinned, LOTO hasps on all hydraulic shutoff valves.",
    ppe: "Safety helmet, safety glasses with side shields, oil-resistant nitrile-dipped gloves, steel toe metatarsal boots.",
    emergency: "Spill kit & drip trays stationed under manifold; high pressure oil injection protocol sheet posted at hydraulic room door.",
    references: "Hydraulic Isolation Procedure #HIP-WFP-3150, Press Mechanical Locking Drawing #MLD-02.",
    declName: "B. N. Mohanty",
    declSigned: true,
    declDt: "2026-11-19T08:15",
    supDecision: "SUBMITTED",
    supName: "B. N. Mohanty",
    supDate: "2026-11-19",
    soDecision: "ENDORSED",
    soName: "Manoj Kumar (Site Safety Officer)",
    soDate: "2026-11-19",
    smDecision: "APPROVED",
    smName: "Gajendra Rao (Project Manager)",
    smDate: "2026-11-19",
    issuerName: "Gajendra Rao",
    validFrom: "2026-11-19T08:30",
    validTo: "2026-11-19T17:30",
    closeStatus: "ACTIVE",
    closeNotes: "Safety props secured, 0 bar confirmed."
  },
  "PTW-LFT": {
    permitNo: "PTW-JTRWF-2026-0048",
    date: "2026-11-19",
    area: "AREA-01 AXLE FORGING LINE",
    applicant: "T. R. Panda (Rigging Superintendent)",
    contact: "+91 94370 78901",
    contractor: "BALSONS HEAVY LIFT & SHIFT",
    persons: "1 Crane Operator, 1 Appointed Person, 2 Riggers, 2 Banksmen",
    startDt: "2026-11-19T07:30",
    endDt: "2026-11-19T18:30",
    location: "Axle Press Main Bay Foundation Pit, Grid C1-C3",
    related: "PTW-GEN-0042",
    sec02: {
      "Crane / lifting equipment make, model & capacity": "SANY SCC1500A 150-Ton Crawler Crane (Boom: 43.0m, Counterweight: 51 MT)",
      "Description of load": "Axle Press 4000T Main Hydraulic Cylinder Casting with integral trunnions",
      "Load gross weight (including tackle)": "68.5 Metric Tonnes (Load: 65.2 MT + Tackle: 3.3 MT)",
      "Maximum operating radius": "14.0 Meters",
      "Rated capacity at max radius": "88.0 Metric Tonnes",
      "Percentage capacity utilisation": "77.8% (Approved within < 80% safe critical lift envelope)",
      "Rigging tackle specification": "4-Leg Grade 100 Wire Rope Slings (60mm dia, 100T SWL) with 4 x Crosby G-2140 55T Alloy Shackles",
      "Ground bearing / outrigger mat details": "Compacted gravel bed (Bearing capacity > 250 kN/m²); 4 sets of 4m x 2m x 200mm laminated hardwood crawler mats",
      "Environmental limits (wind, lightning)": "Maximum permissible wind speed: 20 km/h (Current reading: 8 km/h measured with handheld anemometer)",
      "Rigger / signalperson (Banksman) name": "Riggers: S. Jena & M. Patra; Certified Banksman: B. Biswal (Walkie-talkie Ch-4)",
      "Applicable RA / JSA ref.": "JSA-JTRWF-LFT-033-CRITICAL-REV02"
    },
    sec04_lft: {
      weight: "68.5 MT",
      radius: "14.0 M",
      capacity: "88.0 MT",
      util: "77.8% (Safe Critical Lift Envelope < 80%)"
    },
    hazards: "Overturning of crane, rigging failure / snapped sling, falling heavy load (68.5 MT), tail swing collision, high wind.",
    controls: "Comprehensive engineered Lift Plan approved by Third Party, 20M exclusion zone barricaded, dedicated banksman on radio.",
    ppe: "Safety helmet with chin strap, steel toe safety boots, high visibility vest, heavy duty rigging gloves.",
    emergency: "Exclusion zone maintained; emergency horn on crane; lifting engineer stationed at crane supervisor cabin.",
    references: "Critical Lift Plan #CLP-JTRWF-2026-08, Crane Third Party TPI Certificate #TPI-SANY-089, Slings Test Certificates.",
    declName: "T. R. Panda",
    declSigned: true,
    declDt: "2026-11-19T07:15",
    supDecision: "SUBMITTED",
    supName: "T. R. Panda",
    supDate: "2026-11-19",
    soDecision: "ENDORSED",
    soName: "Manoj Kumar (Site Safety Officer)",
    soDate: "2026-11-19",
    smDecision: "APPROVED",
    smName: "Gajendra Rao (Project Manager)",
    smDate: "2026-11-19",
    issuerName: "Gajendra Rao",
    validFrom: "2026-11-19T07:30",
    validTo: "2026-11-19T18:30",
    closeStatus: "ACTIVE",
    closeNotes: "Critical lift proceeding under Lift Supervisor direct control."
  }
};

