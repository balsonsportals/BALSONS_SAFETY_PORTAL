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
