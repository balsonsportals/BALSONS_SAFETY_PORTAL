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
  // NAVIGATION & MODULE ROUTING (SMART DROPDOWNS, LOCKED TAB BAR, NO SCROLLBAR)
  // ==========================================
  initNavigation: function() {
    // 1. Dropdown Toggle Buttons
    const dropdownToggles = document.querySelectorAll('.beds-dropdown-toggle');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const parent = toggle.closest('.beds-nav-dropdown');
        const wasOpen = parent.classList.contains('open');
        // Close all open dropdowns
        document.querySelectorAll('.beds-nav-dropdown').forEach(d => d.classList.remove('open'));
        if (!wasOpen) {
          parent.classList.add('open');
        }
      });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.beds-nav-dropdown')) {
        document.querySelectorAll('.beds-nav-dropdown').forEach(d => d.classList.remove('open'));
      }
    });

    // Close dropdowns on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.beds-nav-dropdown').forEach(d => d.classList.remove('open'));
      }
    });

    // 2. Direct Nav Tabs (Dashboard, etc.)
    document.querySelectorAll('button.beds-nav-tab[data-target]').forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = tab.getAttribute('data-target');
        if (targetView) {
          document.querySelectorAll('.beds-nav-dropdown').forEach(d => d.classList.remove('open'));
          this.switchView(targetView);
        }
      });
    });

    // 3. Dropdown Menu Items
    document.querySelectorAll('.beds-dropdown-item[data-target]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = item.getAttribute('data-target');
        if (targetView) {
          document.querySelectorAll('.beds-nav-dropdown').forEach(d => d.classList.remove('open'));
          this.switchView(targetView);
        }
      });
    });
  },

  switchView: function(viewId) {
    this.currentView = viewId;
    
    // Update direct nav tabs
    document.querySelectorAll('button.beds-nav-tab[data-target]').forEach(t => {
      if (t.getAttribute('data-target') === viewId) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    // Update smart dropdown toggle buttons and dropdown items
    document.querySelectorAll('.beds-nav-dropdown').forEach(dropdown => {
      const hasActiveChild = dropdown.querySelector(`.beds-dropdown-item[data-target="${viewId}"]`);
      const toggleBtn = dropdown.querySelector('.beds-dropdown-toggle');
      if (toggleBtn) {
        if (hasActiveChild) {
          toggleBtn.classList.add('active');
        } else {
          toggleBtn.classList.remove('active');
        }
      }

      dropdown.querySelectorAll('.beds-dropdown-item').forEach(item => {
        if (item.getAttribute('data-target') === viewId) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    });

    // Update view panels
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
      case 'view-permit-studio':
        this.renderPermitStudio();
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
  // BALSONS CONTROLLED 7 PERMIT FORMS STUDIO & OFFICIAL A4 GENERATOR
  // Reference: BALSONS_JTRWF_PTW_FORMS_V1_1_SEVEN_PERMITS.docx
  // ==========================================
  currentStudioFormCode: 'PTW-GEN',

  renderPermitStudio: function(selectedCode) {
    if (selectedCode) {
      this.currentStudioFormCode = selectedCode;
    }
    const currentCode = this.currentStudioFormCode;
    const templates = BALSONS_SAFETY_CONFIG.PTW_TEMPLATES;

    // 1. Render Selector Pill Bar
    const selectorContainer = document.getElementById('permit-studio-selector');
    if (selectorContainer) {
      selectorContainer.innerHTML = templates.map(t => {
        const isActive = t.code === currentCode;
        return `
          <button class="beds-btn ${isActive ? 'beds-btn-primary' : 'beds-btn-secondary'}" 
                  onclick="BalsonsSafetyApp.renderPermitStudio('${t.code}')" 
                  style="font-size: 11.5px; padding: 6px 12px; display: inline-flex; align-items: center; gap: 6px;">
            <strong style="font-family: monospace;">${t.code}</strong>
            <span>${t.name}</span>
            <span style="font-size: 9.5px; opacity: 0.85; font-family: monospace; background: rgba(0,0,0,0.12); padding: 1px 5px; border-radius: 3px;">
              ${t.docNo}
            </span>
          </button>
        `;
      }).join('');
    }

    // 2. Render Authentic A4 Document
    const formContainer = document.getElementById('studio-rendered-form');
    if (formContainer) {
      const tmpl = templates.find(t => t.code === currentCode) || templates[0];
      formContainer.innerHTML = this.buildOfficialA4PermitHtml(tmpl, true);
    }
  },

  printStudioForm: function() {
    const tmpl = BALSONS_SAFETY_CONFIG.PTW_TEMPLATES.find(t => t.code === this.currentStudioFormCode) || BALSONS_SAFETY_CONFIG.PTW_TEMPLATES[0];
    const modalBody = document.getElementById('ptw-print-content');
    if (modalBody) {
      modalBody.innerHTML = this.buildOfficialA4PermitHtml(tmpl, true);
      const modal = document.getElementById('modal-permit-print');
      if (modal) modal.classList.add('active');
    }
  },

  initiatePermitFromStudio: function() {
    const code = this.currentStudioFormCode || 'PTW-GEN';
    const modal = document.getElementById('modal-ptw-create');
    const select = document.getElementById('ptw-form-template');
    if (select) {
      select.value = code;
      this.renderPrerequisitesChecklist(code);
    }
    if (modal) modal.classList.add('active');
  },

  viewPermitPrint: function(permitId) {
    if (!this.cachedPermits || this.cachedPermits.length === 0) {
      this.cachedPermits = BalsonsSafetyApi._localStore.permits;
    }
    const permit = this.cachedPermits.find(p => p.PermitID === permitId) || this.cachedPermits[0];
    if (!permit) return;

    const modalBody = document.getElementById('ptw-print-content');
    if (!modalBody) return;

    modalBody.innerHTML = this.buildOfficialA4PermitHtml(permit, false);
    const modal = document.getElementById('modal-permit-print');
    if (modal) modal.classList.add('active');
  },

  buildOfficialA4PermitHtml: function(item, isBlank) {
    let tmpl, permit;
    if (isBlank) {
      tmpl = item;
      permit = {
        PermitID: 'BAL-JTRWF-PTW-______',
        Status: 'CONTROLLED FORM',
        SupervisorID: '________________________',
        Contractor: 'BALSONS HEAVY LIFT & SHIFT',
        AreaCode: 'AREA-01 / 02 / 03 / 04',
        RiskLevel: tmpl.code === 'PTW-CSE' || tmpl.code === 'PTW-LFT' ? 'CRITICAL' : 'HIGH',
        WorkDescription: `Execution of approved work scope under controlled conditions in accordance with BALSONS safety procedures and JTRWF site safety manual.`,
        PlannedStart: new Date().toISOString(),
        PlannedEnd: new Date(Date.now() + (tmpl.validity || 8) * 3600000).toISOString()
      };
    } else {
      permit = item;
      tmpl = BALSONS_SAFETY_CONFIG.PTW_TEMPLATES.find(t => t.code === permit.TemplateCode) || BALSONS_SAFETY_CONFIG.PTW_TEMPLATES[0];
    }

    const prereqs = tmpl.prerequisites || [];
    let techData = {};
    if (!isBlank && permit.TechnicalData) {
      try { techData = JSON.parse(permit.TechnicalData); } catch (e) { techData = {}; }
    }

    // Build Section 04 dynamic content based on form type (All 7 forms from docx)
    let sec04Html = '';
    if (tmpl.code === 'PTW-CSE') {
      // Confined Space: Atmospheric Gas Test Record (Table 27 in docx)
      sec04Html = `
        <div class="permit-section-heading">04  ATMOSPHERIC GAS TEST RECORD (MANDATORY BEFORE ENTRY & CONTINUOUS)</div>
        <table class="permit-spec-table">
          <thead>
            <tr style="background: #E5E7EB; font-weight: 700;">
              <td style="width: 18%;">TEST TIME</td>
              <td style="width: 16%;">O₂ % (19.5% - 23.5%)</td>
              <td style="width: 15%;">LEL % (0%)</td>
              <td style="width: 22%;">TOXIC GAS (CO &lt;25ppm, H₂S &lt;10ppm)</td>
              <td style="width: 15%;">TESTER NAME</td>
              <td style="width: 14%;">SIGNATURE</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${isBlank ? 'Before Entry: ____:____ hrs' : 'Before Entry: 08:30 hrs'}</td>
              <td><strong>${isBlank ? '____ %' : '20.9%'}</strong></td>
              <td><strong>${isBlank ? '____ %' : '0%'}</strong></td>
              <td>${isBlank ? 'CO: ___ ppm | H₂S: ___ ppm' : 'CO: 0 ppm | H₂S: 0 ppm (Safe)'}</td>
              <td>${isBlank ? '________________' : 'Bikram Patra'}</td>
              <td>${isBlank ? '________' : 'Signed ✓'}</td>
            </tr>
            <tr>
              <td>${isBlank ? 'During Work: ____:____ hrs' : 'During Work: 11:30 hrs'}</td>
              <td><strong>${isBlank ? '____ %' : '20.8%'}</strong></td>
              <td><strong>${isBlank ? '____ %' : '0%'}</strong></td>
              <td>${isBlank ? 'CO: ___ ppm | H₂S: ___ ppm' : 'CO: 0 ppm | H₂S: 0 ppm (Safe)'}</td>
              <td>${isBlank ? '________________' : 'Bikram Patra'}</td>
              <td>${isBlank ? '________' : 'Signed ✓'}</td>
            </tr>
            <tr>
              <td>${isBlank ? 'After Break: ____:____ hrs' : 'After Break: 14:00 hrs'}</td>
              <td><strong>${isBlank ? '____ %' : '20.9%'}</strong></td>
              <td><strong>${isBlank ? '____ %' : '0%'}</strong></td>
              <td>${isBlank ? 'CO: ___ ppm | H₂S: ___ ppm' : 'CO: 0 ppm | H₂S: 0 ppm (Safe)'}</td>
              <td>${isBlank ? '________________' : 'Bikram Patra'}</td>
              <td>${isBlank ? '________' : 'Signed ✓'}</td>
            </tr>
          </tbody>
        </table>
        <div style="font-size: 9.5px; color: #4B5563; margin-top: -6px; margin-bottom: 8px;">
          Calibrated Multi-Gas Detector ID: <strong>CAL-GAS-JTRWF-2026-88</strong> · Calibration Validity: <strong>2026-12-31</strong> · Continuous forced-air ventilation active.
        </div>
      `;
    } else if (tmpl.code === 'PTW-ELE') {
      // Electrical Work & LOTO Record (Table 35 in docx)
      sec04Html = `
        <div class="permit-section-heading">04  ELECTRICAL ISOLATION & LOTO VERIFICATION RECORD</div>
        <table class="permit-spec-table">
          <thead>
            <tr style="background: #E5E7EB; font-weight: 700;">
              <td>ISOLATION POINT / BREAKER ID</td>
              <td>TAG NO</td>
              <td>LOCK NO</td>
              <td>PROVED DEAD (0.00V)</td>
              <td>EARTHING APPLIED</td>
              <td>ISOLATED BY</td>
              <td>SIGNATURE</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-family: monospace;">${isBlank ? 'SWB-MAIN-MCC-B3' : (techData.isolationPoint || 'SWB-MAIN-MCC-B3 / FEEDER-04')}</td>
              <td style="font-family: monospace;">${isBlank ? 'TAG-BAL-8812' : 'TAG-BAL-8812'}</td>
              <td style="font-family: monospace;">${isBlank ? 'PL-BAL-7714' : (techData.lockRef || 'PL-BAL-7714')}</td>
              <td><strong style="color: #059669;">☑ YES (0.00 V)</strong></td>
              <td><strong>☑ YES (Portable Earth)</strong></td>
              <td>${isBlank ? 'Authorised Electrical Lead' : (techData.isolatedBy || 'Authorised Electrical Lead')}</td>
              <td>${isBlank ? '________' : 'Signed ✓'}</td>
            </tr>
            <tr>
              <td style="font-family: monospace;">${isBlank ? 'AUX-CONTROL-PNL-02' : 'AUX-CONTROL-PNL-02 / 110V DC'}</td>
              <td style="font-family: monospace;">${isBlank ? 'TAG-BAL-8813' : 'TAG-BAL-8813'}</td>
              <td style="font-family: monospace;">${isBlank ? 'PL-BAL-7715' : 'PL-BAL-7715'}</td>
              <td><strong style="color: #059669;">☑ YES (0.00 V)</strong></td>
              <td><strong>☑ YES (Control Earth)</strong></td>
              <td>${isBlank ? 'Authorised Electrical Lead' : (techData.isolatedBy || 'Authorised Electrical Lead')}</td>
              <td>${isBlank ? '________' : 'Signed ✓'}</td>
            </tr>
          </tbody>
        </table>
      `;
    } else if (tmpl.code === 'PTW-MHI') {
      // Mechanical / Hydraulic Isolation Record (Table 43 in docx)
      sec04Html = `
        <div class="permit-section-heading">04  MECHANICAL & HYDRAULIC ISOLATION RECORD (ZERO-ENERGY VERIFICATION)</div>
        <table class="permit-spec-table">
          <thead>
            <tr style="background: #E5E7EB; font-weight: 700;">
              <td>EQUIPMENT / HYDRAULIC UNIT</td>
              <td>ISOLATION METHOD</td>
              <td>VALVE / PIN TAG</td>
              <td>LOCK NO</td>
              <td>GAUGE READING</td>
              <td>BLEED VERIFIED</td>
              <td>SIGNATURE</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1600T Schuler Main Hydraulic Ram</td>
              <td>Double Block & Bleed + Mechanical Safety Pin</td>
              <td style="font-family: monospace;">VALVE-HYD-ISO-01</td>
              <td style="font-family: monospace;">PL-MHI-9921</td>
              <td><strong style="color: #059669;">0.0 Bar (Zero Energy)</strong></td>
              <td><strong>☑ Drained & Locked</strong></td>
              <td>${isBlank ? '________' : 'Signed ✓'}</td>
            </tr>
            <tr>
              <td>Auxiliary Nitrogen Accumulator Bank</td>
              <td>Isolate Valve Closed & Residual Vented</td>
              <td style="font-family: monospace;">VALVE-N2-ACC-03</td>
              <td style="font-family: monospace;">PL-MHI-9922</td>
              <td><strong style="color: #059669;">0.0 Bar (Depressurised)</strong></td>
              <td><strong>☑ Blinding Tagged</strong></td>
              <td>${isBlank ? '________' : 'Signed ✓'}</td>
            </tr>
          </tbody>
        </table>
      `;
    } else if (tmpl.code === 'PTW-LFT') {
      // Heavy Lifting & Rigging Configuration Record (Table 51 in docx)
      sec04Html = `
        <div class="permit-section-heading">04  CRITICAL LIFTING & RIGGING CONFIGURATION RECORD</div>
        <table class="permit-spec-table">
          <tr>
            <td style="width: 25%;"><strong>Load Description & Verified Weight:</strong></td>
            <td style="width: 25%; font-weight: 700;">${isBlank ? '______ Tons (Tare Verified)' : (techData.loadWeight || '145.0 Tons (Press Bed)')}</td>
            <td style="width: 25%;"><strong>Operating Working Radius:</strong></td>
            <td style="width: 25%; font-weight: 700;">${isBlank ? '______ Meters' : (techData.radius || '9.5 Meters')}</td>
          </tr>
          <tr>
            <td><strong>Crane Model & Capacity:</strong></td>
            <td>${isBlank ? 'Terex Demag CC-2800 (600T)' : 'Terex Demag CC-2800 (600T Crawler)'}</td>
            <td><strong>Boom Length & Angle:</strong></td>
            <td>${isBlank ? '48.0 M Main Boom @ 72°' : '48.0 M Main Boom @ 72°'}</td>
          </tr>
          <tr>
            <td><strong>Rated Crane Capacity at Radius:</strong></td>
            <td><strong>${isBlank ? '______ Tons' : (techData.craneCapacity || '190.0 Tons')}</strong></td>
            <td><strong>Calculated Utilisation Margin:</strong></td>
            <td><span class="badge badge-info">${isBlank ? '&lt; 80% Safe Limit' : (techData.utilization || '76.3%') + ' (&lt; 80% Safe Limit)'}</span></td>
          </tr>
          <tr>
            <td><strong>Rigging Slings & Shackles:</strong></td>
            <td colspan="3">Wire Rope Slings TPI-WR-8842 (SWL 65T × 4) · Bow Shackles Green Pin 55T (Valid TPI Form 11) · Heavy Timber Outrigger Spreader Mats Inspected.</td>
          </tr>
        </table>
      `;
    } else if (tmpl.code === 'PTW-HOT') {
      // Hot Work Specific Record
      sec04Html = `
        <div class="permit-section-heading">04  HOT WORK & FIRE WATCH VERIFICATION RECORD</div>
        <table class="permit-spec-table">
          <tr>
            <td style="width: 25%;"><strong>Hot Work Activity Type:</strong></td>
            <td style="width: 25%;">[☑] Electric Arc Welding  [ ] Gas Cutting  [☑] Grinding</td>
            <td style="width: 25%;"><strong>Flammable Atmosphere (LEL):</strong></td>
            <td style="width: 25%;"><strong style="color: #059669;">0% LEL (Verified Safe)</strong></td>
          </tr>
          <tr>
            <td><strong>Dedicated Fire Watch Person:</strong></td>
            <td>${isBlank ? '__________________ (Briefed)' : 'Ramesh Kumar (Equipped & Briefed)'}</td>
            <td><strong>Extinguisher On Standby:</strong></td>
            <td>10kg DCP (Hydro-test Valid 2026-10)</td>
          </tr>
          <tr>
            <td><strong>Spark Containment Measures:</strong></td>
            <td colspan="3">Fire Retardant Blankets installed beneath cutting zone · 10M radial area cleared of all combustibles · Post-work 30-min fire monitoring mandatory.</td>
          </tr>
        </table>
      `;
    } else if (tmpl.code === 'PTW-HT') {
      // Work at Height Specific Record
      sec04Html = `
        <div class="permit-section-heading">04  WORK AT HEIGHT & FALL ARREST VERIFICATION RECORD</div>
        <table class="permit-spec-table">
          <tr>
            <td style="width: 25%;"><strong>Work Elevation Above Ground:</strong></td>
            <td style="width: 25%;"><strong>${isBlank ? '______ Meters' : '12.5 Meters'}</strong></td>
            <td style="width: 25%;"><strong>Access Equipment Type:</strong></td>
            <td style="width: 25%;">Cuplok Scaffolding with Green Tag</td>
          </tr>
          <tr>
            <td><strong>Scaffold Green Tag Ref:</strong></td>
            <td>TAG-SCAF-JTRWF-2026-118</td>
            <td><strong>Lifeline Anchor Point Rating:</strong></td>
            <td><strong style="color: #059669;">&gt; 22 kN (Certified Structural Anchor)</strong></td>
          </tr>
          <tr>
            <td><strong>Fall Arrest & Dropped Objects:</strong></td>
            <td colspan="3">Full Body Harness with Twin Shock-Absorbing Lanyards (100% Tie-Off) · Tool lanyards secured · 10M exclusion zone barricaded below.</td>
          </tr>
        </table>
      `;
    } else {
      // General Work Record
      sec04Html = `
        <div class="permit-section-heading">04  TASK INTERFACE & ENGINEERING CONTROLS RECORD</div>
        <table class="permit-spec-table">
          <tr>
            <td style="width: 25%;"><strong>Adjacent Activity Coordination:</strong></td>
            <td style="width: 25%;"><strong style="color: #059669;">Cleared (No Clashing Ops)</strong></td>
            <td style="width: 25%;"><strong>Barricading & Warning Signs:</strong></td>
            <td style="width: 25%;"><strong style="color: #059669;">10M Radial Zone Enforced</strong></td>
          </tr>
          <tr>
            <td><strong>Portable Power Tools Tagging:</strong></td>
            <td>Quarterly Color Tag (Green - Tested)</td>
            <td><strong>Illumination Level:</strong></td>
            <td>&gt; 150 Lux at Working Plane</td>
          </tr>
        </table>
      `;
    }

    return `
      <div class="a4-permit-document">
        <!-- Control Header matching BALSONS docx -->
        <div class="permit-doc-header">
          <div class="permit-logo-section">
            <img src="assets/images/balsons-logo.png" alt="BALSONS" style="height: 48px; object-fit: contain;">
          </div>
          <div class="permit-title-section text-center" style="flex: 1; padding: 0 16px;">
            <div class="permit-org-title">BALSONS HEAVY LIFT & SHIFT</div>
            <div class="permit-doc-heading">PERMIT TO WORK — ${tmpl.name.toUpperCase()}</div>
            <div class="permit-project-sub">Project: JUPITER TATRAVAGONKA RAILWHEEL FACTORY (JTRWF) · KHORDHA, ODISHA</div>
            <div style="font-size: 9.5px; color: #6B7280; margin-top: 2px;">
              Doc No: <strong>${tmpl.docNo || 'BAL-JTRWF-SAF-PTW-001'}</strong> · Revision: <strong>V1.1 – CONTROLLED</strong> · Validity: <strong>${tmpl.validity || 8} Hours</strong>
            </div>
          </div>
          <div class="permit-meta-box" style="text-align: right; font-size: 11px;">
            <div><strong>PERMIT NO:</strong> <span class="font-mono text-primary font-bold">${permit.PermitID}</span></div>
            <div><strong>FORM CODE:</strong> <span class="badge badge-neutral font-mono font-bold">${tmpl.code}</span></div>
            <div><strong>STATUS:</strong> ${isBlank ? '<span class="badge badge-neutral font-mono font-bold">CONTROLLED MASTER FORM</span>' : this.getStatusBadge(permit.Status)}</div>
          </div>
        </div>

        <!-- Section 01: Work Request & Applicant Details -->
        <div class="permit-section-heading">01  WORK REQUEST AND APPLICANT DETAILS</div>
        <table class="permit-spec-table">
          <tr>
            <td style="width: 25%;"><strong>Applicant / Supervisor:</strong></td>
            <td style="width: 25%;"><strong>${permit.SupervisorID}</strong></td>
            <td style="width: 25%;"><strong>Contractor / Department:</strong></td>
            <td style="width: 25%;">${permit.Contractor}</td>
          </tr>
          <tr>
            <td><strong>Designated Work Area:</strong></td>
            <td><strong class="text-primary">${permit.AreaCode}</strong></td>
            <td><strong>Work Workforce (Persons):</strong></td>
            <td>${isBlank ? '____ Persons (TBT Briefed)' : '8 Persons (TBT Briefed)'}</td>
          </tr>
          <tr>
            <td><strong>Work Start (Date / Time):</strong></td>
            <td>${isBlank ? '____ / ____ / 2026   ____:____ hrs' : this.formatDateTime(permit.PlannedStart)}</td>
            <td><strong>Work End (Date / Time):</strong></td>
            <td>${isBlank ? '____ / ____ / 2026   ____:____ hrs' : this.formatDateTime(permit.PlannedEnd)}</td>
          </tr>
        </table>

        <!-- Section 02: Task-Specific Information -->
        <div class="permit-section-heading">02  TASK-SPECIFIC INFORMATION & WORK SCOPE</div>
        <table class="permit-spec-table">
          <tr>
            <td style="width: 25%;"><strong>Detailed Task Scope:</strong></td>
            <td colspan="3"><strong>${permit.WorkDescription}</strong></td>
          </tr>
          <tr>
            <td><strong>Approved Risk Assessment / JSA:</strong></td>
            <td>JSA-JTRWF-${isBlank ? 'AREA-XX' : permit.AreaCode}-2026-REV01</td>
            <td><strong>Assessed Risk Rating:</strong></td>
            <td><span class="badge ${permit.RiskLevel === 'CRITICAL' ? 'badge-danger' : 'badge-warning'}">${permit.RiskLevel} RISK (CONTROLLED)</span></td>
          </tr>
        </table>

        <!-- Section 03: Safety Verification Checklist -->
        <div class="permit-section-heading">03  SAFETY VERIFICATION CHECKLIST (MANDATORY PHYSICAL PREREQUISITES)</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 8px;">
          ${prereqs.map((pr, idx) => `
            <div style="display: flex; justify-content: space-between; align-items: center; background: #F9FAFB; border: 1px solid #E5E7EB; padding: 4px 8px; font-size: 10px;">
              <span><strong>Item ${idx + 1}:</strong> ${pr}</span>
              <span style="font-weight: 800; color: ${isBlank ? '#6B7280' : '#059669'}; font-family: monospace; white-space: nowrap; margin-left: 6px;">
                ${isBlank ? '[ ] Y  [ ] N  [ ] N/A' : '[☑] Y  [ ] N'}
              </span>
            </div>
          `).join('')}
        </div>

        <!-- Section 04: Specialized Technical Record -->
        ${sec04Html}

        <!-- Section 05: PPE & Emergency Equipment Requirements -->
        <div class="permit-section-heading">05  PERSONAL PROTECTIVE EQUIPMENT (PPE) & EMERGENCY CONTROLS</div>
        <table class="permit-spec-table">
          <tr>
            <td style="width: 25%;"><strong>Mandatory Site PPE:</strong></td>
            <td colspan="3">[☑] Safety Helmet (EN 397)  [☑] Steel Toe Boots (IS 15298)  [☑] High-Vis Reflective Vest  [☑] Safety Goggles</td>
          </tr>
          <tr>
            <td><strong>Activity Specific PPE:</strong></td>
            <td colspan="3">
              ${tmpl.code === 'PTW-HT' ? '[☑] Full Body Harness (IS 3521 / EN 361) with Double Lanyard & Scaffold Hooks' : ''}
              ${tmpl.code === 'PTW-HOT' ? '[☑] Leather Welding Apron & Heavy Gauntlets · Auto-darkening Welding Shield · Ear Plugs' : ''}
              ${tmpl.code === 'PTW-CSE' ? '[☑] SCBA / Positive Pressure Airline Respirator · 24V Flameproof Inspection Torch' : ''}
              ${tmpl.code === 'PTW-ELE' ? '[☑] Arc Flash Face Shield (40 cal/cm²) · Dielectric Insulating Gloves (Class 00-4)' : ''}
              ${tmpl.code === 'PTW-LFT' || tmpl.code === 'PTW-GEN' || tmpl.code === 'PTW-MHI' ? '[☑] Heavy Rigging Leather Palm Gloves · Tag Line Guides · Radio Walkie-Talkies' : ''}
            </td>
          </tr>
          <tr>
            <td><strong>Emergency Response:</strong></td>
            <td colspan="3">Site Safety Officer: <strong>+91 94370 XXXXX</strong> · Occupational Health Centre (OHC): <strong>+91 97760 XXXXX</strong> · JTRWF Fire Control: <strong>0674-XXXXXXX</strong></td>
          </tr>
        </table>

        <!-- Section 06: Sequential Approval Workflow & Four-Tier Sign-Off -->
        <div class="permit-section-heading">06  SEQUENTIAL APPROVAL WORKFLOW & FOUR-TIER AUTHORISATION SIGN-OFF</div>
        <div class="permit-signatures-grid">
          <div class="sig-card">
            <div class="sig-role">STAGE 1: WORK SUPERVISOR</div>
            <div class="sig-name">${isBlank ? '________________________' : permit.SupervisorID}</div>
            <div class="sig-line">JSA Briefed & Crew Inducted</div>
            <div class="sig-stamp">${isBlank ? '[ ] REQUEST SUBMITTED' : 'SUBMITTED & SIGNED ✓'}</div>
          </div>
          <div class="sig-card">
            <div class="sig-role">STAGE 2: SAFETY OFFICER</div>
            <div class="sig-name">${isBlank ? 'Bikram Patra / Rakesh Swain' : 'Bikram Patra (Safety Officer)'}</div>
            <div class="sig-line">Physical Worksite Verified</div>
            <div class="sig-stamp">${isBlank ? '[ ] VERIFIED & ENDORSED' : (permit.Status === 'SUBMITTED' ? 'PENDING VERIFICATION' : 'VERIFIED ✓')}</div>
          </div>
          <div class="sig-card">
            <div class="sig-role">STAGE 3: AUTHORISED SITE MANAGER</div>
            <div class="sig-name">${isBlank ? 'Gajendra Rao (Site Safety Mgr)' : 'Gajendra Rao (Safety / Site Mgr)'}</div>
            <div class="sig-line">Full Authorisation & Issuance</div>
            <div class="sig-stamp">${isBlank ? '[ ] AUTHORISED & ISSUED' : (permit.Status === 'ISSUED' || permit.Status === 'CLOSED' ? 'AUTHORISED & ISSUED ✓' : 'AWAITING APPROVAL')}</div>
          </div>
          <div class="sig-card">
            <div class="sig-role">STAGE 4: WORK SUPERVISOR ACCEPTANCE</div>
            <div class="sig-name">${isBlank ? '________________________' : permit.SupervisorID}</div>
            <div class="sig-line">Permit Received & Terms Briefed</div>
            <div class="sig-stamp">${isBlank ? '[ ] PERMIT RECEIVED' : (permit.Status === 'ISSUED' || permit.Status === 'CLOSED' ? 'ACCEPTED & WORK ACTIVE ✓' : 'PENDING ISSUE')}</div>
          </div>
        </div>

        <!-- Section 07: Work Handback, Housekeeping & Formal Closure Sign-Off -->
        <div class="permit-section-heading">07  WORK COMPLETION, HOUSEKEEPING & FORMAL CLOSURE SIGN-OFF</div>
        <table class="permit-spec-table">
          <tr>
            <td style="width: 25%;"><strong>Work Status at Handback:</strong></td>
            <td style="width: 25%;">[ ] 100% Completed  [ ] Suspended  [ ] Cancelled</td>
            <td style="width: 25%;"><strong>Housekeeping & Tools Cleared:</strong></td>
            <td style="width: 25%;"><strong style="color: #059669;">[☑] Inspected & Safe</strong></td>
          </tr>
          <tr>
            <td><strong>LOTO Locks / Isolations Removed:</strong></td>
            <td>[☑] De-isolated & Handed Back</td>
            <td><strong>All Personnel Evacuated:</strong></td>
            <td>[☑] Headcount Verified Out</td>
          </tr>
          <tr>
            <td><strong>Performing Supervisor Closure:</strong></td>
            <td>Name: ${isBlank ? '________________' : permit.SupervisorID} · Sign: ________</td>
            <td><strong>Safety Officer Final Closure:</strong></td>
            <td>Name: Bikram Patra · Sign: ________ Date: ____/____</td>
          </tr>
        </table>

        <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 4px; padding: 6px 10px; font-size: 9.5px; color: #991B1B; margin-top: 8px; font-weight: 600;">
          ⚠️ <strong>STOP-WORK AUTHORITY:</strong> ANY BALSONS OR JTRWF PERSONNEL IS EMPOWERED AND REQUIRED TO STOP WORK IMMEDIATELY IF UNSAFE CONDITIONS, ATMOSPHERIC CHANGES, OR UNCONTROLLED RISKS ARISE. WORK CANNOT RESUME UNTIL RE-AUTHORIZED.
        </div>
      </div>
    `;
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
