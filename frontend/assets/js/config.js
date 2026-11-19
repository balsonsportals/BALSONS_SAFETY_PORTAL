/**
 * BALSONS SAFETY PORTAL - FRONTEND CONFIGURATION
 * Baseline: SAM-2026 & BEDS V1.0
 * Project: Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha
 */

const BALSONS_SAFETY_CONFIG = {
  PROJECT_ID: 'PRJ-JTRWF-SCHULER',
  PORTAL_NAME: 'BALSONS Safety Manager',
  PROJECT_NAME: 'Jupiter Tatravagonka Railwheel Factory (JTRWF)',
  CLIENT_NAME: 'Jupiter Tatravagonka Railwheel Factory Pvt. Ltd.',
  CONTRACTOR_NAME: 'BALSONS HEAVY LIFT & SHIFT',
  LOCATION: 'Khordha, Odisha, India',
  VERSION: '1.0.0-sam2026',
  ENV: 'production',
  
  // Google Apps Script Web App Deployment URL
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbw5yErhJIEatQ2JVQRVqHBvdQNeXwgiSCybqJZwuJPxqhEDbFK5EYcI5AdeNHXFojPhrA/exec',
  USE_TEXT_PLAIN_TRANSPORT: true,

  STORAGE_SESSION_KEY: 'balsons_safety_session',
  STORAGE_THEME_KEY: 'beds_theme_preference',
  STORAGE_LANG_KEY: 'balsons_safety_lang',

  WORK_AREAS: [
    { code: 'AREA-01', name: 'Axle Forging Line (Main Bay South)', hod: 'Rajesh K. Sharma', safetyOfficer: 'Bikram Patra' },
    { code: 'AREA-02', name: 'Wheel Forging Line (Main Bay North)', hod: 'Sanjay Panda', safetyOfficer: 'Bikram Patra' },
    { code: 'AREA-03', name: 'Machine Shop (Auxiliary Bay 1)', hod: 'Manoj Mohanty', safetyOfficer: 'Rakesh Swain' },
    { code: 'AREA-04', name: 'Die Shop & Heavy Tooling', hod: 'Ajay Verma', safetyOfficer: 'Rakesh Swain' }
  ],

  PTW_TEMPLATES: [
    {
      code: 'PTW-T01',
      category: 'GENERAL',
      name: 'General Cold Work Permit',
      validity: 12,
      prerequisites: [
        'Approved Job Safety Analysis (JSA) attached & briefed',
        'Basic Mandatory PPE (Hard Hat, Steel-Toe Boots, Hi-Vis Vest, Safety Glasses)',
        'Work area physical barricading with warning tags deployed',
        'Emergency access and escape routes kept 100% unobstructed'
      ]
    },
    {
      code: 'PTW-T02',
      category: 'HOT WORK',
      name: 'Hot Work & Welding Permit',
      validity: 8,
      prerequisites: [
        'Dedicated Fire Watch assigned with whistle and visible hi-vis badge',
        'Two 10kg DCP Fire Extinguishers & Fire Sand Buckets at immediate work spot',
        'Atmospheric Gas Test verified: 0% LEL (Combustibles cleared 10m radius)',
        'Welding machine frame grounded with functional 30mA ELCB/RCCB fitted',
        'Flame-retardant fire blanket barrier erected around sparks trajectory'
      ]
    },
    {
      code: 'PTW-T03',
      category: 'HEIGHT WORK',
      name: 'Work at Height Permit (>1.8M)',
      validity: 10,
      prerequisites: [
        'Full Body Double-Lanyard Safety Harness with shock absorber inspected',
        '100% Tie-Off Anchor Point Verified (>22.2 kN / 5000 lbs rating)',
        'Scaffolding inspected and displaying Green "SAFE FOR USE" tag',
        'Full perimeter toe-boards, double guardrails and access ladder secured',
        'Tool lanyards and safety netting installed for falling object prevention'
      ]
    },
    {
      code: 'PTW-T04',
      category: 'CONFINED SPACE',
      name: 'Confined Space Entry Permit',
      validity: 8,
      prerequisites: [
        'Calibrated Multi-Gas Test: O2 (19.5%-23.5%), CO < 25ppm, H2S < 10ppm, LEL 0%',
        'Continuous forced-air mechanical positive ventilation running throughout',
        'Dedicated Standby Rescue Attendant stationed outside entry with logbook',
        'Tripod retrieval winch, harness, and breathing apparatus (SCBA) ready',
        'Intrinsically safe 24V explosion-proof illumination and radio communication'
      ]
    },
    {
      code: 'PTW-T05',
      category: 'GENERAL',
      name: 'Electrical & LOTO Isolation Permit',
      validity: 12,
      prerequisites: [
        'Positive padlocking and Danger LOTO tag placed on main breaker/isolator',
        'Zero Energy Test physically tested and verified with calibrated voltmeter',
        'Discharge earthing applied and lockout keys secured in multi-lock hasp box',
        'Arc flash PPE 40 Cal/cm² and insulated rubber matting verified'
      ]
    },
    {
      code: 'PTW-T06',
      category: 'GENERAL',
      name: 'Mechanical / Hydraulic Isolation Permit',
      validity: 10,
      prerequisites: [
        'Hydraulic pressure line completely depressurised and gauge reads 0 Bar',
        'Mechanical positive physical locking pins / safety chocks inserted under ram',
        'Fluid isolation valves closed, chained, locked and drain valves tagged open',
        'All stored accumulator and counterweight energy fully dissipated'
      ]
    },
    {
      code: 'PTW-T07',
      category: 'GENERAL',
      name: 'Heavy Lifting & Rigging Permit',
      validity: 10,
      prerequisites: [
        'Rigging plan, load weight calculation, and crane capacity chart approved',
        'Crane / Hydra third-party inspection (Form 11) certificate valid and verified',
        'Lifting wire ropes, bow shackles, and web slings inspected with valid color code',
        'Certified Rigging Supervisor and single designated banksman assigned',
        '10-Meter lifting radius completely barricaded and clear of personnel'
      ]
    },
    {
      code: 'PTW-T08',
      category: 'GENERAL',
      name: 'Excavation & Ground Breaking Permit',
      validity: 12,
      prerequisites: [
        'Underground utility clearance (cables, gas, water lines) cable-detector scanned',
        'Trench shoring or safe 45-degree batter angle inspected by civil lead',
        'Escape ladders placed at least every 7.5 meters along excavation trench',
        'Perimeter rigid guardrails and blinking night warning lamps installed'
      ]
    },
    {
      code: 'PTW-T09',
      category: 'GENERAL',
      name: 'Line Breaking / Pipeline Opening Permit',
      validity: 6,
      prerequisites: [
        'Line isolated, depressurized, drained, flushed, and purged safely',
        'First flange bolts loosened facing AWAY from technician bodies',
        'Chemical splash suit, chemical goggles, and full face shield donned',
        'Drip trays and emergency chemical neutralizing absorbent ready beneath'
      ]
    },
    {
      code: 'PTW-T10',
      category: 'HEIGHT WORK',
      name: 'Roof Access & Fragile Surface Permit',
      validity: 8,
      prerequisites: [
        'Crawling boards and staging walkways laid across roof purlins',
        'Static lifeline anchored to structural steel members along entire route',
        'Fall arrest inertia blocks connected to worker full-body harnesses',
        'Weather check confirmed: Wind speed < 32 km/h and zero precipitation'
      ]
    }
  ]
};
