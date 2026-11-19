/**
 * BALSONS SAFETY PORTAL - PTW SERVICE
 * Module 05: Permit-to-Work (PTW) Lifecycle Management
 * Architecture: BALSONS-SAM-2026 (Locked Baseline)
 * Project: Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha
 */

var PtwService = {
  
  /**
   * 10 Standard PTW Templates mapped to 4 Master Categories
   */
  TEMPLATES: {
    'PTW-T01': { category: 'GENERAL', name: 'General Cold Work Permit', validity: 12, prerequisites: ['JSA Attached', 'Basic Mandatory PPE', 'Work Area Barricading', 'Emergency Contact Identified'] },
    'PTW-T02': { category: 'HOT WORK', name: 'Hot Work & Welding Permit', validity: 8, prerequisites: ['Dedicated Fire Watch Assigned', '10kg DCP Fire Extinguisher at Site', 'Gas Test 0% LEL & Combustible Cleared 10M', 'Welding Machine Grounded / ELCB Fitted', 'Fire Blanket Screen Erected'] },
    'PTW-T03': { category: 'HEIGHT WORK', name: 'Work at Height Permit (>1.8M)', validity: 10, prerequisites: ['Full Body Double-Lanyard Harness with Shock Absorber', '100% Tie-Off Anchor Point Verified (>22kN)', 'Green Tagged Certified Scaffolding / Man-Basket', 'Safety Net / Static Lifeline Installed', 'Tool Lanyard / Falling Object Prevention'] },
    'PTW-T04': { category: 'CONFINED SPACE', name: 'Confined Space Entry Permit', validity: 8, prerequisites: ['Atmospheric Gas Test (O2: 19.5%-23.5%, CO < 25ppm, H2S < 10ppm, LEL 0%)', 'Continuous Forced Air Mechanical Ventilation', 'Dedicated Standby Rescue Attendant with Logbook', 'Tripod Retrieval Winch & Full Body Harness', 'Intrinsically Safe 24V Lighting'] },
    'PTW-T05': { category: 'GENERAL', name: 'Electrical & LOTO Isolation Permit', validity: 12, prerequisites: ['Positive Lockout & Danger Tag Placed at Breaker', 'Zero Energy Test Verified with Calibrated Meter', 'Discharge Earth Applied & Padlock Key Secured', 'Arc Flash PPE 40 Cal/cm2 for High Voltage'] },
    'PTW-T06': { category: 'GENERAL', name: 'Mechanical / Hydraulic Isolation Permit', validity: 10, prerequisites: ['Hydraulic Pressure Depressurised to 0 Bar', 'Mechanical Positive Pin / Blocking Lock Inserted', 'All Fluid Supply Lines Closed & Tagged', 'Residual Energy Dissipated'] },
    'PTW-T07': { category: 'GENERAL', name: 'Heavy Lifting & Rigging Permit', validity: 10, prerequisites: ['Approved Rigging Plan & Load Weight Calculation', 'Crane / Hydra Valid Form 11 TPI Fitness Certificate', 'Lifting Slings, Bow Shackles & Webbing TPI Inspected', 'Certified Rigging Supervisor & Signalman Assigned', '10-Meter Lifting Radius Barricaded & Cleared'] },
    'PTW-T08': { category: 'GENERAL', name: 'Excavation & Ground Breaking Permit', validity: 12, prerequisites: ['Underground Power Cable / Water Pipe Clearance Scan', 'Trench Shoring / 45-Degree Batter Slope Inspected', 'Access Ladders Every 7.5M for Safe Egress', 'Excavation Perimeter Handrail Barricade & Warning Signage'] },
    'PTW-T09': { category: 'GENERAL', name: 'Line Breaking / Pipeline Opening Permit', validity: 6, prerequisites: ['Line Depressurized, Drained and Flushed', 'Flange Bolts Loosened Away from Personnel Direction', 'Chemical / Splash Face Shield & Chemical Suit Used', 'Catchment Basin / Secondary Containment Positioned'] },
    'PTW-T10': { category: 'HEIGHT WORK', name: 'Roof Access & Fragile Surface Permit', validity: 8, prerequisites: ['Crawling Boards / Roof Walkways Laid', 'Permanent Static Lifeline Anchored to Purlins', 'Fall Arrester Blocks / Inertia Reels Connected', 'High Wind Speed (<32 km/h) & Rain Clearance Checked'] }
  },

  /**
   * Retrieve list of PTW records
   */
  getPermits: function(filter) {
    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('PTW_REGISTER');
      
      if (!sheet || sheet.getLastRow() <= 1) {
        return this.getSeedPermits(filter);
      }
      
      var data = sheet.getDataRange().getValues();
      var headers = data[0];
      var permits = [];
      
      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        var item = {};
        for (var h = 0; h < headers.length; h++) {
          item[headers[h]] = row[h];
        }
        
        if (!filter || filter === 'ALL' || item.Status === filter || item.Category === filter) {
          permits.push(item);
        }
      }
      
      return permits.reverse();
    } catch (err) {
      Logger.log('Falling back to seed permits: ' + err.message);
      return this.getSeedPermits(filter);
    }
  },

  /**
   * Create a new Permit to Work (Stage 1: Work Supervisor Submission)
   */
  createPermit: function(data, actor) {
    var template = this.TEMPLATES[data.templateCode];
    if (!template) {
      throw new Error('Invalid PTW Template: ' + data.templateCode);
    }

    var permitId = 'PTW-JTRWF-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    var now = new Date().toISOString();
    
    var record = {
      PermitID: permitId,
      TemplateCode: data.templateCode,
      Category: template.category,
      AreaCode: data.areaCode || 'AREA-01',
      WorkDescription: data.workDescription || template.name,
      Contractor: data.contractor || 'BALSONS HEAVY LIFT',
      SupervisorID: actor ? actor.fullName : (data.supervisorName || 'Ramesh Kumar'),
      PlannedStart: data.plannedStart || now,
      PlannedEnd: data.plannedEnd || new Date(Date.now() + template.validity * 3600 * 1000).toISOString(),
      RiskLevel: data.riskLevel || 'HIGH',
      Status: 'SUBMITTED',
      IssuedTimestamp: '',
      ClosedTimestamp: '',
      PrerequisitesChecked: JSON.stringify(data.prerequisites || template.prerequisites)
    };

    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('PTW_REGISTER');
      if (sheet) {
        sheet.appendRow([
          record.PermitID,
          record.TemplateCode,
          record.Category,
          record.AreaCode,
          record.WorkDescription,
          record.Contractor,
          record.SupervisorID,
          record.PlannedStart,
          record.PlannedEnd,
          record.RiskLevel,
          record.Status,
          record.IssuedTimestamp,
          record.ClosedTimestamp
        ]);
      }

      this.logApprovalStep(permitId, 'SUBMISSION', 'SUBMITTED', actor ? actor.fullName : 'Supervisor', 'Work Supervisor', 'Work requested with verified checklist prerequisites');
      AuditService.log(actor ? actor.fullName : 'System', 'Work Supervisor', 'CREATE_PTW', permitId, 'SUCCESS', 'Permit created for ' + template.name);
    } catch (e) {
      Logger.log('Sheet append skipped: ' + e.message);
    }

    return record;
  },

  /**
   * Stage 2: Safety Officer Field Verification
   */
  verifyPermit: function(permitId, verificationData, actor) {
    var status = 'VERIFIED_BY_SAFETY';
    this.updatePermitStatus(permitId, status);
    this.logApprovalStep(permitId, 'SAFETY_VERIFICATION', 'VERIFIED', actor ? actor.fullName : 'Bikram Patra', 'Safety Officer', verificationData.comments || 'On-site safety precautions physically inspected & verified.');
    AuditService.log(actor ? actor.fullName : 'Safety Officer', 'Safety Officer', 'VERIFY_PTW', permitId, 'SUCCESS', 'Physical safety conditions validated.');
    return { permitId: permitId, status: status, message: 'Permit verified by Safety Officer. Forwarded to Site Manager for Final Authorization.' };
  },

  /**
   * Stage 3: Site Manager / Project Head Final Authorization & Issue
   */
  approvePermit: function(permitId, approvalData, actor) {
    var status = 'ISSUED';
    var now = new Date().toISOString();
    this.updatePermitStatus(permitId, status, { IssuedTimestamp: now });
    this.logApprovalStep(permitId, 'SITE_MANAGER_AUTHORISATION', 'APPROVED', actor ? actor.fullName : 'Gajendra Rao', 'Site Manager / Safety Head', approvalData.comments || 'Full work authorisation granted. Proceed with work strictly per approved JSA.');
    AuditService.log(actor ? actor.fullName : 'Site Manager', 'Site Manager', 'APPROVE_PTW', permitId, 'SUCCESS', 'Permit officially issued to site.');
    return { permitId: permitId, status: status, issuedTimestamp: now, message: 'PTW Officially Issued and Active on Site.' };
  },

  /**
   * Reject Permit
   */
  rejectPermit: function(permitId, rejectionData, actor) {
    var status = 'REJECTED';
    this.updatePermitStatus(permitId, status);
    this.logApprovalStep(permitId, 'PERMIT_REJECTION', 'REJECTED', actor ? actor.fullName : 'Safety Team', actor ? actor.role : 'Safety Authority', rejectionData.reason || 'Safety prerequisites not fulfilled.');
    AuditService.log(actor ? actor.fullName : 'Safety Team', 'Safety Authority', 'REJECT_PTW', permitId, 'REJECTED', rejectionData.reason || 'Prerequisites unmet');
    return { permitId: permitId, status: status, message: 'Permit has been rejected.' };
  },

  /**
   * Stage 4: Work Completion & Handback / Closure
   */
  closePermit: function(permitId, closureData, actor) {
    var status = 'CLOSED';
    var now = new Date().toISOString();
    this.updatePermitStatus(permitId, status, { ClosedTimestamp: now });
    this.logApprovalStep(permitId, 'WORK_COMPLETION_HANDBACK', 'CLOSED', actor ? actor.fullName : 'Supervisor & Safety', 'Permit Holder / Safety Officer', closureData.comments || 'Work successfully completed. Site cleared, tools removed, housekeeping restored, and isolation removed.');
    AuditService.log(actor ? actor.fullName : 'Permit Holder', 'Supervisor', 'CLOSE_PTW', permitId, 'SUCCESS', 'Work handback and permit closure complete.');
    return { permitId: permitId, status: status, closedTimestamp: now, message: 'Permit safely closed. Worksite handed back.' };
  },

  /**
   * Helper to update permit status in sheet
   */
  updatePermitStatus: function(permitId, status, extraFields) {
    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('PTW_REGISTER');
      if (!sheet) return;
      
      var data = sheet.getDataRange().getValues();
      for (var i = 1; i < data.length; i++) {
        if (data[i][0] === permitId) {
          // Status is Column 11 (index 10)
          sheet.getRange(i + 1, 11).setValue(status);
          if (extraFields && extraFields.IssuedTimestamp) {
            sheet.getRange(i + 1, 12).setValue(extraFields.IssuedTimestamp);
          }
          if (extraFields && extraFields.ClosedTimestamp) {
            sheet.getRange(i + 1, 13).setValue(extraFields.ClosedTimestamp);
          }
          break;
        }
      }
    } catch (e) {
      Logger.log('Update permit error: ' + e.message);
    }
  },

  /**
   * Log Approval Step in PTW_APPROVAL_LOG
   */
  logApprovalStep: function(permitId, stepName, action, actorName, actorRole, comments) {
    try {
      var ssId = SAFETY_CONFIG.getSpreadsheetId();
      var ss = SpreadsheetApp.openById(ssId);
      var sheet = ss.getSheetByName('PTW_APPROVAL_LOG');
      if (sheet) {
        var approvalId = 'APP-' + new Date().getTime();
        sheet.appendRow([
          approvalId,
          permitId,
          stepName,
          action,
          actorName,
          actorRole,
          new Date().toISOString(),
          comments
        ]);
      }
    } catch (e) {
      Logger.log('Approval log write skipped: ' + e.message);
    }
  },

  /**
   * Seed Mock PTW records for demonstration and offline reliability
   */
  getSeedPermits: function(filter) {
    var seeds = [
      {
        PermitID: 'PTW-JTRWF-2026-1001',
        TemplateCode: 'PTW-T07',
        Category: 'GENERAL',
        AreaCode: 'AREA-01',
        WorkDescription: 'Heavy Tandem Lift of Schuler 1600T Forging Press Bed',
        Contractor: 'BALSONS HEAVY LIFT',
        SupervisorID: 'Ramesh Kumar (Lifting Sup.)',
        PlannedStart: '2026-11-19T08:00:00Z',
        PlannedEnd: '2026-11-19T18:00:00Z',
        RiskLevel: 'CRITICAL',
        Status: 'ISSUED',
        IssuedTimestamp: '2026-11-19T07:45:00Z',
        ClosedTimestamp: '',
        PrerequisitesChecked: '["Rigging Plan Approved", "Form 11 Valid", "Exclusion Zone 10M", "Rigger TPI Certified"]'
      },
      {
        PermitID: 'PTW-JTRWF-2026-1002',
        TemplateCode: 'PTW-T03',
        Category: 'HEIGHT WORK',
        AreaCode: 'AREA-02',
        WorkDescription: 'Erection of Overhead EOT Crane Girders at +14.5M Elevation',
        Contractor: 'BALSONS STRUCTURAL ERECTORS',
        SupervisorID: 'Sanjay Panda',
        PlannedStart: '2026-11-19T09:00:00Z',
        PlannedEnd: '2026-11-19T17:00:00Z',
        RiskLevel: 'HIGH',
        Status: 'VERIFIED_BY_SAFETY',
        IssuedTimestamp: '',
        ClosedTimestamp: '',
        PrerequisitesChecked: '["Full Body Harness Double Lanyard", "Lifeline Inspected", "Scaffold Green Tagged"]'
      },
      {
        PermitID: 'PTW-JTRWF-2026-1003',
        TemplateCode: 'PTW-T02',
        Category: 'HOT WORK',
        AreaCode: 'AREA-04',
        WorkDescription: 'Welding and Thermal Cutting of Heavy Anchor Stool Plates',
        Contractor: 'BALSONS FABRICATION',
        SupervisorID: 'Ajay Verma',
        PlannedStart: '2026-11-19T10:00:00Z',
        PlannedEnd: '2026-11-19T16:00:00Z',
        RiskLevel: 'HIGH',
        Status: 'SUBMITTED',
        IssuedTimestamp: '',
        ClosedTimestamp: '',
        PrerequisitesChecked: '["Fire Watch Assigned", "10kg DCP Present", "Gas Test 0% LEL"]'
      },
      {
        PermitID: 'PTW-JTRWF-2026-1004',
        TemplateCode: 'PTW-T04',
        Category: 'CONFINED SPACE',
        AreaCode: 'AREA-03',
        WorkDescription: 'Internal Hydraulic Pit Degreasing and Inspection',
        Contractor: 'BALSONS MAINTENANCE',
        SupervisorID: 'Manoj Mohanty',
        PlannedStart: '2026-11-18T11:00:00Z',
        PlannedEnd: '2026-11-18T17:00:00Z',
        RiskLevel: 'CRITICAL',
        Status: 'CLOSED',
        IssuedTimestamp: '2026-11-18T10:50:00Z',
        ClosedTimestamp: '2026-11-18T16:45:00Z',
        PrerequisitesChecked: '["Gas Test O2 20.9%", "Standby Attendant Present", "Tripod Winch Tested"]'
      }
    ];

    if (!filter || filter === 'ALL') return seeds;
    return seeds.filter(function(p) { return p.Status === filter || p.Category === filter; });
  }
};
