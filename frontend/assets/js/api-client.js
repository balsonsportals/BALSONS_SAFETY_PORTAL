/**
 * BALSONS SAFETY PORTAL - API CLIENT & LOCAL FALLBACK BRIDGE
 * Baseline: SAM-2026 & BEDS V1.0
 * CORS-Safe Transport: POST text/plain
 */

const BalsonsSafetyApi = {
  // Local fallback state store
  _localStore: {
    permits: [
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
    ],
    tbts: [
      {
        TbtID: 'TBT-JTRWF-2026-001',
        Date: '2026-11-19',
        Time: '07:30',
        AreaCode: 'AREA-01',
        Topic: 'Tandem Lifting Hazards & Single Banksman Hand Signals',
        SupervisorID: 'Ramesh Kumar (Lifting Sup.)',
        AttendeesCount: 14,
        PhotoUrl: 'assets/images/tbt_sample.jpg',
        KeyPointsDiscussed: 'Tandem lift coordination, designated single banksman, tag lines mandatory, exclusion of non-essential personnel.',
        Status: 'CONDUCTED'
      },
      {
        TbtID: 'TBT-JTRWF-2026-002',
        Date: '2026-11-19',
        Time: '08:00',
        AreaCode: 'AREA-02',
        Topic: 'Fall Protection & Proper 100% Tie-Off at +14.5M',
        SupervisorID: 'Sanjay Panda',
        AttendeesCount: 9,
        PhotoUrl: 'assets/images/tbt_sample.jpg',
        KeyPointsDiscussed: 'Dual lanyard attachment above shoulder height, inspecting webbing for tears, trauma strap deployment awareness.',
        Status: 'CONDUCTED'
      }
    ],
    inspections: [
      {
        InspID: 'INSP-JTRWF-2026-001',
        Date: '2026-11-19',
        AreaCode: 'AREA-01',
        Category: 'Lifting Tools & Tackles (LTT)',
        InspectorName: 'Bikram Patra (Safety Officer)',
        TotalItems: 12,
        CompliantCount: 11,
        NonCompliantCount: 1,
        Status: 'ACTION_REQUIRED'
      },
      {
        InspID: 'INSP-JTRWF-2026-002',
        Date: '2026-11-19',
        AreaCode: 'AREA-02',
        Category: 'Scaffolding & Work at Height',
        InspectorName: 'Rakesh Swain (Safety Officer)',
        TotalItems: 10,
        CompliantCount: 10,
        NonCompliantCount: 0,
        Status: 'SATISFACTORY'
      }
    ],
    liftingPlans: [
      {
        LiftID: 'LFT-JTRWF-2026-001',
        PermitID: 'PTW-JTRWF-2026-1001',
        LiftCategory: 'CRITICAL / TANDEM LIFT',
        CraneID: 'CRN-LIEBHERR-400T & CRN-DEMAG-250T',
        LoadWeightTons: 145.0,
        CalculatedCapacityTons: 190.0,
        RiggingPlanRef: 'RP-SCHULER-BED-TANDEM-REV03',
        RiggerLeader: 'Ramesh Kumar',
        ApprovedBy: 'Gajendra Rao (Safety Manager)',
        Status: 'APPROVED'
      }
    ],
    hazards: [
      {
        HazardID: 'HAZ-JTRWF-2026-001',
        ReportedDate: '2026-11-19',
        AreaCode: 'AREA-01',
        HazardType: 'Unsafe Condition (UC)',
        Severity: 'MEDIUM',
        Description: 'Oil leakage near hydraulic power pack creating slip hazard',
        ReportedBy: 'Bikram Patra',
        ImmediateAction: 'Sawdust applied and absorbent pads deployed. Maintenance notified.',
        Status: 'RESOLVED'
      }
    ],
    incidents: [
      {
        IncidentID: 'INC-JTRWF-2026-001',
        DateTime: '2026-11-18T14:15:00Z',
        AreaCode: 'AREA-02',
        IncidentType: 'NEAR MISS',
        Severity: 'LOW',
        Title: 'Tool tether arrested falling spanner from +6M scaffold',
        Description: 'Technician spanner slipped during girder torque check. Tool tether functioned as designed. Zero injury or damage.',
        InjuredPerson: 'NONE',
        DamagedEquipment: 'NONE',
        InvestigatorID: 'Bikram Patra (Safety Officer)',
        Status: 'CLOSED'
      }
    ],
    capas: [
      {
        CapaID: 'CAPA-2026-101',
        SourceType: 'INSPECTION',
        SourceRefID: 'INSP-JTRWF-2026-001',
        FindingDescription: 'Worn out 5T web sling without legible identification tag found in rigging box',
        RiskLevel: 'HIGH',
        CorrectiveAction: 'Damaged sling quarantined and cut to prevent reuse. Replaced with new Form 11 certified sling.',
        PreventiveAction: 'Rigging supervisor to conduct 100% pre-use visual inspection before every shift.',
        AssignedOwner: 'Ramesh Kumar (Rigging Lead)',
        TargetDate: '2026-11-20',
        ClosureStatus: 'OPEN',
        VerifiedBy: '',
        ClosedDate: ''
      },
      {
        CapaID: 'CAPA-2026-102',
        SourceType: 'AUDIT',
        SourceRefID: 'AUD-JTRWF-OCT',
        FindingDescription: 'First Aid Box No. 4 in Machine Shop missing eye wash saline solution',
        RiskLevel: 'MEDIUM',
        CorrectiveAction: 'First aid box replenished with 500ml sterile eye wash bottles and expiry log updated.',
        PreventiveAction: 'Weekly first aid box checklist assigned to Site Medic.',
        AssignedOwner: 'Site Medic / Bikram Patra',
        TargetDate: '2026-11-15',
        ClosureStatus: 'CLOSED',
        VerifiedBy: 'Gajendra Rao',
        ClosedDate: '2026-11-15'
      }
    ]
  },

  /**
   * Universal Dispatch Call
   */
  call: async function(action, payload = {}) {
    const actor = BalsonsSafetyAuth.getUser();

    // If online GAS URL is configured, try network call
    if (BALSONS_SAFETY_CONFIG.APPS_SCRIPT_URL) {
      try {
        const response = await fetch(BALSONS_SAFETY_CONFIG.APPS_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ action: action, payload: payload, actor: actor }),
          redirect: 'follow'
        });
        if (response.ok) {
          const res = await response.json();
          if (res.success) return res;
        }
      } catch (e) {
        console.warn('[BalsonsSafetyApi] Remote call failed, using local fallback:', e.message);
      }
    }

    // Local Fallback Handler
    return this._localDispatch(action, payload, actor);
  },

  _localDispatch: function(action, payload, actor) {
    switch (action) {
      case 'system.ping':
        return { success: true, data: { status: 'ONLINE', mode: 'LOCAL_FALLBACK' } };

      case 'dashboard.stats':
        const active = this._localStore.permits.filter(p => p.Status === 'ISSUED').length;
        const pending = this._localStore.permits.filter(p => p.Status === 'SUBMITTED' || p.Status === 'VERIFIED_BY_SAFETY').length;
        const closed = this._localStore.permits.filter(p => p.Status === 'CLOSED').length;
        const openCapa = this._localStore.capas.filter(c => c.ClosureStatus !== 'CLOSED').length;
        return {
          success: true,
          data: {
            activePermits: active,
            pendingPermits: pending,
            closedPermits: closed,
            totalPermitsToday: this._localStore.permits.length,
            tbtsConductedToday: this._localStore.tbts.length,
            inspectionsCompleted: this._localStore.inspections.length,
            openIncidents: this._localStore.incidents.filter(i => i.Status !== 'CLOSED').length,
            openCapas: openCapa,
            safeManHours: 148520,
            lostTimeInjury: 0,
            daysWithoutLTI: 142,
            complianceScore: 98.4,
            criticalAlerts: [
              { id: 'ALT-01', text: 'Heavy Tandem Lift active in AREA-01 (Axle Forging Line) - 10M exclusion zone strictly enforced.', severity: 'WARNING' },
              { id: 'ALT-02', text: 'Hot Work welding in AREA-04 requires 30-min continuous fire watch post-completion.', severity: 'INFO' }
            ]
          }
        };

      case 'ptw.list':
        let list = this._localStore.permits;
        if (payload.filter && payload.filter !== 'ALL') {
          list = list.filter(p => p.Status === payload.filter || p.Category === payload.filter);
        }
        return { success: true, data: { permits: list } };

      case 'ptw.create':
        const tmpl = BALSONS_SAFETY_CONFIG.PTW_TEMPLATES.find(t => t.code === payload.templateCode) || BALSONS_SAFETY_CONFIG.PTW_TEMPLATES[0];
        const newPermit = {
          PermitID: 'PTW-JTRWF-2026-' + Math.floor(1000 + Math.random() * 9000),
          TemplateCode: tmpl.code,
          Category: tmpl.category,
          AreaCode: payload.areaCode || 'AREA-01',
          WorkDescription: payload.workDescription || tmpl.name,
          Contractor: payload.contractor || 'BALSONS HEAVY LIFT',
          SupervisorID: actor ? actor.fullName : 'Ramesh Kumar',
          PlannedStart: payload.plannedStart || new Date().toISOString(),
          PlannedEnd: payload.plannedEnd || new Date(Date.now() + tmpl.validity * 3600000).toISOString(),
          RiskLevel: payload.riskLevel || 'HIGH',
          Status: 'SUBMITTED',
          IssuedTimestamp: '',
          ClosedTimestamp: '',
          PrerequisitesChecked: JSON.stringify(payload.prerequisites || tmpl.prerequisites)
        };
        this._localStore.permits.unshift(newPermit);
        return { success: true, data: { permit: newPermit, message: 'Permit submitted successfully for verification.' } };

      case 'ptw.verify':
        const pVerify = this._localStore.permits.find(p => p.PermitID === payload.permitId);
        if (pVerify) pVerify.Status = 'VERIFIED_BY_SAFETY';
        return { success: true, data: { permitId: payload.permitId, status: 'VERIFIED_BY_SAFETY', message: 'Verified by Safety Officer.' } };

      case 'ptw.approve':
        const pApprove = this._localStore.permits.find(p => p.PermitID === payload.permitId);
        if (pApprove) {
          pApprove.Status = 'ISSUED';
          pApprove.IssuedTimestamp = new Date().toISOString();
        }
        return { success: true, data: { permitId: payload.permitId, status: 'ISSUED', message: 'Permit officially issued!' } };

      case 'ptw.reject':
        const pReject = this._localStore.permits.find(p => p.PermitID === payload.permitId);
        if (pReject) pReject.Status = 'REJECTED';
        return { success: true, data: { permitId: payload.permitId, status: 'REJECTED', message: 'Permit has been rejected.' } };

      case 'ptw.close':
        const pClose = this._localStore.permits.find(p => p.PermitID === payload.permitId);
        if (pClose) {
          pClose.Status = 'CLOSED';
          pClose.ClosedTimestamp = new Date().toISOString();
        }
        return { success: true, data: { permitId: payload.permitId, status: 'CLOSED', message: 'Permit safely closed and worksite handed back.' } };

      case 'tbt.list':
        return { success: true, data: { tbts: this._localStore.tbts } };

      case 'tbt.create':
        const newTbt = {
          TbtID: 'TBT-JTRWF-2026-' + Math.floor(100 + Math.random() * 900),
          Date: payload.date || new Date().toISOString().split('T')[0],
          Time: payload.time || '08:00',
          AreaCode: payload.areaCode || 'AREA-01',
          Topic: payload.topic || 'Workplace Safety & Rigging Controls',
          SupervisorID: actor ? actor.fullName : 'Ramesh Kumar',
          AttendeesCount: payload.attendeesCount || 10,
          PhotoUrl: 'assets/images/tbt_sample.jpg',
          KeyPointsDiscussed: payload.keyPoints || 'Pinch points, 100% tie-off, housekeeping.',
          Status: 'CONDUCTED'
        };
        this._localStore.tbts.unshift(newTbt);
        return { success: true, data: { tbt: newTbt, message: 'Toolbox Talk recorded.' } };

      case 'inspection.list':
        return { success: true, data: { inspections: this._localStore.inspections } };

      case 'inspection.create':
        const nonComp = parseInt(payload.nonCompliantCount) || 0;
        const newInsp = {
          InspID: 'INSP-JTRWF-2026-' + Math.floor(100 + Math.random() * 900),
          Date: payload.date || new Date().toISOString().split('T')[0],
          AreaCode: payload.areaCode || 'AREA-01',
          Category: payload.category || 'General Safety Inspection',
          InspectorName: actor ? actor.fullName : 'Bikram Patra',
          TotalItems: payload.totalItems || 10,
          CompliantCount: payload.compliantCount || 10,
          NonCompliantCount: nonComp,
          Status: nonComp > 0 ? 'ACTION_REQUIRED' : 'SATISFACTORY'
        };
        this._localStore.inspections.unshift(newInsp);
        if (nonComp > 0 && payload.observation) {
          const newCapa = {
            CapaID: 'CAPA-2026-' + Math.floor(100 + Math.random() * 900),
            SourceType: 'INSPECTION',
            SourceRefID: newInsp.InspID,
            FindingDescription: payload.observation,
            RiskLevel: payload.riskLevel || 'MEDIUM',
            CorrectiveAction: payload.correctiveAction || 'Immediate rectification on site',
            PreventiveAction: payload.preventiveAction || 'Supervisory checklist review',
            AssignedOwner: payload.assignedOwner || 'Area Supervisor',
            TargetDate: new Date(Date.now() + 48 * 3600000).toISOString().split('T')[0],
            ClosureStatus: 'OPEN',
            VerifiedBy: '',
            ClosedDate: ''
          };
          this._localStore.capas.unshift(newCapa);
        }
        return { success: true, data: { inspection: newInsp, message: 'Inspection logged.' } };

      case 'lifting.list':
        return { success: true, data: { liftingPlans: this._localStore.liftingPlans } };

      case 'lifting.create':
        const load = parseFloat(payload.loadWeightTons) || 10;
        const cap = parseFloat(payload.calculatedCapacityTons) || 50;
        const util = (load / cap) * 100;
        const newLift = {
          LiftID: 'LFT-JTRWF-2026-' + Math.floor(100 + Math.random() * 900),
          PermitID: payload.permitId || 'PTW-JTRWF-2026-1001',
          LiftCategory: util > 80 ? 'CRITICAL / TANDEM LIFT' : 'STANDARD HEAVY LIFT',
          CraneID: payload.craneId || 'CRN-DEMAG-250T',
          LoadWeightTons: load,
          CalculatedCapacityTons: cap,
          RiggingPlanRef: payload.riggingPlanRef || 'RP-SCHULER-V1',
          RiggerLeader: payload.riggerLeader || 'Ramesh Kumar',
          ApprovedBy: actor ? actor.fullName : 'Gajendra Rao',
          Status: 'APPROVED'
        };
        this._localStore.liftingPlans.unshift(newLift);
        return { success: true, data: { liftingPlan: newLift, message: 'Lifting plan verified.' } };

      case 'hazard.list':
        return { success: true, data: { hazards: this._localStore.hazards } };

      case 'hazard.create':
        const newHaz = {
          HazardID: 'HAZ-JTRWF-2026-' + Math.floor(100 + Math.random() * 900),
          ReportedDate: payload.reportedDate || new Date().toISOString().split('T')[0],
          AreaCode: payload.areaCode || 'AREA-01',
          HazardType: payload.hazardType || 'Unsafe Act (UA)',
          Severity: payload.severity || 'MEDIUM',
          Description: payload.description || 'Observed hazard',
          ReportedBy: actor ? actor.fullName : 'Site Personnel',
          ImmediateAction: payload.immediateAction || 'Contained immediately',
          Status: 'CONTAINED'
        };
        this._localStore.hazards.unshift(newHaz);
        return { success: true, data: { hazard: newHaz, message: 'Hazard reported.' } };

      case 'incident.list':
        return { success: true, data: { incidents: this._localStore.incidents } };

      case 'incident.create':
        const newInc = {
          IncidentID: 'INC-JTRWF-2026-' + Math.floor(100 + Math.random() * 900),
          DateTime: payload.dateTime || new Date().toISOString(),
          AreaCode: payload.areaCode || 'AREA-01',
          IncidentType: payload.incidentType || 'NEAR MISS',
          Severity: payload.severity || 'LOW',
          Title: payload.title || 'Near Miss Event Reported',
          Description: payload.description || '',
          InjuredPerson: payload.injuredPerson || 'NONE',
          DamagedEquipment: payload.damagedEquipment || 'NONE',
          InvestigatorID: actor ? actor.fullName : 'Bikram Patra',
          Status: 'UNDER_INVESTIGATION'
        };
        this._localStore.incidents.unshift(newInc);
        return { success: true, data: { incident: newInc, message: 'Incident reported.' } };

      case 'capa.list':
        return { success: true, data: { capas: this._localStore.capas } };

      case 'capa.update':
        const capa = this._localStore.capas.find(c => c.CapaID === payload.capaId);
        if (capa) {
          capa.ClosureStatus = payload.status || 'CLOSED';
          capa.VerifiedBy = actor ? actor.fullName : 'Safety Manager';
          capa.ClosedDate = new Date().toISOString().split('T')[0];
        }
        return { success: true, data: { capaId: payload.capaId, message: 'CAPA updated.' } };

      case 'reports.generateDSR':
        const dateStr = payload.date || new Date().toISOString().split('T')[0];
        return {
          success: true,
          data: {
            dsr: {
              reportDate: dateStr,
              project: BALSONS_SAFETY_CONFIG.PROJECT_NAME,
              location: BALSONS_SAFETY_CONFIG.LOCATION,
              contractor: BALSONS_SAFETY_CONFIG.CONTRACTOR_NAME,
              executiveSummary: 'Zero reportable injuries or LTIs across all active bays. Heavy lifting of press components executed in full adherence with approved rigging plans.',
              kpis: {
                safeManHours: 148520,
                daysWithoutLTI: 142,
                activePermits: this._localStore.permits.filter(p => p.Status === 'ISSUED').length,
                tbtsConductedToday: this._localStore.tbts.length,
                openIncidents: 0,
                complianceScore: 98.4
              },
              manpowerOnSite: 68,
              certifiedRiggersActive: 8,
              equipmentInspectedToday: 6,
              permits: this._localStore.permits,
              tbts: this._localStore.tbts,
              capas: this._localStore.capas
            }
          }
        };

      default:
        return { success: true, data: {} };
    }
  }
};
