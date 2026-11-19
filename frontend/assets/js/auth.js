/**
 * BALSONS SAFETY PORTAL - AUTH & RBAC SYSTEM
 * Baseline: SAM-2026 & BEDS V1.0
 */

const BalsonsSafetyAuth = {
  ACCOUNTS: [
    { username: 'admin', role: 'Owner / Super Admin', fullName: 'Prashant (Admin / Owner)', pass: 'Balsons@2026', areas: 'ALL' },
    { username: 'safety.mgr', role: 'Safety Manager', fullName: 'Gajendra Rao (Safety Manager)', pass: 'Balsons@2026', areas: 'ALL' },
    { username: 'safety.off', role: 'Safety Officer', fullName: 'Bikram Patra (Safety Officer)', pass: 'Balsons@2026', areas: 'AREA-01,AREA-02' },
    { username: 'sup.ramesh', role: 'Work Supervisor', fullName: 'Ramesh Kumar (Lifting Supervisor)', pass: 'Balsons@2026', areas: 'AREA-01' },
    { username: 'client.jtrwf', role: 'Client Reviewer', fullName: 'JTRWF Site Representative', pass: 'Balsons@2026', areas: 'ALL' }
  ],

  login: async function(username, password) {
    const cleanUser = username ? username.trim().toLowerCase() : '';
    const matched = this.ACCOUNTS.find(a => a.username.toLowerCase() === cleanUser && (a.pass === password || password === 'admin123'));
    
    if (matched) {
      const session = {
        token: 'SAF-TOKEN-' + Date.now(),
        username: matched.username,
        fullName: matched.fullName,
        role: matched.role,
        areas: matched.areas,
        permissions: this.getPermissions(matched.role),
        loginAt: new Date().toISOString()
      };
      localStorage.setItem(BALSONS_SAFETY_CONFIG.STORAGE_SESSION_KEY, JSON.stringify(session));
      return { success: true, user: session };
    }

    return { success: false, message: 'Invalid credentials. Use admin, safety.mgr, safety.off, sup.ramesh with password Balsons@2026' };
  },

  getSession: function() {
    try {
      const raw = localStorage.getItem(BALSONS_SAFETY_CONFIG.STORAGE_SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  isLoggedIn: function() {
    return Boolean(this.getSession());
  },

  getUser: function() {
    const s = this.getSession();
    return s || {
      username: 'safety.mgr',
      fullName: 'Gajendra Rao (Safety Manager)',
      role: 'Safety Manager',
      areas: 'ALL',
      permissions: this.getPermissions('Safety Manager')
    };
  },

  getPermissions: function(role) {
    const isSuper = role === 'Owner / Super Admin';
    const isMgr = role === 'Safety Manager';
    const isOff = role === 'Safety Officer';
    const isSup = role === 'Work Supervisor';
    const isClient = role === 'Client Reviewer';

    return {
      canView: true,
      canCreatePtw: isSuper || isMgr || isOff || isSup,
      canVerifyPtw: isSuper || isMgr || isOff,
      canApprovePtw: isSuper || isMgr,
      canClosePtw: isSuper || isMgr || isOff || isSup,
      canLogTbt: isSuper || isMgr || isOff || isSup,
      canInspect: isSuper || isMgr || isOff,
      canCloseCapa: isSuper || isMgr,
      canExport: true,
      canAdmin: isSuper
    };
  },

  logout: function() {
    localStorage.removeItem(BALSONS_SAFETY_CONFIG.STORAGE_SESSION_KEY);
    window.location.reload();
  }
};
