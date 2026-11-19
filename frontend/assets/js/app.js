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
    let formCode = 'PTW-GEN';
    let permit = null;
    if (isBlank) {
      formCode = item.code || item;
    } else {
      permit = item;
      formCode = permit.TemplateCode || 'PTW-GEN';
    }

    const exactForms = (typeof BALSONS_EXACT_PTW_FORMS !== 'undefined') ? BALSONS_EXACT_PTW_FORMS : [];
    const formSpec = exactForms.find(f => f.code === formCode) || exactForms[0] || {};

    const title = formSpec.title || 'GENERAL WORK PERMIT';
    const meta = formSpec.meta_table || [];
    const sec01 = formSpec.sec01_table || [];
    const sec02 = formSpec.sec02_table || [];
    const sec03 = formSpec.sec03_table || [];
    const sec05 = formSpec.sec05_table || [];
    const appr = formSpec.approval_table || [];
    const close = formSpec.closure_table || [];
    const stopWork = formSpec.stop_work || 'Work only within the approved scope, location, conditions and validity.';

    const permitNo = (!isBlank && permit) ? permit.PermitID : '____________________________';
    const dateStr = (!isBlank && permit) ? this.formatDate(permit.PlannedStart) : '____ / ____ / ______';
    const areaStr = (!isBlank && permit) ? permit.AreaCode : '____________________________';

    const html = [];
    html.push('<div class="docx-permit-sheet">');

    // 1. Top Header: Logo + BALSONS + PERMIT TO WORK + TITLE
    html.push(`
      <div style="text-align: center; margin-bottom: 12px;">
        <img src="assets/images/balsons-logo.png" alt="BALSONS" style="height: 48px; object-fit: contain; margin-bottom: 4px;"><br>
        <div style="font-size: 18px; font-weight: 800; letter-spacing: 1px; color: #000000; line-height: 1.15;">BALSONS</div>
        <div style="font-size: 13px; font-weight: 800; color: #000000; line-height: 1.2;">PERMIT TO WORK</div>
        <div style="font-size: 15px; font-weight: 800; color: #000000; line-height: 1.3; text-decoration: underline;">${title}</div>
      </div>
    `);

    // 2. Metadata Table (2x4)
    html.push('<table class="docx-table" style="margin-bottom: 8px;">');
    for (let r of meta) {
      html.push('<tr>');
      for (let i = 0; i < r.length; i += 2) {
        let label = r[i];
        let val = r[i+1] || '';
        html.push(`<td style="width: 20%; font-weight: 700; background: #F3F4F6;">${label}</td>`);
        html.push(`<td style="width: 30%; font-weight: 600;">${val}</td>`);
      }
      html.push('</tr>');
    }
    html.push('</table>');

    // 3. Top Reference Line
    html.push(`
      <div style="font-size: 11px; font-weight: 700; margin-bottom: 8px; color: #000000;">
        Permit No.: <span style="font-family: monospace; font-weight: 800; color: ${!isBlank ? '#0097B2' : '#000000'};">${permitNo}</span> &nbsp;&nbsp;&nbsp;&nbsp; 
        Date: <span style="font-family: monospace; font-weight: 800;">${dateStr}</span> &nbsp;&nbsp;&nbsp;&nbsp; 
        Work Area: <span style="font-family: monospace; font-weight: 800; color: ${!isBlank ? '#0097B2' : '#000000'};">${areaStr}</span>
      </div>
    `);

    // 4. Red Warning Banner
    html.push(`
      <div style="font-size: 10.5px; font-weight: 800; color: #DC2626; border: 1.5px solid #DC2626; padding: 4px 8px; margin-bottom: 10px; text-align: center; background: #FEF2F2;">
        DO NOT START WORK until the permit is reviewed, approved and formally issued.
      </div>
    `);

    // 5. 01 WORK REQUEST AND APPLICANT DETAILS
    html.push('<div class="docx-section-title">01  WORK REQUEST AND APPLICANT DETAILS</div>');
    html.push('<table class="docx-table">');
    for (let r of sec01) {
      html.push('<tr>');
      for (let i = 0; i < r.length; i += 2) {
        let label = r[i];
        let val = r[i+1] || '';
        if (!isBlank && permit) {
          if (label.includes('Applicant / Supervisor')) val = `<strong style="color: #0097B2;">${permit.SupervisorID}</strong>`;
          else if (label.includes('Contractor / Department')) val = `<strong>${permit.Contractor || 'BALSONS'}</strong>`;
          else if (label.includes('Work start')) val = this.formatDateTime(permit.PlannedStart);
          else if (label.includes('Work end')) val = this.formatDateTime(permit.PlannedEnd);
          else if (label.includes('Exact location')) val = `<strong>${permit.AreaCode}</strong>`;
          else if (label.includes('No. of persons')) val = '8 Persons (Inducted)';
        }
        html.push(`<td style="width: 22%; font-weight: 700; background: #F9FAFB;">${label}</td>`);
        html.push(`<td style="width: 28%;">${val}</td>`);
      }
      html.push('</tr>');
    }
    html.push('</table>');

    // 6. 02 TASK-SPECIFIC INFORMATION
    html.push('<div class="docx-section-title">02  TASK-SPECIFIC INFORMATION</div>');
    html.push('<table class="docx-table">');
    for (let r of sec02) {
      html.push('<tr>');
      for (let i = 0; i < r.length; i += 2) {
        let label = r[i];
        let val = r[i+1] || '';
        if (!isBlank && permit) {
          if (label.includes('Work activity') || label.includes('activity / task') || label.includes('Scope') || label.includes('Purpose and scope')) {
            val = `<strong>${permit.WorkDescription}</strong>`;
          } else if (label.includes('RA / JSA') || label.includes('Risk Assessment')) {
            val = `JSA-JTRWF-${permit.AreaCode}-2026-REV01`;
          } else if (label.includes('Exact work location')) {
            val = permit.AreaCode;
          }
        }
        html.push(`<td style="width: 24%; font-weight: 700; background: #F9FAFB;">${label}</td>`);
        html.push(`<td style="width: 26%;">${val}</td>`);
      }
      html.push('</tr>');
    }
    html.push('</table>');

    // 7. 03 SAFETY VERIFICATION CHECKLIST
    html.push('<div class="docx-section-title">03  SAFETY VERIFICATION CHECKLIST</div>');
    html.push('<table class="docx-table">');
    for (let r of sec03) {
      html.push('<tr>');
      for (let cellText of r) {
        if (cellText && cellText.trim()) {
          let rendered = cellText;
          if (!isBlank && permit) {
            rendered = rendered.replace('[ ] Y', '<strong style="color: #059669;">[☑] Y</strong>');
          }
          html.push(`<td style="width: 50%; font-size: 10px; padding: 4px 6px;">${rendered}</td>`);
        } else {
          html.push('<td style="width: 50%;"></td>');
        }
      }
      html.push('</tr>');
    }
    html.push('</table>');

    // 8. 04 SPECIALIZED RECORD (CSE, ELE, MHI, LFT)
    if (formSpec.has_sec04) {
      let sec04Title = formSpec.sec04_title || '04  SPECIALIZED RECORD';
      html.push(`<div class="docx-section-title">${sec04Title}</div>`);
      let sec04Table = formSpec.sec04_table || [];
      html.push('<table class="docx-table">');
      for (let idx = 0; idx < sec04Table.length; idx++) {
        let r = sec04Table[idx];
        let isHeader = (idx === 0 && formCode === 'PTW-CSE');
        html.push('<tr>');
        for (let cell of r) {
          if (isHeader) {
            html.push(`<td style="font-weight: 800; background: #E5E7EB; text-align: center; font-size: 10px;">${cell}</td>`);
          } else {
            let rendered = cell;
            if (!isBlank && permit) {
              if (cell.includes('[ ] Yes')) rendered = cell.replace('[ ] Yes', '<strong style="color: #059669;">[☑] Yes</strong>');
            }
            html.push(`<td style="font-size: 10px; padding: 4px 6px;">${rendered}</td>`);
          }
        }
        html.push('</tr>');
      }
      html.push('</table>');
      if (formSpec.sec04_note) {
        html.push(`<div style="font-size: 10px; font-weight: 600; margin-top: -6px; margin-bottom: 8px;">${formSpec.sec04_note}</div>`);
      }
    }

    // 9. 05 HAZARDS, ADDITIONAL CONTROLS AND SUPPORTING DOCUMENTS
    html.push('<div class="docx-section-title">05  HAZARDS, ADDITIONAL CONTROLS AND SUPPORTING DOCUMENTS</div>');
    html.push('<table class="docx-table">');
    for (let r of sec05) {
      let label = r[0];
      let val = r[1] || '';
      if (!isBlank && permit) {
        if (label.includes('Identified hazards')) val = `Pinch points, suspended load, elevated access (${permit.RiskLevel || 'HIGH'} Risk)`;
        else if (label.includes('Additional control')) val = 'Dedicated supervisor standby, 10M exclusion zone, 100% PPE compliance';
        else if (label.includes('PPE')) val = 'Mandatory helmet, safety boots, high-vis vest, task-specific gloves/harness';
        else if (label.includes('Emergency')) val = 'Site Safety Hotline +91 94370 XXXXX · OHC Medic +91 97760 XXXXX';
      }
      html.push('<tr>');
      html.push(`<td style="width: 32%; font-weight: 700; background: #F9FAFB;">${label}</td>`);
      html.push(`<td style="width: 68%;">${val}</td>`);
      html.push('</tr>');
    }
    html.push('</table>');

    // 10. STOP-WORK CONDITION
    html.push(`
      <div style="font-size: 10.5px; font-weight: 800; color: #991B1B; background: #FEF2F2; border-left: 4px solid #DC2626; padding: 5px 10px; margin-bottom: 10px;">
        STOP-WORK CONDITION: ${stopWork}
      </div>
    `);

    // 11. 06 APPLICANT DECLARATION
    html.push('<div class="docx-section-title">06  APPLICANT DECLARATION</div>');
    html.push(`
      <div style="font-size: 10px; line-height: 1.4; margin-bottom: 6px; color: #111827;">
        I confirm that the work scope and location are correctly described, the work team has been briefed, and the required controls and supporting documents have been identified. I will stop work and seek reassessment if conditions or scope change.
      </div>
      <div style="font-size: 10.5px; font-weight: 700; margin-bottom: 10px; color: #000000;">
        Applicant name: <span style="text-decoration: underline;">${(!isBlank && permit) ? permit.SupervisorID : '__________________________'}</span> &nbsp;&nbsp;&nbsp; 
        Signature: <span style="text-decoration: underline;">${(!isBlank && permit) ? 'Signed & Submitted ✓' : '__________________________'}</span> &nbsp;&nbsp;&nbsp; 
        Date / Time: <span style="text-decoration: underline;">${(!isBlank && permit) ? this.formatDateTime(permit.PlannedStart) : '__________________________'}</span>
      </div>
    `);

    // 12. APPROVAL WORKFLOW – SEQUENTIAL
    html.push('<div class="docx-section-title">APPROVAL WORKFLOW – SEQUENTIAL</div>');
    html.push('<table class="docx-table">');
    for (let idx = 0; idx < appr.length; idx++) {
      let r = appr[idx];
      let isHeader = (idx === 0);
      html.push('<tr>');
      for (let c of r) {
        if (isHeader) {
          html.push(`<td style="font-weight: 800; background: #E5E7EB; font-size: 10px;">${c}</td>`);
        } else {
          let cellVal = c;
          if (!isBlank && permit) {
            if (cellVal.includes('[ ] Submit')) cellVal = '<strong style="color: #059669;">[☑] Submit (Done)</strong>';
            if (cellVal.includes('[ ] Approve') && (permit.Status === 'VERIFIED' || permit.Status === 'ISSUED' || permit.Status === 'CLOSED')) {
              cellVal = '<strong style="color: #059669;">[☑] Approve (Verified)</strong>';
            }
          }
          html.push(`<td style="font-size: 10px; padding: 4px 6px;">${cellVal}</td>`);
        }
      }
      html.push('</tr>');
    }
    html.push('</table>');
    html.push(`
      <div style="font-size: 10.5px; font-weight: 700; margin-top: -6px; margin-bottom: 10px; color: #000000;">
        Permit issued by: <span style="text-decoration: underline;">${(!isBlank && permit && (permit.Status === 'ISSUED' || permit.Status === 'CLOSED')) ? 'Gajendra Rao (Site Safety Mgr)' : '__________________________'}</span> &nbsp;&nbsp;&nbsp; 
        Signature: <span style="text-decoration: underline;">${(!isBlank && permit && (permit.Status === 'ISSUED' || permit.Status === 'CLOSED')) ? 'Signed ✓' : '____________________'}</span> &nbsp;&nbsp;&nbsp; 
        Valid from: <span style="text-decoration: underline;">${(!isBlank && permit) ? this.formatDateTime(permit.PlannedStart) : '____________'}</span> &nbsp;&nbsp;&nbsp; 
        To: <span style="text-decoration: underline;">${(!isBlank && permit) ? this.formatDateTime(permit.PlannedEnd) : '____________'}</span>
      </div>
    `);

    // 13. WORK COMPLETION / SUSPENSION / CLOSURE
    html.push('<div class="docx-section-title">WORK COMPLETION / SUSPENSION / CLOSURE</div>');
    html.push('<table class="docx-table">');
    for (let r of close) {
      html.push('<tr>');
      for (let cell of r) {
        let cellVal = cell;
        if (!isBlank && permit && permit.Status === 'CLOSED') {
          if (cellVal.includes('[ ] Yes')) cellVal = cellVal.replace('[ ] Yes', '<strong style="color: #059669;">[☑] Yes</strong>');
        }
        html.push(`<td style="font-size: 10px; padding: 4px 6px;">${cellVal}</td>`);
      }
      html.push('</tr>');
    }
    html.push('</table>');
    html.push(`
      <div style="font-size: 10.5px; font-weight: 700; margin-top: -6px; margin-bottom: 4px; color: #000000;">
        Final status: &nbsp; 
        ${(!isBlank && permit && permit.Status === 'CLOSED') ? '<strong style="color: #059669;">[☑] CLOSED</strong>' : '[ ] CLOSED'} &nbsp;&nbsp; 
        [ ] SUSPENDED &nbsp;&nbsp; [ ] CANCELLED &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        Closure / handback notes: <span style="text-decoration: underline;">${(!isBlank && permit && permit.Status === 'CLOSED') ? 'Area inspected, tools removed, locks cleared, handed back safe.' : '__________________________________________'}</span>
      </div>
    `);

    html.push('</div>'); // end docx-permit-sheet
    return html.join('\n');
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

  formatDate: function(dtStr) {
    if (!dtStr) return '____ / ____ / ______';
    try {
      const d = new Date(dtStr);
      if (isNaN(d.getTime())) return dtStr;
      return d.toLocaleDateString('en-GB');
    } catch (e) {
      return dtStr;
    }
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
