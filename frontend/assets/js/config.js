/**
 * BALSONS SAFETY PORTAL - FRONTEND CONFIGURATION
 * Baseline: SAM-2026 & BEDS V1.0
 * Controlled Library: BALSONS_JTRWF_PTW_FORMS_V1_1_SEVEN_PERMITS
 * Project: Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha
 */

const BALSONS_SAFETY_CONFIG = {
  PROJECT_ID: 'PRJ-JTRWF-SCHULER',
  PORTAL_NAME: 'BALSONS Safety Manager',
  PROJECT_NAME: 'Jupiter Tatravagonka Railwheel Factory (JTRWF)',
  CLIENT_NAME: 'Jupiter Tatravagonka Railwheel Factory Pvt. Ltd.',
  CONTRACTOR_NAME: 'BALSONS HEAVY LIFT & SHIFT',
  LOCATION: 'Khordha, Odisha, India',
  VERSION: '1.2.0-seven-forms',
  ENV: 'production',
  
  // Database Reference
  SPREADSHEET_ID: '1SyOGt6HEu6HJCufAbB2_P6BgF6pEppt28J_8cARaOP0',
  SPREADSHEET_URL: 'https://docs.google.com/spreadsheets/d/1SyOGt6HEu6HJCufAbB2_P6BgF6pEppt28J_8cARaOP0/edit',

  // Google Apps Script Web App Deployment URL
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwgutbfm18PJPhsj_3-0C9Kt5AeaLqvGzoP8RMPab6ESzfm5SBkEPf8YslN8tJhOZJL/exec',
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

  /**
   * 7 Controlled Operational PTW Templates (V1.1 Library)
   */
  PTW_TEMPLATES: [
    {
      code: 'PTW-GEN',
      category: 'GENERAL',
      docNo: 'BAL-JTRWF-SAF-PTW-001',
      name: 'General Work Permit',
      validity: 12,
      prerequisites: [
        'Approved RA/JSA and method statement available',
        'Work area inspected and safe for planned activity',
        'Personnel briefed and competent for assigned task',
        'Required PPE available and worn',
        'Tools and equipment inspected and fit for use',
        'Access, lighting and housekeeping adequate',
        'Barricading / warning signage installed where required',
        'Emergency arrangements and communication understood',
        'Nearby operations and interfaces reviewed',
        'Required supporting permits / isolations identified'
      ]
    },
    {
      code: 'PTW-HOT',
      category: 'HOT WORK',
      docNo: 'BAL-JTRWF-SAF-PTW-002',
      name: 'Hot Work Permit',
      validity: 8,
      prerequisites: [
        'Hot work RA/JSA and method statement approved',
        'Combustibles removed or protected (10m radius)',
        'Flammable atmosphere checked (0% LEL)',
        'Gas cylinders upright and secured as required',
        'Hoses, regulators and flashback arrestors inspected',
        'Suitable fire extinguisher accessible (10kg DCP)',
        'Fire watch assigned and briefed with whistle',
        'Screens / spark containment fire blanket installed',
        'Adjacent areas checked for fire exposure',
        'Post-work fire watch duration defined (min 30 mins)',
        'Hot work equipment isolated and removed after completion'
      ]
    },
    {
      code: 'PTW-HT',
      category: 'HEIGHT WORK',
      docNo: 'BAL-JTRWF-SAF-PTW-003',
      name: 'Work at Height Permit',
      validity: 10,
      prerequisites: [
        'Work-at-height RA/JSA approved',
        'Safe platform / access selected',
        'Scaffold / platform inspected and tagged (Green Tag)',
        'Ladders suitable, tied-off and secured',
        'Harness, double lanyard and connectors inspected',
        'Anchor / lifeline suitability verified by competent person (>22kN)',
        'Dropped-object controls and exclusion zone established',
        'Tools and materials secured against falling with tool lanyards',
        'Weather conditions acceptable (wind speed < 32 km/h, no rain)',
        'Rescue plan, trained rescuers and equipment available'
      ]
    },
    {
      code: 'PTW-CSE',
      category: 'CONFINED SPACE',
      docNo: 'BAL-JTRWF-SAF-PTW-004',
      name: 'Confined Space Entry Permit',
      validity: 8,
      hasAtmosphericTest: true,
      prerequisites: [
        'Confined-space classification and RA approved',
        'Energy and material sources isolated and verified (LOTO)',
        'Space cleaned / purged / ventilated as specified',
        'Atmosphere tested by authorised competent person',
        'Oxygen (19.5%-23.5%), flammable (0% LEL) and toxic readings recorded',
        'Continuous / periodic forced-air ventilation confirmed',
        'Standby attendant present outside entry and communication tested',
        'Entrants trained, medically fit and logged',
        'Suitable 24V explosion-proof lighting, tools and PPE available',
        'Rescue tripod winch, harness and breathing apparatus ready',
        'Entry / exit headcount register maintained'
      ]
    },
    {
      code: 'PTW-ELE',
      category: 'GENERAL',
      docNo: 'BAL-JTRWF-SAF-PTW-005',
      name: 'Electrical Work & LOTO Permit',
      validity: 12,
      hasIsolationRecord: true,
      prerequisites: [
        'Electrical RA/JSA and switching plan available',
        'Competent authorised electrical personnel assigned',
        'All supply sources including backfeed identified',
        'Isolation carried out by authorised electrical person',
        'Lockout and tagout applied at identified breaker points',
        'Absence of voltage tested with approved calibrated tester',
        'Tester proved before and after test on known live source',
        'Stored energy discharged / earthing applied as required',
        'Barriers and Danger warning notices installed',
        'Adjacent live parts protected with insulating mats',
        'Re-energisation and handback process agreed'
      ]
    },
    {
      code: 'PTW-MHI',
      category: 'GENERAL',
      docNo: 'BAL-JTRWF-SAF-PTW-006',
      name: 'Mechanical / Hydraulic Isolation Permit',
      validity: 10,
      hasIsolationRecord: true,
      prerequisites: [
        'Approved isolation plan and RA/JSA available',
        'All energy sources identified (hydraulic/pneumatic/gravity)',
        'Machine stopped and secured against restart',
        'Associated electrical energy isolated as required',
        'Hydraulic / pneumatic pressure safely released (gauge reads 0 Bar)',
        'Accumulators and stored energy addressed and drained',
        'Raised / suspended components mechanically chocked / pinned',
        'Gravity movement and rotating parts physically restrained',
        'Zero-energy state verified by competent person',
        'Locks / tags and warning notices applied',
        'Safe reinstatement sequence defined'
      ]
    },
    {
      code: 'PTW-LFT',
      category: 'GENERAL',
      docNo: 'BAL-JTRWF-SAF-PTW-007',
      name: 'Lifting & Rigging Permit',
      validity: 10,
      hasLiftingRecord: true,
      prerequisites: [
        'Approved lifting plan and task risk assessment available',
        'Load weight and centre of gravity (COG) verified',
        'Crane capacity checked for radius and boom configuration',
        'Crane inspection / statutory Form 11 documents valid',
        'Operator competency and heavy equipment licence verified',
        'Rigger and single designated signalman competency verified',
        'Slings, shackles, hooks and accessories inspected (valid color code)',
        'Sling angles and rigging arrangement checked by competent person',
        'Ground condition, outrigger support and load spreader mats verified',
        'Weather / wind limits checked (<32 km/h)',
        'Trial lift and radio communication method agreed',
        'Exclusion zone (10M radius) and tag-line arrangements established'
      ]
    }
  ]
};
