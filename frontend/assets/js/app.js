/**
 * BALSONS SAFETY PORTAL - MAIN APPLICATION CONTROLLER
 * Architecture: SAM-2026 & BEDS V1.0
 * Project: Jupiter Tatravagonka Railwheel Factory (JTRWF), Khordha, Odisha
 */

document.addEventListener('DOMContentLoaded', function() {
  BalsonsSafetyApp.init();
});

const BalsonsSafetyApp = {
  currentView: 'view-dashboard',
  cachedPermits: [],
  cachedTbts: [],
  cachedInspections: [],
  cachedCapas: [],

  init: async function() {
    this.initTheme();
    this.initAuth();
    this.initNavigation();
    this.initLanguage();
    this.initModals();
    await this.loadDashboardData();
    this.renderAreaOptions();
    this.renderTemplateOptions();
  },

  // ==========================================
  // THEME & STYLES (BEDS V1.0 STANDARD)
  // ==========================================
  initTheme: function() {
    const saved = localStorage.getItem(BALSONS_SAFETY_CONFIG.STORAGE_THEME_KEY) || document.documentElement.getAttribute('data-theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    this.updateThemeButton(saved);

    const toggleBtn = document.getElementById('btn-toggle-theme');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(BALSONS_SAFETY_CONFIG.STORAGE_THEME_KEY, next);
        this.updateThemeButton(next);
      });
    }
  },

  updateThemeButton: function(theme) {
    const btn = document.getElementById('btn-toggle-theme');
    if (btn) {
      btn.innerHTML = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    }
  },

  // ==========================================
  // AUTHENTICATION & USER PROFILE
  // ==========================================
  initAuth: function() {
    const user = BalsonsSafetyAuth.getUser();
    const userDisplay = document.getElementById('header-user-display');
    const userRoleBadge = document.getElementById('header-role-badge');
    if (userDisplay) userDisplay.textContent = user.fullName;
    if (userRoleBadge) userRoleBadge.textContent = user.role;

    const switchUserBtn = document.getElementById('btn-switch-user');
    if (switchUserBtn) {
      switchUserBtn.addEventListener('click', () => this.showLoginModal());
    }
  },

  showLoginModal: function() {
    const modal = document.getElementById('modal-login');
    if (modal) modal.classList.add('active');
  },

  // ==========================================
  // NAVIGATION & MODULE ROUTING
  // ==========================================
  initNavigation: function() {
    const tabs = document.querySelectorAll('.beds-nav-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = tab.getAttribute('data-target');
        if (targetView) {
          this.switchView(targetView);
        }
      });
    });
  },

  switchView: function(viewId) {
    this.currentView = viewId;
    
    // Update tabs
    document.querySelectorAll('.beds-nav-tab').forEach(t => {
      if (t.getAttribute('data-target') === viewId) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    // Update views
    document.querySelectorAll('.beds-view-panel').forEach(v => {
      if (v.id === viewId) {
        v.classList.add('active');
      } else {
        v.classList.remove('active');
      }
    });

    // Load module-specific data
    switch (viewId) {
      case 'view-dashboard':
        this.loadDashboardData();
        break;
      case 'view-ptw':
        this.loadPermits();
        break;
      case 'view-tbt':
        this.loadTbts();
        break;
      case 'view-inspections':
        this.loadInspections();
        break;
      case 'view-lifting':
        this.loadLiftingPlans();
        break;
      case 'view-hazards':
        this.loadHazards();
        break;
      case 'view-incidents':
        this.loadIncidents();
        break;
      case 'view-capa':
        this.loadCapas();
        break;
      case 'view-reports':
        this.loadDsrReport();
        break;
    }

    BalsonsSafetyI18n.applyTranslations();
  },

  // ==========================================
  // LANGUAGE SWITCHER
  // ==========================================
  initLanguage: function() {
    document.querySelectorAll('.lang-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        BalsonsSafetyI18n.setLang(lang);
      });
    });
    BalsonsSafetyI18n.applyTranslations();
  },

  // ==========================================
  // MODULE 01: DASHBOARD
  // ==========================================
  loadDashboardData: async function() {
    const res = await BalsonsSafetyApi.call('dashboard.stats');
    if (res.success && res.data) {
      const d = res.data;
      this.setText('kpi-safe-hours', d.safeManHours ? d.safeManHours.toLocaleString() : '148,520');
      this.setText('kpi-days-lti', d.daysWithoutLTI || '142');
      this.setText('kpi-active-permits', d.activePermits || '0');
      this.setText('kpi-pending-permits', d.pendingPermits || '0');
      this.setText('kpi-tbts-today', d.tbtsConductedToday || '0');
      this.setText('kpi-open-capas', d.openCapas || '0');
      this.setText('kpi-compliance-rate', (d.complianceScore || '98.4') + '%');
    }
    // Also load recent active permits for the dashboard widget
    await this.loadPermits('ISSUED', 'dash-active-permits-body');
  },

  // ==========================================
  // MODULE 05: PERMIT-TO-WORK (PTW)
  // ==========================================
  loadPermits: async function(filter = 'ALL', targetTableId = 'ptw-table-body') {
    const tableBody = document.getElementById(targetTableId);
    if (!tableBody) return;

    tableBody.innerHTML = `<tr><td colspan="9" class="text-center py-4">Loading Work Permits...</td></tr>`;

    const res = await BalsonsSafetyApi.call('ptw.list', { filter: filter });
    if (res.success && res.data && res.data.permits) {
      this.cachedPermits = res.data.permits;
      this.renderPermitRows(this.cachedPermits, targetTableId);
    }
  },

  renderPermitRows: function(permits, targetTableId) {
    const tbody = document.getElementById(targetTableId);
    if (!tbody) return;

    if (!permits || permits.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" class="text-center py-4 text-muted">No Work Permits found matching filter.</td></tr>`;
      return;
    }

    const user = BalsonsSafetyAuth.getUser();
    const isSafetyOff = user.role === 'Safety Officer' || user.role === 'Owner / Super Admin';
    const isSiteMgr = user.role === 'Safety Manager' || user.role === 'Owner / Super Admin';

    tbody.innerHTML = permits.map(p => {
      const statusBadge = this.getStatusBadge(p.Status);
      const catBadge = this.getCategoryBadge(p.Category);
      const riskBadge = this.getRiskBadge(p.RiskLevel);

      let actionBtns = `
        <button class="beds-btn beds-btn-sm beds-btn-outline" onclick="BalsonsSafetyApp.viewPermitPrint('${p.PermitID}')" title="Print Official A4 PTW">
          🖨️ A4
        </button>
      `;

      if (p.Status === 'SUBMITTED' && isSafetyOff) {
        actionBtns += `
          <button class="beds-btn beds-btn-sm beds-btn-primary" onclick="BalsonsSafetyApp.verifyPermit('${p.PermitID}')">
            ✓ Verify
          </button>
        `;
      } else if (p.Status === 'VERIFIED_BY_SAFETY' && isSiteMgr) {
        actionBtns += `
          <button class="beds-btn beds-btn-sm beds-btn-success" onclick="BalsonsSafetyApp.approvePermit('${p.PermitID}')">
            ⚡ Issue
          </button>
        `;
      } else if (p.Status === 'ISSUED') {
        actionBtns += `
          <button class="beds-btn beds-btn-sm beds-btn-secondary" onclick="BalsonsSafetyApp.closePermit('${p.PermitID}')">
            🔒 Handback
          </button>
        `;
      }

      return `
        <tr>
          <td><strong class="text-primary font-mono">${p.PermitID}</strong></td>
          <td>${catBadge}</td>
          <td>
            <strong>${p.WorkDescription}</strong>
            <div class="text-xs text-muted">Tmpl: ${p.TemplateCode} · ${p.Contractor}</div>
          </td>
          <td><span class="badge badge-neutral">${p.AreaCode}</span></td>
          <td>${p.SupervisorID}</td>
          <td>
            <div class="text-xs">Start: ${this.formatDateTime(p.PlannedStart)}</div>
            <div class="text-xs">End: ${this.formatDateTime(p.PlannedEnd)}</div>
          </td>
          <td>${riskBadge}</td>
          <td>${statusBadge}</td>
          <td><div class="action-btn-group">${actionBtns}</div></td>
        </tr>
      `;
    }).join('');
  },

  // Actions on Permits
  verifyPermit: async function(permitId) {
    if (!confirm(`Verify safety readiness for ${permitId} as Safety Officer?`)) return;
    const res = await BalsonsSafetyApi.call('ptw.verify', { permitId: permitId });
    if (res.success) {
      alert('Permit verified by Safety Officer! Forwarded to Site Manager for Final Authorization.');
      this.loadPermits();
      this.loadDashboardData();
    }
  },

  approvePermit: async function(permitId) {
    if (!confirm(`Authorize and issue permit ${permitId} for execution?`)) return;
    const res = await BalsonsSafetyApi.call('ptw.approve', { permitId: permitId });
    if (res.success) {
      alert('PTW Officially Authorized & Active on Site!');
      this.loadPermits();
      this.loadDashboardData();
    }
  },

  closePermit: async function(permitId) {
    const comments = prompt('Enter Worksite Handback Comments (e.g. site cleared, tools removed, isolation locks lifted):', 'Work completed safely. Area cleared.');
    if (comments === null) return;

    const res = await BalsonsSafetyApi.call('ptw.close', { permitId: permitId, closureData: { comments: comments } });
    if (res.success) {
      alert('Permit safely closed and worksite handed back.');
      this.loadPermits();
      this.loadDashboardData();
    }
  },

  // ==========================================
  // OFFICIAL PRINTABLE A4 PERMIT MODAL
  // ==========================================
  viewPermitPrint: function(permitId) {
    const permit = this.cachedPermits.find(p => p.PermitID === permitId);
    if (!permit) return;

    const tmpl = BALSONS_SAFETY_CONFIG.PTW_TEMPLATES.find(t => t.code === permit.TemplateCode) || { prerequisites: [] };
    let prereqs = [];
    try {
      prereqs = JSON.parse(permit.PrerequisitesChecked);
    } catch (e) {
      prereqs = tmpl.prerequisites || [];
    }

    const modalBody = document.getElementById('ptw-print-content');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div class="a4-permit-document">
        <div class="permit-doc-header">
          <div class="permit-logo-section">
            <img src="assets/images/balsons-logo.png" alt="BALSONS" style="height: 48px; object-fit: contain;">
          </div>
          <div class="permit-title-section text-center">
            <div class="permit-org-title">BALSONS HEAVY LIFT & SHIFT</div>
            <div class="permit-doc-heading">PERMIT-TO-WORK AUTHORISATION CERTIFICATE</div>
            <div class="permit-project-sub">Project: JUPITER TATRAVAGONKA RAILWHEEL FACTORY (JTRWF) · KHORDHA, ODISHA</div>
          </div>
          <div class="permit-meta-box">
            <div><strong>PERMIT NO:</strong> <span class="font-mono text-primary">${permit.PermitID}</span></div>
            <div><strong>CATEGORY:</strong> ${permit.Category}</div>
            <div><strong>STATUS:</strong> ${permit.Status}</div>
          </div>
        </div>

        <table class="permit-spec-table">
          <tr>
            <td style="width: 25%;"><strong>Work Template:</strong></td>
            <td style="width: 25%;">${permit.TemplateCode}</td>
            <td style="width: 25%;"><strong>Work Area:</strong></td>
            <td style="width: 25%;"><strong>${permit.AreaCode}</strong></td>
          </tr>
          <tr>
            <td><strong>Executing Contractor:</strong></td>
            <td>${permit.Contractor}</td>
            <td><strong>Work Supervisor:</strong></td>
            <td>${permit.SupervisorID}</td>
          </tr>
          <tr>
            <td><strong>Planned Start Time:</strong></td>
            <td>${this.formatDateTime(permit.PlannedStart)}</td>
            <td><strong>Planned Completion:</strong></td>
            <td>${this.formatDateTime(permit.PlannedEnd)}</td>
          </tr>
          <tr>
            <td><strong>Scope Description:</strong></td>
            <td colspan="3"><strong>${permit.WorkDescription}</strong></td>
          </tr>
          <tr>
            <td><strong>Assessed Risk Rating:</strong></td>
            <td colspan="3"><span class="badge ${permit.RiskLevel === 'CRITICAL' ? 'badge-danger' : 'badge-warning'}">${permit.RiskLevel} RISK ACTIVITY</span></td>
          </tr>
        </table>

        <div class="permit-section-heading">MANDATORY PRE-WORK SAFETY PREREQUISITES & PHYSICAL CONTROLS VERIFIED</div>
        <div class="permit-prereq-list">
          ${prereqs.map((pr, idx) => `
            <div class="permit-prereq-item">
              <span class="prereq-box">☑</span>
              <span><strong>Item ${idx + 1}:</strong> ${pr}</span>
            </div>
          `).join('')}
        </div>

        <div class="permit-signatures-grid">
          <div class="sig-card">
            <div class="sig-role">STAGE 1: WORK SUPERVISOR</div>
            <div class="sig-name">${permit.SupervisorID}</div>
            <div class="sig-line">Verified JSA & Checklist Prerequisites</div>
            <div class="sig-stamp">SUBMITTED & SIGNED</div>
          </div>
          <div class="sig-card">
            <div class="sig-role">STAGE 2: SAFETY OFFICER</div>
            <div class="sig-name">Bikram Patra (Safety Officer)</div>
            <div class="sig-line">Physical Worksite Inspection Conducted</div>
            <div class="sig-stamp">${permit.Status === 'SUBMITTED' ? 'AWAITING' : 'VERIFIED ✓'}</div>
          </div>
          <div class="sig-card">
            <div class="sig-role">STAGE 3: SITE MANAGER / HEAD</div>
            <div class="sig-name">Gajendra Rao (Safety / Site Mgr)</div>
            <div class="sig-line">Final Authorisation & Official Permit Issue</div>
            <div class="sig-stamp">${permit.Status === 'ISSUED' || permit.Status === 'CLOSED' ? 'AUTHORISED ✓' : 'PENDING'}</div>
          </div>
          <div class="sig-card">
            <div class="sig-role">STAGE 4: PERMIT HANDBACK / CLOSURE</div>
            <div class="sig-name">${permit.Status === 'CLOSED' ? 'Work Completed' : 'Pending Completion'}</div>
            <div class="sig-line">Area Cleaned, Isolations Lifted, Safe</div>
            <div class="sig-stamp">${permit.Status === 'CLOSED' ? 'CLOSED & ARCHIVED' : 'OPEN'}</div>
          </div>
        </div>

        <div class="permit-footer-disclaimer">
          This digital permit is strictly valid only for the specified date, time, work area, and described activity at JTRWF Khordha. Any change in site conditions, weather, or work scope renders this permit immediately void and work must halt immediately until re-authorized.
        </div>
      </div>
    `;

    const modal = document.getElementById('modal-permit-print');
    if (modal) modal.classList.add('active');
  },

  // ==========================================
  // MODULE 02: TOOLBOX TALKS (TBT)
  // ==========================================
  loadTbts: async function() {
    const tbody = document.getElementById('tbt-table-body');
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4">Loading Toolbox Talks...</td></tr>`;

    const res = await BalsonsSafetyApi.call('tbt.list');
    if (res.success && res.data && res.data.tbts) {
      this.cachedTbts = res.data.tbts;
      tbody.innerHTML = this.cachedTbts.map(t => `
        <tr>
          <td><strong class="text-primary font-mono">${t.TbtID}</strong></td>
          <td>${t.Date} ${t.Time}</td>
          <td><span class="badge badge-neutral">${t.AreaCode}</span></td>
          <td>
            <strong>${t.Topic}</strong>
            <div class="text-xs text-muted">${t.KeyPointsDiscussed}</div>
          </td>
          <td>${t.SupervisorID}</td>
          <td><span class="badge badge-info">${t.AttendeesCount} Personnel</span></td>
          <td><span class="badge badge-success">${t.Status}</span></td>
        </tr>
      `).join('');
    }
  },

  // ==========================================
  // MODULE 03: SAFETY INSPECTIONS
  // ==========================================
  loadInspections: async function() {
    const tbody = document.getElementById('inspection-table-body');
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4">Loading Safety Inspections...</td></tr>`;

    const res = await BalsonsSafetyApi.call('inspection.list');
    if (res.success && res.data && res.data.inspections) {
      this.cachedInspections = res.data.inspections;
      tbody.innerHTML = this.cachedInspections.map(i => `
        <tr>
          <td><strong class="text-primary font-mono">${i.InspID}</strong></td>
          <td>${i.Date}</td>
          <td><span class="badge badge-neutral">${i.AreaCode}</span></td>
          <td><strong>${i.Category}</strong></td>
          <td>${i.InspectorName}</td>
          <td>
            <span class="badge badge-success">${i.CompliantCount} Compliant</span>
            ${i.NonCompliantCount > 0 ? `<span class="badge badge-danger">${i.NonCompliantCount} NC</span>` : ''}
          </td>
          <td>
            <span class="badge ${i.Status === 'SATISFACTORY' ? 'badge-success' : 'badge-danger'}">
              ${i.Status}
            </span>
          </td>
        </tr>
      `).join('');
    }
  },

  // ==========================================
  // MODULE 04: HEAVY LIFTING & RIGGING
  // ==========================================
  loadLiftingPlans: async function() {
    const tbody = document.getElementById('lifting-table-body');
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4">Loading Lifting Safety Plans...</td></tr>`;

    const res = await BalsonsSafetyApi.call('lifting.list');
    if (res.success && res.data && res.data.liftingPlans) {
      tbody.innerHTML = res.data.liftingPlans.map(l => {
        const util = ((l.LoadWeightTons / l.CalculatedCapacityTons) * 100).toFixed(1);
        return `
          <tr>
            <td><strong class="text-primary font-mono">${l.LiftID}</strong></td>
            <td><span class="font-mono">${l.PermitID}</span></td>
            <td><span class="badge badge-danger">${l.LiftCategory}</span></td>
            <td>${l.CraneID}</td>
            <td><strong>${l.LoadWeightTons} Tons</strong></td>
            <td>${l.CalculatedCapacityTons} Tons (${util}% util.)</td>
            <td>${l.RiggerLeader}</td>
            <td><span class="badge badge-success">${l.Status}</span></td>
          </tr>
        `;
      }).join('');
    }
  },

  // ==========================================
  // MODULE 06: HAZARDS (UA/UC)
  // ==========================================
  loadHazards: async function() {
    const tbody = document.getElementById('hazard-table-body');
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4">Loading Hazards...</td></tr>`;

    const res = await BalsonsSafetyApi.call('hazard.list');
    if (res.success && res.data && res.data.hazards) {
      tbody.innerHTML = res.data.hazards.map(h => `
        <tr>
          <td><strong class="text-primary font-mono">${h.HazardID}</strong></td>
          <td>${h.ReportedDate}</td>
          <td><span class="badge badge-neutral">${h.AreaCode}</span></td>
          <td><span class="badge badge-warning">${h.HazardType}</span></td>
          <td>
            <strong>${h.Description}</strong>
            <div class="text-xs text-muted">Action: ${h.ImmediateAction}</div>
          </td>
          <td>${h.ReportedBy}</td>
          <td><span class="badge badge-success">${h.Status}</span></td>
        </tr>
      `).join('');
    }
  },

  // ==========================================
  // MODULE 07: INCIDENTS & NEAR MISS
  // ==========================================
  loadIncidents: async function() {
    const tbody = document.getElementById('incident-table-body');
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-4">Loading Incidents...</td></tr>`;

    const res = await BalsonsSafetyApi.call('incident.list');
    if (res.success && res.data && res.data.incidents) {
      tbody.innerHTML = res.data.incidents.map(inc => `
        <tr>
          <td><strong class="text-primary font-mono">${inc.IncidentID}</strong></td>
          <td>${this.formatDateTime(inc.DateTime)}</td>
          <td><span class="badge badge-neutral">${inc.AreaCode}</span></td>
          <td><span class="badge badge-info">${inc.IncidentType}</span></td>
          <td>
            <strong>${inc.Title}</strong>
            <div class="text-xs text-muted">${inc.Description}</div>
          </td>
          <td>${inc.InvestigatorID}</td>
          <td><span class="badge badge-success">${inc.Status}</span></td>
        </tr>
      `).join('');
    }
  },

  // ==========================================
  // MODULE 11: CAPA REGISTER
  // ==========================================
  loadCapas: async function() {
    const tbody = document.getElementById('capa-table-body');
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4">Loading CAPA Register...</td></tr>`;

    const res = await BalsonsSafetyApi.call('capa.list');
    if (res.success && res.data && res.data.capas) {
      this.cachedCapas = res.data.capas;
      tbody.innerHTML = this.cachedCapas.map(c => `
        <tr>
          <td><strong class="text-primary font-mono">${c.CapaID}</strong></td>
          <td><span class="badge badge-neutral">${c.SourceType}: ${c.SourceRefID}</span></td>
          <td>
            <strong>${c.FindingDescription}</strong>
            <div class="text-xs text-success">Corrective: ${c.CorrectiveAction}</div>
            <div class="text-xs text-info">Preventive: ${c.PreventiveAction}</div>
          </td>
          <td><span class="badge ${c.RiskLevel === 'HIGH' ? 'badge-danger' : 'badge-warning'}">${c.RiskLevel}</span></td>
          <td>${c.AssignedOwner}</td>
          <td>${c.TargetDate}</td>
          <td>
            <span class="badge ${c.ClosureStatus === 'CLOSED' ? 'badge-success' : 'badge-danger'}">
              ${c.ClosureStatus}
            </span>
          </td>
          <td>
            ${c.ClosureStatus !== 'CLOSED' ? `
              <button class="beds-btn beds-btn-sm beds-btn-success" onclick="BalsonsSafetyApp.closeCapa('${c.CapaID}')">
                ✓ Close
              </button>
            ` : `<span class="text-xs text-muted">Closed by ${c.VerifiedBy}</span>`}
          </td>
        </tr>
      `).join('');
    }
  },

  closeCapa: async function(capaId) {
    if (!confirm(`Verify and mark CAPA ${capaId} as Closed?`)) return;
    const res = await BalsonsSafetyApi.call('capa.update', { capaId: capaId, status: 'CLOSED' });
    if (res.success) {
      alert('CAPA verified and marked as CLOSED.');
      this.loadCapas();
      this.loadDashboardData();
    }
  },

  // ==========================================
  // MODULE 12: DAILY SAFETY REPORT (DSR)
  // ==========================================
  loadDsrReport: async function() {
    const res = await BalsonsSafetyApi.call('reports.generateDSR');
    if (res.success && res.data && res.data.dsr) {
      const dsr = res.data.dsr;
      this.setText('dsr-date', dsr.reportDate);
      this.setText('dsr-project', dsr.project);
      this.setText('dsr-summary', dsr.executiveSummary);
      this.setText('dsr-manpower', dsr.manpowerOnSite);
      this.setText('dsr-riggers', dsr.certifiedRiggersActive);
      this.setText('dsr-equipment', dsr.equipmentInspectedToday);
    }
  },

  // ==========================================
  // MODALS & FORMS HANDLING
  // ==========================================
  initModals: function() {
    // New Permit Button
    const btnNewPtw = document.getElementById('btn-open-ptw-modal');
    if (btnNewPtw) {
      btnNewPtw.addEventListener('click', () => {
        const modal = document.getElementById('modal-ptw-create');
        if (modal) modal.classList.add('active');
      });
    }

    // Modal Close Buttons
    document.querySelectorAll('.beds-modal-close, .btn-modal-cancel').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.beds-modal-overlay').forEach(m => m.classList.remove('active'));
      });
    });

    // Template selection change -> reload prerequisites
    const templateSelect = document.getElementById('ptw-form-template');
    if (templateSelect) {
      templateSelect.addEventListener('change', (e) => {
        this.renderPrerequisitesChecklist(e.target.value);
      });
    }

    // PTW Form Submit
    const ptwForm = document.getElementById('form-create-ptw');
    if (ptwForm) {
      ptwForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handlePtwSubmit();
      });
    }

    // TBT Form Submit
    const tbtForm = document.getElementById('form-create-tbt');
    if (tbtForm) {
      tbtForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handleTbtSubmit();
      });
    }

    // Inspection Form Submit
    const inspForm = document.getElementById('form-create-inspection');
    if (inspForm) {
      inspForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handleInspectionSubmit();
      });
    }

    // Login Form Submit
    const loginForm = document.getElementById('form-login');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const u = document.getElementById('login-username').value;
        const p = document.getElementById('login-password').value;
        const res = await BalsonsSafetyAuth.login(u, p);
        if (res.success) {
          alert('Welcome, ' + res.user.fullName);
          window.location.reload();
        } else {
          alert(res.message);
        }
      });
    }
  },

  renderAreaOptions: function() {
    const selects = document.querySelectorAll('.area-select-target');
    const optionsHtml = BALSONS_SAFETY_CONFIG.WORK_AREAS.map(a => `<option value="${a.code}">${a.code}: ${a.name}</option>`).join('');
    selects.forEach(s => s.innerHTML = optionsHtml);
  },

  renderTemplateOptions: function() {
    const tmplSelect = document.getElementById('ptw-form-template');
    if (tmplSelect) {
      tmplSelect.innerHTML = BALSONS_SAFETY_CONFIG.PTW_TEMPLATES.map(t => `<option value="${t.code}">[${t.category}] ${t.code} - ${t.name}</option>`).join('');
      // Trigger initial prerequisites display
      this.renderPrerequisitesChecklist(BALSONS_SAFETY_CONFIG.PTW_TEMPLATES[0].code);
    }
  },

  renderPrerequisitesChecklist: function(templateCode) {
    const tmpl = BALSONS_SAFETY_CONFIG.PTW_TEMPLATES.find(t => t.code === templateCode) || BALSONS_SAFETY_CONFIG.PTW_TEMPLATES[0];
    const container = document.getElementById('ptw-prereq-container');
    if (!container) return;

    container.innerHTML = tmpl.prerequisites.map((p, idx) => `
      <label class="beds-checkbox-item">
        <input type="checkbox" name="ptw_prereq" value="${p}" checked required>
        <span>${p}</span>
      </label>
    `).join('');
  },

  handlePtwSubmit: async function() {
    const templateCode = document.getElementById('ptw-form-template').value;
    const areaCode = document.getElementById('ptw-form-area').value;
    const workDescription = document.getElementById('ptw-form-desc').value;
    const contractor = document.getElementById('ptw-form-contractor').value;
    const riskLevel = document.getElementById('ptw-form-risk').value;

    const checkedPrereqs = Array.from(document.querySelectorAll('input[name="ptw_prereq"]:checked')).map(el => el.value);

    const payload = {
      templateCode: templateCode,
      areaCode: areaCode,
      workDescription: workDescription,
      contractor: contractor,
      riskLevel: riskLevel,
      prerequisites: checkedPrereqs
    };

    const res = await BalsonsSafetyApi.call('ptw.create', payload);
    if (res.success) {
      alert(`Permit ${res.data.permit.PermitID} created and submitted for verification!`);
      document.getElementById('modal-ptw-create').classList.remove('active');
      this.loadPermits();
      this.loadDashboardData();
    } else {
      alert('Error creating permit: ' + (res.error ? res.error.message : 'Unknown'));
    }
  },

  handleTbtSubmit: async function() {
    const areaCode = document.getElementById('tbt-form-area').value;
    const topic = document.getElementById('tbt-form-topic').value;
    const count = parseInt(document.getElementById('tbt-form-attendees').value) || 10;
    const keyPoints = document.getElementById('tbt-form-points').value;

    const res = await BalsonsSafetyApi.call('tbt.create', {
      areaCode: areaCode,
      topic: topic,
      attendeesCount: count,
      keyPoints: keyPoints
    });

    if (res.success) {
      alert('Toolbox Talk logged successfully!');
      document.getElementById('modal-tbt-create').classList.remove('active');
      this.loadTbts();
      this.loadDashboardData();
    }
  },

  handleInspectionSubmit: async function() {
    const areaCode = document.getElementById('insp-form-area').value;
    const category = document.getElementById('insp-form-category').value;
    const nonCompliant = parseInt(document.getElementById('insp-form-nc').value) || 0;
    const observation = document.getElementById('insp-form-obs').value;

    const res = await BalsonsSafetyApi.call('inspection.create', {
      areaCode: areaCode,
      category: category,
      totalItems: 10,
      compliantCount: 10 - nonCompliant,
      nonCompliantCount: nonCompliant,
      observation: observation
    });

    if (res.success) {
      alert('Safety Inspection logged! (CAPA auto-created for non-compliant findings)');
      document.getElementById('modal-inspection-create').classList.remove('active');
      this.loadInspections();
      this.loadCapas();
      this.loadDashboardData();
    }
  },

  // ==========================================
  // UTILITY HELPERS
  // ==========================================
  setText: function(elementId, text) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = text;
  },

  formatDateTime: function(dtStr) {
    if (!dtStr) return 'N/A';
    try {
      const d = new Date(dtStr);
      return d.toLocaleDateString('en-GB') + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return dtStr;
    }
  },

  getStatusBadge: function(status) {
    switch (status) {
      case 'SUBMITTED':
        return `<span class="badge badge-warning">SUBMITTED</span>`;
      case 'VERIFIED_BY_SAFETY':
        return `<span class="badge badge-info">VERIFIED</span>`;
      case 'ISSUED':
        return `<span class="badge badge-success">ISSUED (ACTIVE)</span>`;
      case 'CLOSED':
        return `<span class="badge badge-neutral">CLOSED</span>`;
      case 'REJECTED':
        return `<span class="badge badge-danger">REJECTED</span>`;
      default:
        return `<span class="badge badge-neutral">${status}</span>`;
    }
  },

  getCategoryBadge: function(cat) {
    switch (cat) {
      case 'HOT WORK':
        return `<span class="badge badge-danger">🔥 HOT WORK</span>`;
      case 'HEIGHT WORK':
        return `<span class="badge badge-warning">🪜 HEIGHT WORK</span>`;
      case 'CONFINED SPACE':
        return `<span class="badge badge-danger">⚠️ CONFINED SPACE</span>`;
      case 'GENERAL':
      default:
        return `<span class="badge badge-info">⚙️ GENERAL</span>`;
    }
  },

  getRiskBadge: function(risk) {
    switch (risk) {
      case 'CRITICAL':
        return `<span class="badge badge-danger">CRITICAL</span>`;
      case 'HIGH':
        return `<span class="badge badge-warning">HIGH</span>`;
      case 'MEDIUM':
        return `<span class="badge badge-info">MEDIUM</span>`;
      default:
        return `<span class="badge badge-neutral">LOW</span>`;
    }
  }
};
