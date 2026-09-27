import React, { useState } from "react";
import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Mine Manager");

  const [activePage, setActivePage] = useState("Command Center");

  // Current logged-in user
  const [currentUser, setCurrentUser] = useState({
    name: "Rajiv Kumar",
    initials: "RK",
    role: "Mine Manager",
  });

  // Toast message
  const [toast, setToast] = useState(null);

  // Documents
  const [documents, setDocuments] = useState([
    {
      id: "DOC-2026-00643",
      name: "Ventilation Inspection Report",
      type: "Safety Compliance",
      uploadedBy: "Rajiv Kumar",
      date: "27 Sep 2026",
      status: "UNDER REVIEW",
      confidence: "96%",
      extracted: "18 fields",
    },
    {
      id: "DOC-2026-00642",
      name: "PPE Compliance Checklist",
      type: "Safety Compliance",
      uploadedBy: "Amit Verma",
      date: "27 Sep 2026",
      status: "VERIFIED",
      confidence: "98%",
      extracted: "24 fields",
    },
    {
      id: "DOC-2026-00641",
      name: "Environmental Monitoring Report",
      type: "Environment",
      uploadedBy: "Neha Singh",
      date: "26 Sep 2026",
      status: "VERIFIED",
      confidence: "94%",
      extracted: "16 fields",
    },
    {
      id: "DOC-2026-00640",
      name: "Worker Safety Observation",
      type: "Labour Safety",
      uploadedBy: "Rakesh Sharma",
      date: "26 Sep 2026",
      status: "PROCESSED",
      confidence: "97%",
      extracted: "12 fields",
    },
  ]);

  // Inspections
  const [inspections, setInspections] = useState([
    {
      id: "INS-2026-0148",
      zone: "PE-03",
      type: "Ventilation",
      inspector: "Rajiv Kumar",
      date: "27 Sep 2026",
      risk: "CRITICAL",
      status: "OVERDUE",
    },
    {
      id: "INS-2026-0147",
      zone: "PE-07",
      type: "PPE Compliance",
      inspector: "Amit Verma",
      date: "27 Sep 2026",
      risk: "HIGH",
      status: "OPEN",
    },
    {
      id: "INS-2026-0146",
      zone: "PE-02",
      type: "Environment",
      inspector: "Neha Singh",
      date: "26 Sep 2026",
      risk: "MEDIUM",
      status: "IN REVIEW",
    },
    {
      id: "INS-2026-0145",
      zone: "PE-05",
      type: "Worker Safety",
      inspector: "Rakesh Sharma",
      date: "26 Sep 2026",
      risk: "LOW",
      status: "COMPLETED",
    },
  ]);

  // Corrective actions
  const [correctiveActions, setCorrectiveActions] = useState([
    {
      id: "CA-2026-00842",
      title: "Ventilation inspection overdue",
      issue: "Ventilation inspection overdue",
      zone: "PE-03",
      priority: "CRITICAL",
      risk: "CRITICAL",
      owner: "Rajiv Kumar",
      dueDate: "27 Sep 2026",
      deadline: "27 Sep 2026",
      status: "OPEN",
    },
    {
      id: "CA-2026-00841",
      title: "PPE compliance gap",
      issue: "PPE compliance gap",
      zone: "PE-07",
      priority: "HIGH",
      risk: "HIGH",
      owner: "Amit Verma",
      dueDate: "28 Sep 2026",
      deadline: "28 Sep 2026",
      status: "IN PROGRESS",
    },
    {
      id: "CA-2026-00840",
      title: "Dust monitoring report pending",
      issue: "Dust monitoring report pending",
      zone: "PE-02",
      priority: "MEDIUM",
      risk: "MEDIUM",
      owner: "Neha Singh",
      dueDate: "30 Sep 2026",
      deadline: "30 Sep 2026",
      status: "OPEN",
    },
    {
      id: "CA-2026-00839",
      title: "Worker safety observation",
      issue: "Worker safety observation",
      zone: "PE-05",
      priority: "LOW",
      risk: "LOW",
      owner: "Rakesh Sharma",
      dueDate: "26 Sep 2026",
      deadline: "26 Sep 2026",
      status: "COMPLETED",
    },
  ]);

  // Audit logs
  const [auditLogs, setAuditLogs] = useState([
    {
      id: "AUD-2026-09271",
      time: "10:42:18 AM",
      date: "27 Sep 2026",
      user: "Rajiv Kumar",
      role: "Mine Manager",
      action: "Inspection Created",
      module: "Inspections",
      zone: "PE-03",
      status: "RECORDED",
    },
    {
      id: "AUD-2026-09270",
      time: "10:36:44 AM",
      date: "27 Sep 2026",
      user: "CoalGuard AI",
      role: "AI System",
      action: "Risk Score Updated",
      module: "Risk Intelligence",
      zone: "PE-03",
      status: "AI GENERATED",
    },
    {
      id: "AUD-2026-09269",
      time: "10:21:09 AM",
      date: "27 Sep 2026",
      user: "Amit Verma",
      role: "Safety Officer",
      action: "Corrective Action Updated",
      module: "Corrective Actions",
      zone: "PE-07",
      status: "RECORDED",
    },
  ]);

  // -----------------------------
  // LOGIN
  // -----------------------------

  const handleLogin = (e) => {
    e.preventDefault();

    if (!employeeId || !password) {
      alert("Please enter Employee ID and Password");
      return;
    }

    setIsLoggedIn(true);
  };

  // -----------------------------
  // TOAST
  // -----------------------------

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // -----------------------------
  // AUDIT LOG
  // -----------------------------

  const addAuditLog = (action, module, zone = "—") => {
    const newLog = {
      id: `AUD-${Date.now()}`,
      time: new Date().toLocaleTimeString(),
      date: "27 Sep 2026",
      user: currentUser.name,
      role: currentUser.role,
      action,
      module,
      zone,
      status: "RECORDED",
    };

    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // -----------------------------
  // DOCUMENT UPLOAD
  // -----------------------------

  const handleDocumentUpload = (file) => {
    if (!file) return;

    const newDocument = {
      id: `DOC-${Date.now()}`,
      name: file.name,
      type: "Uploaded Document",
      uploadedBy: currentUser.name,
      date: "27 Sep 2026",
      status: "UNDER REVIEW",
      confidence: "Processing",
      extracted: "Pending",
      fileUrl: URL.createObjectURL(file),
    };

    setDocuments((prev) => [newDocument, ...prev]);

    addAuditLog("Document Uploaded", "Documents");

    showToast(`${file.name} uploaded successfully`);
  };

  // -----------------------------
  // VERIFY DOCUMENT
  // -----------------------------

  const verifyDocument = (documentId) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === documentId
          ? {
              ...doc,
              status: "VERIFIED",
              confidence:
                doc.confidence === "Processing" ? "96%" : doc.confidence,
              extracted:
                doc.extracted === "Pending" ? "12 fields" : doc.extracted,
            }
          : doc,
      ),
    );

    addAuditLog("Document Verified", "Documents");

    showToast("Document verified and added to record");
  };

  // -----------------------------
  // COMPLETE CORRECTIVE ACTION
  // -----------------------------

  const completeCorrectiveAction = (actionId) => {
    setCorrectiveActions((prev) =>
      prev.map((action) =>
        action.id === actionId
          ? {
              ...action,
              status: "COMPLETED",
            }
          : action,
      ),
    );

    addAuditLog("Corrective Action Completed", "Corrective Actions");

    showToast("Corrective action marked as completed");
  };

  // -----------------------------
  // USER SWITCH
  // -----------------------------

  const switchUser = (user) => {
    setCurrentUser(user);
    setRole(user.role);

    addAuditLog("User Switched", "System");

    showToast(`Switched to ${user.name}`);
  };

  if (!isLoggedIn) {
    return (
      <LoginPage
        employeeId={employeeId}
        setEmployeeId={setEmployeeId}
        password={password}
        setPassword={setPassword}
        role={role}
        setRole={setRole}
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <>
      <Dashboard
        activePage={activePage}
        setActivePage={setActivePage}
        role={role}
        currentUser={currentUser}
        switchUser={switchUser}
        documents={documents}
        setDocuments={setDocuments}
        handleDocumentUpload={handleDocumentUpload}
        verifyDocument={verifyDocument}
        inspections={inspections}
        setInspections={setInspections}
        correctiveActions={correctiveActions}
        setCorrectiveActions={setCorrectiveActions}
        completeCorrectiveAction={completeCorrectiveAction}
        auditLogs={auditLogs}
        addAuditLog={addAuditLog}
        showToast={showToast}
      />

      {toast && (
        <div className={`app-toast ${toast.type}`}>{toast.message}</div>
      )}
    </>
  );
}

/* ================================================= */
/* LOGIN PAGE */
/* ================================================= */

function LoginPage({
  employeeId,
  setEmployeeId,
  password,
  setPassword,
  role,
  setRole,
  handleLogin,
}) {
  return (
    <div className="login-page">
      <div className="login-left">
        <div className="brand">
          <div className="brand-icon">C</div>

          <div>
            <h1>COALGUARD</h1>
            <span>AI</span>
          </div>
        </div>

        <div className="hero-content">
          <div className="status-pill">
            <span className="status-dot"></span>
            MINE GOVERNANCE PLATFORM
          </div>

          <h2>
            Intelligent Compliance.
            <br />
            <span>Safer Mining.</span>
          </h2>

          <p>
            AI-powered governance and compliance intelligence for modern mining
            operations.
          </p>

          <div className="feature-list">
            <div className="feature">
              <div className="feature-icon">✦</div>
              <div>
                <strong>AI Risk Intelligence</strong>
                <small>Identify high-risk zones before incidents occur</small>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">⌖</div>
              <div>
                <strong>Geo-Tagged Inspections</strong>
                <small>Capture field observations with verified location</small>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">✓</div>
              <div>
                <strong>Automated Compliance</strong>
                <small>Track violations, actions and escalations</small>
              </div>
            </div>
          </div>
        </div>

        <div className="left-footer">
          <span>SECURE</span>
          <span>•</span>
          <span>AUDITABLE</span>
          <span>•</span>
          <span>AI-POWERED</span>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-heading">
            <div className="welcome-icon">→</div>

            <h2>Welcome back</h2>

            <p>Sign in to access your mine command center</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Employee ID</label>

              <div className="input-wrapper">
                <span className="input-icon">ID</span>

                <input
                  type="text"
                  placeholder="Enter employee ID"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>

              <div className="input-wrapper">
                <span className="input-icon">••</span>

                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Access Role</label>

              <div className="input-wrapper">
                <span className="input-icon">◉</span>

                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option>Mine Manager</option>
                  <option>Field Inspector</option>
                  <option>Corporate Officer</option>
                  <option>Regulatory Officer</option>
                </select>
              </div>
            </div>

            <div className="login-options">
              <label className="remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot"
                onClick={() =>
                  alert("Contact your administrator to reset your password.")
                }
              >
                Forgot password?
              </button>
            </div>

            <button className="login-button" type="submit">
              <span>Sign in to Command Center</span>
              <span className="arrow">→</span>
            </button>
          </form>

          <div className="security-note">
            <div className="lock">◆</div>

            <div>
              <strong>Secure access</strong>

              <p>
                All activity is monitored and recorded in the compliance audit
                trail.
              </p>
            </div>
          </div>
        </div>

        <div className="copyright">
          COALGUARD AI · MINE GOVERNANCE & COMPLIANCE
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* DASHBOARD */
/* ================================================= */

function Dashboard({
  activePage,
  setActivePage,
  role,
  currentUser,
  switchUser,
  documents,
  handleDocumentUpload,
  verifyDocument,
  inspections,
  setInspections,
  correctiveActions,
  setCorrectiveActions,
  completeCorrectiveAction,
  auditLogs,
  addAuditLog,
  showToast,
}) {
  const userName =
  typeof currentUser === "object"
    ? currentUser?.name || "Rajiv Kumar"
    : currentUser || "Rajiv Kumar";

const userInitials =
  typeof currentUser === "object"
    ? currentUser?.initials || "RK"
    : String(currentUser || "RK")
        .split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
  /* ================================================= */
  /* DASHBOARD STATE */
  /* ================================================= */

  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const menuItems = [
    { name: "Command Center", icon: "▣" },
    { name: "Risk Intelligence", icon: "◈" },
    { name: "Compliance", icon: "✓" },
    { name: "Inspections", icon: "⌖" },
    { name: "Corrective Actions", icon: "↗" },
    { name: "Mine Map", icon: "⌁" },
    { name: "Documents", icon: "▤" },
    { name: "Audit Trail", icon: "◷" },
  ];

  return (
    <div className="dashboard">
      {/* SIDEBAR */}

      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">C</div>

          <div>
            <h1>COALGUARD</h1>
            <span>AI</span>
          </div>
        </div>

        <div className="mine-selector">
          <span className="mine-label">ACTIVE MINE</span>

          <strong>Gevra Open Cast Mine</strong>

          <small>● Operational</small>
        </div>

        <div className="sidebar-section-title">OPERATIONS</div>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${activePage === item.name ? "active" : ""}`}
              onClick={() => setActivePage(item.name)}
            >
              <span className="nav-icon">{item.icon}</span>

              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="system-status">
            <span className="status-dot"></span>

            <div>
              <strong>Systems Operational</strong>
              <small>All services online</small>
            </div>
          </div>

          <button
            className="logout-button"
            onClick={() => window.location.reload()}
          >
            ↪ Sign out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <div className="breadcrumb">
              COALGUARD AI / {activePage.toUpperCase()}
            </div>

            <h1>{activePage}</h1>

            <p>Gevra Open Cast Mine · Chhattisgarh</p>
          </div>

          <div className="header-right">

  {/* LIVE STATUS */}
  <div className="sync-status">
    <span className="status-dot"></span>
    Live system
  </div>

  {/* NOTIFICATIONS */}
  <div className="notification-wrap">

    <button
      className="notification-button"
      onClick={() => showToast("3 pending alerts require attention")}
      title="Notifications"
    >
      🔔
      <span>3</span>
    </button>

  </div>

  {/* USER PROFILE */}
  <div className="user-menu-wrap">

    <button
      className="user-profile-button"
      onClick={() => setShowUserMenu(!showUserMenu)}
    >

      <div className="avatar">
  {userInitials}
</div>

      <div className="user-profile-info">
        <strong>{userName}</strong>
        <small>{role}</small>
      </div>

      <span className="user-chevron">
        {showUserMenu ? "▲" : "▼"}
      </span>

    </button>


    {/* USER DROPDOWN */}
    {showUserMenu && (
      <div className="user-dropdown">

        <div className="dropdown-heading">
          <span>SWITCH USER</span>
        </div>


        <button
          className={`user-option ${
            userName === "Rajiv Kumar"? "active" : ""
          }`}
          onClick={() => {
            switchUser("Rajiv Kumar", "Mine Manager");
            setShowUserMenu(false);
          }}
        >
          <div className="dropdown-avatar">RK</div>

          <div>
            <strong>Rajiv Kumar</strong>
            <span>Mine Manager</span>
          </div>

          {userName === "Rajiv Kumar" && (
            <span className="selected-user">✓</span>
          )}
        </button>


        <button
          className={`user-option ${
            userName === "Amit Verma"? "active" : ""
          }`}
          onClick={() => {
            switchUser("Amit Verma", "Safety Officer");
            setShowUserMenu(false);
          }}
        >
          <div className="dropdown-avatar">AV</div>

          <div>
            <strong>Amit Verma</strong>
            <span>Safety Officer</span>
          </div>

          {userName === "Amit Verma" && (
            <span className="selected-user">✓</span>
          )}
        </button>


        <button
          className={`user-option ${
            userName === "Neha Singh"? "active" : ""
          }`}
          onClick={() => {
            switchUser("Neha Singh", "Environment Officer");
            setShowUserMenu(false);
          }}
        >
          <div className="dropdown-avatar">NS</div>

          <div>
            <strong>Neha Singh</strong>
            <span>Environment Officer</span>
          </div>

          {userName === "Neha Singh"&& (
            <span className="selected-user">✓</span>
          )}
        </button>


        <button
          className={`user-option ${
            userName === "Rakesh Sharma" ? "active" : ""
          }`}
          onClick={() => {
            switchUser("Rakesh Sharma", "Labour Officer");
            setShowUserMenu(false);
          }}
        >
          <div className="dropdown-avatar">RS</div>

          <div>
            <strong>Rakesh Sharma</strong>
            <span>Labour Officer</span>
          </div>

          {userName === "Rakesh Sharma" && (
            <span className="selected-user">✓</span>
          )}
        </button>

      </div>
    )}

  </div>

</div>
        </header>

        {activePage === "Command Center" ? (
          <CommandCenter setActivePage={setActivePage} />
        ) : activePage === "Risk Intelligence" ? (
          <RiskIntelligence setActivePage={setActivePage} />
        ) : activePage === "Inspections" ? (
          <Inspections
            inspections={inspections}
            setInspections={setInspections}
            currentUser={currentUser}
            addAuditLog={addAuditLog}
            showToast={showToast}
          />
        ) : activePage === "Compliance" ? (
          <Compliance setActivePage={setActivePage} />
        ) : activePage === "Corrective Actions" ? (
          <CorrectiveActions
            correctiveActions={correctiveActions}
            setCorrectiveActions={setCorrectiveActions}
            completeCorrectiveAction={completeCorrectiveAction}
            addAuditLog={addAuditLog}
            showToast={showToast}
          />
        ) : activePage === "Mine Map" ? (
          <MineMap />
        ) : activePage === "Documents" ? (
          <Documents
            documents={documents}
            handleDocumentUpload={handleDocumentUpload}
            verifyDocument={verifyDocument}
            showToast={showToast}
          />
        ) : activePage === "Audit Trail" ? (
          <AuditTrail auditLogs={auditLogs} addAuditLog={addAuditLog} />
        ) : (
          <PlaceholderPage page={activePage} />
        )}
      </main>
    </div>
  );
}

/* ================================================= */
/* COMMAND CENTER */
/* ================================================= */

function CommandCenter({ setActivePage }) {
  return (
    <div className="command-center">
      {/* KPI CARDS */}

      <section className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <span>COMPLIANCE SCORE</span>
            <div className="kpi-icon blue">✓</div>
          </div>

          <div className="kpi-value">
            92<span>%</span>
          </div>

          <div className="kpi-change positive">
            ↑ 4.2% <span>vs last month</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span>CRITICAL RISKS</span>
            <div className="kpi-icon red">!</div>
          </div>

          <div className="kpi-value">07</div>

          <div className="kpi-change negative">
            ↑ 2 <span>since yesterday</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span>OPEN ACTIONS</span>
            <div className="kpi-icon orange">↗</div>
          </div>

          <div className="kpi-value">24</div>

          <div className="kpi-change warning">
            11 <span>due this week</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span>INSPECTIONS</span>
            <div className="kpi-icon green">⌖</div>
          </div>

          <div className="kpi-value">148</div>

          <div className="kpi-change positive">
            ↑ 18% <span>this month</span>
          </div>
        </div>
      </section>

      {/* SECOND ROW */}

      <section className="dashboard-grid">
        {/* RISK CHART */}

        <div className="panel risk-panel">
          <div className="panel-header">
            <div>
              <h2>AI Risk Trend</h2>
              <p>Mine-wide risk score · Last 7 days</p>
            </div>

            <button
              className="view-button"
              onClick={() => setActivePage("Risk Intelligence")}
            >
              View intelligence →
            </button>
          </div>

          <div className="risk-summary">
            <div>
              <strong>78</strong>
              <span>/ 100</span>
            </div>

            <div className="risk-high">HIGH RISK</div>
          </div>

          <div className="chart">
            <div className="chart-y">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            <div className="chart-area">
              <div className="grid-line line-1"></div>
              <div className="grid-line line-2"></div>
              <div className="grid-line line-3"></div>
              <div className="grid-line line-4"></div>

              <svg viewBox="0 0 700 220" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="riskGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#347edb" stopOpacity="0.25" />

                    <stop offset="100%" stopColor="#347edb" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  d="M0 160
                     L100 145
                     L200 130
                     L300 142
                     L400 105
                     L500 115
                     L600 75
                     L700 55
                     L700 220
                     L0 220 Z"
                  fill="url(#riskGradient)"
                />

                <polyline
                  points="
                    0,160
                    100,145
                    200,130
                    300,142
                    400,105
                    500,115
                    600,75
                    700,55
                  "
                  fill="none"
                  stroke="#4c9aff"
                  strokeWidth="3"
                />
              </svg>

              <div className="chart-labels">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        </div>

        {/* ALERTS */}

        <div className="panel alerts-panel">
          <div className="panel-header">
            <div>
              <h2>Critical Alerts</h2>
              <p>Requires immediate attention</p>
            </div>

            <span className="alert-count">3</span>
          </div>

          <div className="alerts-list">
            <div className="alert-item critical">
              <div className="alert-symbol">!</div>

              <div className="alert-content">
                <strong>Ventilation inspection overdue</strong>

                <span>Pit 03 · Due today</span>
              </div>

              <span className="alert-arrow">→</span>
            </div>

            <div className="alert-item high">
              <div className="alert-symbol">!</div>

              <div className="alert-content">
                <strong>PPE compliance violation</strong>

                <span>Contractor · ABC Mining Services</span>
              </div>

              <span className="alert-arrow">→</span>
            </div>

            <div className="alert-item medium">
              <div className="alert-symbol">!</div>

              <div className="alert-content">
                <strong>Environmental document renewal</strong>

                <span>Due in 3 days</span>
              </div>

              <span className="alert-arrow">→</span>
            </div>
          </div>

          <button
            className="all-alerts"
            onClick={() => setActivePage("Corrective Actions")}
          >
            View all alerts →
          </button>
        </div>
      </section>

      {/* BOTTOM ROW */}

      <section className="dashboard-grid bottom-grid">
        <div className="panel activity-panel">
          <div className="panel-header">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest compliance events</p>
            </div>

            <button
              className="view-button"
              onClick={() => setActivePage("Audit Trail")}
            >
              Audit trail →
            </button>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot blue"></div>

              <div>
                <strong>Inspection submitted</strong>
                <span>Amit Sharma · Pit 03</span>
              </div>

              <time>10:42 AM</time>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot orange"></div>

              <div>
                <strong>AI risk assessment generated</strong>
                <span>Risk score: 87 / 100</span>
              </div>

              <time>10:43 AM</time>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot red"></div>

              <div>
                <strong>Corrective action created</strong>
                <span>Action ID: CA-2026-00842</span>
              </div>

              <time>10:44 AM</time>
            </div>
          </div>
        </div>

        <div className="panel readiness-panel">
          <div className="panel-header">
            <div>
              <h2>Compliance Readiness</h2>
              <p>Current mine status</p>
            </div>
          </div>

          <div className="readiness-score">
            <div className="score-circle">
              <strong>92</strong>
              <span>%</span>
            </div>

            <div>
              <strong>Good standing</strong>
              <p>46 of 50 compliance requirements are on track.</p>
            </div>
          </div>

          <div className="progress-row">
            <div>
              <span>Safety</span>
              <strong>96%</strong>
            </div>

            <div className="progress-bar">
              <div style={{ width: "96%" }}></div>
            </div>
          </div>

          <div className="progress-row">
            <div>
              <span>Environment</span>
              <strong>88%</strong>
            </div>

            <div className="progress-bar">
              <div style={{ width: "88%" }}></div>
            </div>
          </div>

          <div className="progress-row">
            <div>
              <span>Statutory</span>
              <strong>91%</strong>
            </div>

            <div className="progress-bar">
              <div style={{ width: "91%" }}></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
/* ================================================= */
/* RISK INTELLIGENCE */
/* ================================================= */

function RiskIntelligence({ setActivePage }) {
  const [selectedZone, setSelectedZone] = useState("PE-03");

  const zones = [
    {
      id: "PE-03",
      name: "Ventilation Zone",
      category: "Ventilation",
      score: 87,
      level: "CRITICAL",
      reasons: [
        "Ventilation inspection overdue",
        "3 previous violations recorded",
        "Gas sensor anomaly detected",
        "Corrective action pending",
      ],
    },
    {
      id: "PE-07",
      name: "PPE Compliance Zone",
      category: "PPE",
      score: 74,
      level: "HIGH",
      reasons: [
        "Repeated PPE violations",
        "Contractor compliance below threshold",
        "Recent observation requires review",
      ],
    },
    {
      id: "PE-02",
      name: "Environment Zone",
      category: "Environment",
      score: 61,
      level: "MEDIUM",
      reasons: [
        "Environmental document nearing renewal",
        "Dust level above normal range",
        "Follow-up inspection recommended",
      ],
    },
  ];

  const selected = zones.find((zone) => zone.id === selectedZone);

  return (
    <div className="command-center">
      {/* KPI CARDS */}

      <section className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top">
            <span>HIGH RISK</span>
            <div className="kpi-icon red">!</div>
          </div>

          <div className="kpi-value">07</div>

          <div className="kpi-change negative">Requires attention</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span>MEDIUM RISK</span>
            <div className="kpi-icon orange">!</div>
          </div>

          <div className="kpi-value">14</div>

          <div className="kpi-change warning">Needs monitoring</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span>LOW RISK</span>
            <div className="kpi-icon green">✓</div>
          </div>

          <div className="kpi-value">28</div>

          <div className="kpi-change positive">Within threshold</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span>TOTAL RISKS</span>
            <div className="kpi-icon blue">◈</div>
          </div>

          <div className="kpi-value">49</div>

          <div className="kpi-change positive">Mine-wide observations</div>
        </div>
      </section>

      {/* TOP ROW */}

      <section className="dashboard-grid">
        {/* AI TREND */}

        <div className="panel risk-panel">
          <div className="panel-header">
            <div>
              <h2>AI Risk Trend</h2>

              <p>Mine-wide predicted risk score · Last 7 days</p>
            </div>

            <span className="alert-count">78</span>
          </div>

          <div className="risk-summary">
            <div>
              <strong>78</strong>
              <span>/ 100</span>
            </div>

            <div className="risk-high">HIGH RISK</div>
          </div>

          <div className="chart">
            <div className="chart-y">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            <div className="chart-area">
              <div className="grid-line line-1"></div>
              <div className="grid-line line-2"></div>
              <div className="grid-line line-3"></div>
              <div className="grid-line line-4"></div>

              <svg viewBox="0 0 700 220" preserveAspectRatio="none">
                <polyline
                  points="
                    0,160
                    100,145
                    200,130
                    300,142
                    400,105
                    500,115
                    600,75
                    700,55
                  "
                  fill="none"
                  stroke="#4c9aff"
                  strokeWidth="3"
                />
              </svg>

              <div className="chart-labels">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        </div>

        {/* RISK DISTRIBUTION */}

        <div className="panel alerts-panel">
          <div className="panel-header">
            <div>
              <h2>Risk Distribution</h2>

              <p>Current mine-wide risk profile</p>
            </div>
          </div>

          <div className="alerts-list">
            <div className="alert-item critical">
              <div className="alert-symbol">!</div>

              <div className="alert-content">
                <strong>07 High Risk</strong>
                <span>Requires immediate attention</span>
              </div>
            </div>

            <div className="alert-item high">
              <div className="alert-symbol">!</div>

              <div className="alert-content">
                <strong>14 Medium Risk</strong>
                <span>Needs monitoring</span>
              </div>
            </div>

            <div className="alert-item medium">
              <div className="alert-symbol">✓</div>

              <div className="alert-content">
                <strong>28 Low Risk</strong>
                <span>Within acceptable threshold</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGH RISK ZONES */}

      <section className="dashboard-grid bottom-grid">
        <div className="panel activity-panel">
          <div className="panel-header">
            <div>
              <h2>High-Risk Zones</h2>

              <p>AI-identified areas requiring intervention</p>
            </div>
          </div>

          <div className="timeline">
            {zones.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone.id)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  border: "none",
                  background:
                    selectedZone === zone.id ? "#f1f5f9" : "transparent",
                  padding: "14px",
                  marginBottom: "8px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                <strong>
                  {zone.id} · {zone.name}
                </strong>

                <span
                  style={{
                    display: "block",
                    marginTop: "5px",
                  }}
                >
                  {zone.category} · Risk Score:{" "}
                  <strong>{zone.score}/100</strong>
                  {" · "}
                  {zone.level}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* AI ASSESSMENT */}

        <div className="panel readiness-panel">
          <div className="panel-header">
            <div>
              <h2>AI Risk Assessment</h2>

              <p>
                {selected.id} · {selected.name}
              </p>
            </div>
          </div>

          <div className="readiness-score">
            <div className="score-circle">
              <strong>{selected.score}</strong>

              <span>/100</span>
            </div>

            <div>
              <strong>{selected.level}</strong>

              <p>AI-generated risk assessment</p>
            </div>
          </div>

          <h3>WHY IS THIS RISK HIGH?</h3>

          <div className="alerts-list">
            {selected.reasons.map((reason, index) => (
              <div className="alert-item critical" key={index}>
                <div className="alert-symbol">!</div>

                <div className="alert-content">
                  <span>{reason}</span>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "18px",
              padding: "14px",
              background: "#f1f5f9",
              borderRadius: "8px",
            }}
          >
            <strong>AI RECOMMENDATION</strong>

            <p>
              Schedule immediate inspection and escalate this risk to the Mine
              Manager.
            </p>
          </div>

          <button
            className="view-button"
            style={{
              marginTop: "15px",
              width: "100%",
            }}
            onClick={() => setActivePage("Inspections")}
          >
            CREATE INSPECTION →
          </button>
        </div>
      </section>
    </div>
  );
}

/* ================================================= */
/* PLACEHOLDER */
/* ================================================= */

/* ================================================= */
/* PLACEHOLDER */
/* ================================================= */
/* ================================================= */
/* ================================================= */
/* INSPECTIONS */
/* ================================================= */

function Inspections() {
  const [showForm, setShowForm] = useState(false);

  const inspections = [
    {
      id: "INS-2026-0148",
      zone: "PE-03",
      type: "Ventilation",
      inspector: "Rajiv Kumar",
      date: "27 Sep 2026",
      risk: "CRITICAL",
      status: "OVERDUE",
    },
    {
      id: "INS-2026-0147",
      zone: "PE-07",
      type: "PPE Compliance",
      inspector: "Amit Verma",
      date: "27 Sep 2026",
      risk: "HIGH",
      status: "OPEN",
    },
    {
      id: "INS-2026-0146",
      zone: "PE-02",
      type: "Environment",
      inspector: "Neha Singh",
      date: "26 Sep 2026",
      risk: "MEDIUM",
      status: "IN REVIEW",
    },
    {
      id: "INS-2026-0145",
      zone: "PE-05",
      type: "Worker Safety",
      inspector: "Rakesh Sharma",
      date: "26 Sep 2026",
      risk: "LOW",
      status: "COMPLETED",
    },
  ];

  return (
    <div className="inspections-page">
      {/* HEADER */}

      <div className="page-title-row">
        <div>
          <div className="breadcrumb">COALGUARD AI / INSPECTIONS</div>

          <h1>Field Inspections</h1>

          <p>Geo-tagged and time-stamped mine inspection monitoring</p>
        </div>

        <button className="primary-button" onClick={() => setShowForm(true)}>
          + NEW INSPECTION
        </button>
      </div>

      {/* SUMMARY CARDS */}

      <div className="inspection-stats">
        <div className="inspection-stat">
          <span>TOTAL INSPECTIONS</span>
          <strong>148</strong>
          <small>Current reporting period</small>
        </div>

        <div className="inspection-stat">
          <span>OPEN</span>
          <strong>24</strong>
          <small>Require follow-up</small>
        </div>

        <div className="inspection-stat critical-stat">
          <span>HIGH RISK</span>
          <strong>07</strong>
          <small>Immediate attention</small>
        </div>

        <div className="inspection-stat">
          <span>COMPLETED</span>
          <strong>117</strong>
          <small>This reporting period</small>
        </div>
      </div>

      {/* INSPECTION TABLE */}

      <div className="panel inspection-table-panel">
        <div className="panel-header">
          <div>
            <h2>Recent Inspections</h2>

            <p>Field observations and inspection status</p>
          </div>

          <div className="table-tools">
            <input
              className="search-input"
              placeholder="Search inspections..."
            />

            <select className="filter-select">
              <option>All Status</option>
              <option>Open</option>
              <option>In Review</option>
              <option>Completed</option>
              <option>Overdue</option>
            </select>
          </div>
        </div>

        <div className="inspection-table">
          <div className="table-row table-heading">
            <span>INSPECTION ID</span>
            <span>ZONE</span>
            <span>TYPE</span>
            <span>INSPECTOR</span>
            <span>DATE</span>
            <span>RISK</span>
            <span>STATUS</span>
          </div>

          {inspections.map((inspection) => (
            <div className="table-row" key={inspection.id}>
              <span className="inspection-id">{inspection.id}</span>

              <span>{inspection.zone}</span>

              <span>{inspection.type}</span>

              <span>{inspection.inspector}</span>

              <span>{inspection.date}</span>

              <span>
                <b className={`risk-badge ${inspection.risk.toLowerCase()}`}>
                  {inspection.risk}
                </b>
              </span>

              <span>
                <b
                  className={`status-badge ${inspection.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {inspection.status}
                </b>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FIELD MONITORING */}

      <div className="monitoring-grid">
        <div className="panel monitoring-card">
          <div className="monitoring-icon">◉</div>

          <div>
            <h3>Geo-Tagged Reporting</h3>

            <p>
              Every field inspection records the mine zone and inspection
              location.
            </p>
          </div>

          <span className="monitoring-status">ACTIVE</span>
        </div>

        <div className="panel monitoring-card">
          <div className="monitoring-icon">◷</div>

          <div>
            <h3>Time-Stamped Evidence</h3>

            <p>
              Inspection observations are recorded with date and time for
              auditability.
            </p>
          </div>

          <span className="monitoring-status">ACTIVE</span>
        </div>
      </div>

      {/* NEW INSPECTION FORM */}

      {showForm && (
        <div className="modal-overlay">
          <div className="inspection-modal">
            <div className="modal-header">
              <div>
                <span className="breadcrumb">FIELD INSPECTION</span>

                <h2>New Inspection</h2>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label>Mine Zone</label>

                <select>
                  <option>PE-03 · Ventilation Zone</option>
                  <option>PE-07 · PPE Compliance Zone</option>
                  <option>PE-02 · Environment Zone</option>
                  <option>PE-05 · Worker Safety Zone</option>
                </select>
              </div>

              <div className="form-field">
                <label>Inspection Type</label>

                <select>
                  <option>Safety Inspection</option>
                  <option>Ventilation</option>
                  <option>PPE Compliance</option>
                  <option>Environment</option>
                  <option>Labour Compliance</option>
                </select>
              </div>

              <div className="form-field">
                <label>Risk Level</label>

                <select>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div className="form-field">
                <label>Inspection Date</label>

                <input type="date" defaultValue="2026-09-27" />
              </div>

              <div className="form-field full-width">
                <label>Observation</label>

                <textarea
                  placeholder="Describe the field observation..."
                  rows="4"
                />
              </div>

              <div className="form-field">
                <label>Geo-Tagged Location</label>

                <div className="location-field">
                  📍 PE-03 · Gevra Open Cast Mine
                </div>
              </div>

              <div className="form-field">
                <label>Evidence</label>

                <div className="upload-field">📎 Upload inspection photo</div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="secondary-button"
                onClick={() => setShowForm(false)}
              >
                CANCEL
              </button>

              <button
                className="primary-button"
                onClick={() => {
                  setShowForm(false);
                  alert("Inspection submitted successfully.");
                }}
              >
                SUBMIT INSPECTION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================= */
/* COMPLIANCE */
/* ================================================= */

function Compliance() {
  const requirements = [
    {
      id: "CMP-001",
      requirement: "Ventilation Inspection",
      category: "Safety",
      due: "27 Sep 2026",
      owner: "Rajiv Kumar",
      status: "OVERDUE",
    },
    {
      id: "CMP-002",
      requirement: "PPE Verification",
      category: "Safety",
      due: "27 Sep 2026",
      owner: "Amit Verma",
      status: "DUE",
    },
    {
      id: "CMP-003",
      requirement: "Environmental Report",
      category: "Environment",
      due: "30 Sep 2026",
      owner: "Neha Singh",
      status: "ON TRACK",
    },
    {
      id: "CMP-004",
      requirement: "Worker Attendance",
      category: "Labour",
      due: "Daily",
      owner: "HR Team",
      status: "COMPLIANT",
    },
    {
      id: "CMP-005",
      requirement: "Production Report",
      category: "Production",
      due: "30 Sep 2026",
      owner: "Mine Control",
      status: "ON TRACK",
    },
  ];

  return (
    <div className="compliance-page">
      {/* PAGE HEADER */}
      <div className="compliance-header">
        <div>
          <div className="breadcrumb">COALGUARD AI / COMPLIANCE</div>

          <h1>Compliance</h1>

          <p>
            Statutory compliance monitoring and automated governance tracking
          </p>
        </div>

        <button className="primary-button">+ ADD REQUIREMENT</button>
      </div>

      {/* COMPLIANCE SCORE CARDS */}
      <div className="compliance-stats">
        <div className="compliance-stat overall">
          <span>OVERALL COMPLIANCE</span>
          <strong>92%</strong>
          <small>Mine-wide compliance score</small>
        </div>

        <div className="compliance-stat">
          <span>SAFETY</span>
          <strong>96%</strong>
          <small>Safety requirements</small>
        </div>

        <div className="compliance-stat">
          <span>ENVIRONMENT</span>
          <strong>88%</strong>
          <small>Environmental requirements</small>
        </div>

        <div className="compliance-stat">
          <span>LABOUR</span>
          <strong>94%</strong>
          <small>Labour requirements</small>
        </div>

        <div className="compliance-stat">
          <span>PRODUCTION</span>
          <strong>91%</strong>
          <small>Production requirements</small>
        </div>

        <div className="compliance-stat warning">
          <span>OVERDUE</span>
          <strong>03</strong>
          <small>Require immediate action</small>
        </div>

        <div className="compliance-stat attention">
          <span>DUE SOON</span>
          <strong>05</strong>
          <small>Due within 7 days</small>
        </div>
      </div>

      {/* COMPLIANCE TABLE */}
      <div className="compliance-panel">
        <div className="compliance-panel-header">
          <div>
            <h2>Statutory Compliance Requirements</h2>
            <p>Track safety, environment, labour and production obligations</p>
          </div>

          <div className="compliance-tools">
            <input
              className="search-input"
              placeholder="Search requirements..."
            />

            <select className="filter-select">
              <option>All Status</option>
              <option>Overdue</option>
              <option>Due</option>
              <option>On Track</option>
              <option>Compliant</option>
            </select>
          </div>
        </div>

        {/* TABLE HEADER */}
        <div className="compliance-row compliance-heading">
          <span>ID</span>
          <span>REQUIREMENT</span>
          <span>CATEGORY</span>
          <span>DUE DATE</span>
          <span>OWNER</span>
          <span>STATUS</span>
        </div>

        {/* TABLE ROWS */}
        {requirements.map((item) => (
          <div className="compliance-row" key={item.id}>
            <span className="compliance-id">{item.id}</span>

            <span className="compliance-requirement">{item.requirement}</span>

            <span>{item.category}</span>

            <span>{item.due}</span>

            <span>{item.owner}</span>

            <span>
              <span
                className={`compliance-status ${
                  item.status === "OVERDUE"
                    ? "overdue"
                    : item.status === "DUE"
                      ? "due"
                      : item.status === "COMPLIANT"
                        ? "compliant"
                        : "on-track"
                }`}
              >
                {item.status}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* BOTTOM SECTION */}
      <div className="compliance-bottom">
        {/* AI ALERT */}
        <div className="ai-compliance-alert">
          <div className="alert-icon">AI</div>

          <div className="alert-content">
            <div className="alert-label">AI COMPLIANCE ALERT</div>

            <h3>Ventilation inspection requires immediate attention</h3>

            <p>
              The ventilation requirement for PE-03 is overdue and is linked to
              a high-risk zone identified by the AI risk engine.
            </p>

            <div className="alert-recommendation">
              <strong>AI Recommendation:</strong>
              Schedule immediate inspection and escalate to Mine Manager.
            </div>
          </div>

          <button className="alert-action">VIEW RISK →</button>
        </div>

        {/* COMPLIANCE SUMMARY */}
        <div className="compliance-summary">
          <h3>Compliance Readiness</h3>

          <div className="readiness-item">
            <div>
              <span>Safety</span>
              <strong>96%</strong>
            </div>

            <div className="progress-bar">
              <div style={{ width: "96%" }}></div>
            </div>
          </div>

          <div className="readiness-item">
            <div>
              <span>Environment</span>
              <strong>88%</strong>
            </div>

            <div className="progress-bar">
              <div style={{ width: "88%" }}></div>
            </div>
          </div>

          <div className="readiness-item">
            <div>
              <span>Labour</span>
              <strong>94%</strong>
            </div>

            <div className="progress-bar">
              <div style={{ width: "94%" }}></div>
            </div>
          </div>

          <div className="readiness-item">
            <div>
              <span>Production</span>
              <strong>91%</strong>
            </div>

            <div className="progress-bar">
              <div style={{ width: "91%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* CORRECTIVE ACTIONS */
/* ================================================= */

function CorrectiveActions() {
  const actions = [
    {
      id: "CA-2026-00842",
      issue: "Ventilation inspection overdue",
      zone: "PE-03",
      risk: "CRITICAL",
      owner: "Rajiv Kumar",
      deadline: "27 Sep 2026",
      status: "OPEN",
    },
    {
      id: "CA-2026-00841",
      issue: "PPE compliance gap",
      zone: "PE-07",
      risk: "HIGH",
      owner: "Amit Verma",
      deadline: "28 Sep 2026",
      status: "IN PROGRESS",
    },
    {
      id: "CA-2026-00840",
      issue: "Dust monitoring report pending",
      zone: "PE-02",
      risk: "MEDIUM",
      owner: "Neha Singh",
      deadline: "30 Sep 2026",
      status: "OPEN",
    },
    {
      id: "CA-2026-00839",
      issue: "Worker safety observation",
      zone: "PE-05",
      risk: "LOW",
      owner: "Rakesh Sharma",
      deadline: "26 Sep 2026",
      status: "COMPLETED",
    },
  ];

  return (
    <div className="corrective-page">
      <div className="corrective-header">
        <div>
          <div className="breadcrumb">COALGUARD AI / CORRECTIVE ACTIONS</div>

          <h1>Corrective Actions</h1>

          <p>
            Track, assign and close actions raised from inspections and
            compliance observations
          </p>
        </div>

        <button className="primary-button">+ CREATE ACTION</button>
      </div>

      {/* STATS */}

      <div className="corrective-stats">
        <div className="corrective-stat">
          <span>OPEN ACTIONS</span>
          <strong>24</strong>
          <small>Require follow-up</small>
        </div>

        <div className="corrective-stat critical">
          <span>CRITICAL</span>
          <strong>07</strong>
          <small>Immediate attention</small>
        </div>

        <div className="corrective-stat high">
          <span>HIGH</span>
          <strong>09</strong>
          <small>High priority</small>
        </div>

        <div className="corrective-stat">
          <span>IN PROGRESS</span>
          <strong>13</strong>
          <small>Currently assigned</small>
        </div>

        <div className="corrective-stat completed">
          <span>COMPLETED</span>
          <strong>117</strong>
          <small>Successfully closed</small>
        </div>

        <div className="corrective-stat overdue">
          <span>OVERDUE</span>
          <strong>03</strong>
          <small>Escalation required</small>
        </div>
      </div>

      {/* MAIN TABLE */}

      <div className="corrective-panel">
        <div className="corrective-panel-header">
          <div>
            <h2>Corrective Action Register</h2>

            <p>Actions generated from inspections, risks and compliance gaps</p>
          </div>

          <div className="corrective-tools">
            <input className="search-input" placeholder="Search actions..." />

            <select className="filter-select">
              <option>All Status</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Overdue</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <div className="corrective-row corrective-heading">
          <span>ID</span>
          <span>ACTION / ISSUE</span>
          <span>ZONE</span>
          <span>RISK</span>
          <span>OWNER</span>
          <span>DEADLINE</span>
          <span>STATUS</span>
        </div>

        {actions.map((action) => (
          <div className="corrective-row" key={action.id}>
            <span className="corrective-id">{action.id}</span>

            <span className="corrective-issue">{action.issue}</span>

            <span>{action.zone}</span>

            <span>
              <span className={`risk-badge ${action.risk.toLowerCase()}`}>
                {action.risk}
              </span>
            </span>

            <span>{action.owner}</span>

            <span>{action.deadline}</span>

            <span>
              <span
                className={`action-status ${
                  action.status === "OPEN"
                    ? "open"
                    : action.status === "IN PROGRESS"
                      ? "progress"
                      : "completed"
                }`}
              >
                {action.status}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* LOWER SECTION */}

      <div className="corrective-bottom">
        <div className="action-detail-card">
          <div className="detail-top">
            <div>
              <div className="detail-label">SELECTED CRITICAL ACTION</div>

              <h2>CA-2026-00842</h2>
            </div>

            <span className="risk-badge critical">CRITICAL</span>
          </div>

          <div className="detail-grid">
            <div>
              <span>ISSUE</span>
              <strong>Ventilation inspection overdue</strong>
            </div>

            <div>
              <span>ZONE</span>
              <strong>PE-03</strong>
            </div>

            <div>
              <span>OWNER</span>
              <strong>Rajiv Kumar</strong>
            </div>

            <div>
              <span>DEADLINE</span>
              <strong>27 Sep 2026</strong>
            </div>
          </div>

          <div className="root-cause">
            <span>AI-IDENTIFIED ROOT CAUSE</span>

            <p>
              Ventilation inspection was not completed within the statutory
              interval. Previous violations and a gas sensor anomaly increased
              the risk score for PE-03.
            </p>
          </div>

          <div className="required-action">
            <span>REQUIRED ACTION</span>

            <p>
              Conduct immediate ventilation inspection, verify gas sensor
              readings and submit geo-tagged evidence.
            </p>
          </div>

          <div className="action-buttons">
            <button className="secondary-button">ASSIGN OWNER</button>

            <button className="secondary-button">UPLOAD EVIDENCE</button>

            <button className="primary-button">MARK COMPLETE</button>
          </div>
        </div>

        <div className="escalation-card">
          <div className="escalation-icon">AI</div>

          <div>
            <div className="alert-label">AI ESCALATION</div>

            <h3>Immediate action recommended</h3>

            <p>
              This corrective action is linked to the highest-risk zone
              currently detected by the AI risk engine.
            </p>

            <div className="escalation-line">
              Risk score <strong>87 / 100</strong>
            </div>

            <div className="escalation-line">
              Previous violations <strong>03</strong>
            </div>

            <div className="escalation-line">
              Sensor anomaly <strong>Detected</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
/* ================================================= */
/* MINE MAP */
/* ================================================= */

function MineMap() {
  const [selectedZone, setSelectedZone] = React.useState("PE-03");

  const zones = {
    "PE-01": {
      name: "North Pit",
      type: "Production",
      risk: 32,
      level: "LOW",
      status: "Operational",
    },
    "PE-02": {
      name: "Environment Zone",
      type: "Environment",
      risk: 61,
      level: "MEDIUM",
      status: "Monitoring",
    },
    "PE-03": {
      name: "Ventilation Zone",
      type: "Safety",
      risk: 87,
      level: "CRITICAL",
      status: "Immediate Attention",
    },
    "PE-05": {
      name: "Worker Safety Zone",
      type: "Labour",
      risk: 28,
      level: "LOW",
      status: "Operational",
    },
    "PE-07": {
      name: "PPE Compliance Zone",
      type: "Safety",
      risk: 74,
      level: "HIGH",
      status: "Inspection Due",
    },
  };

  const selected = zones[selectedZone];

  return (
    <div className="mine-map-page">
      <div className="mine-map-header">
        <div>
          <div className="breadcrumb">COALGUARD AI / MINE MAP</div>

          <h1>Mine Map</h1>

          <p>Geo-tagged mine monitoring and location-based risk intelligence</p>
        </div>

        <div className="map-status">
          <span className="live-dot"></span>
          LIVE MONITORING
        </div>
      </div>

      <div className="mine-map-layout">
        {/* MAP */}

        <div className="mine-map-card">
          <div className="map-toolbar">
            <div>
              <strong>Gevra Open Cast Mine</strong>
              <span>Chhattisgarh · Active Mine</span>
            </div>

            <div className="map-controls">
              <button className="map-control active">RISK HEATMAP</button>

              <button className="map-control">SATELLITE</button>
            </div>
          </div>

          <div className="mine-map-canvas">
            <div className="map-grid"></div>

            <div className="pit pit-one"></div>
            <div className="pit pit-two"></div>
            <div className="pit pit-three"></div>

            {/* ZONE MARKERS */}

            <button
              className={`zone-marker low zone-pe01 ${
                selectedZone === "PE-01" ? "selected" : ""
              }`}
              onClick={() => setSelectedZone("PE-01")}
            >
              <span>PE-01</span>
            </button>

            <button
              className={`zone-marker medium zone-pe02 ${
                selectedZone === "PE-02" ? "selected" : ""
              }`}
              onClick={() => setSelectedZone("PE-02")}
            >
              <span>PE-02</span>
            </button>

            <button
              className={`zone-marker critical zone-pe03 ${
                selectedZone === "PE-03" ? "selected" : ""
              }`}
              onClick={() => setSelectedZone("PE-03")}
            >
              <span>PE-03</span>
            </button>

            <button
              className={`zone-marker low zone-pe05 ${
                selectedZone === "PE-05" ? "selected" : ""
              }`}
              onClick={() => setSelectedZone("PE-05")}
            >
              <span>PE-05</span>
            </button>

            <button
              className={`zone-marker high zone-pe07 ${
                selectedZone === "PE-07" ? "selected" : ""
              }`}
              onClick={() => setSelectedZone("PE-07")}
            >
              <span>PE-07</span>
            </button>

            <div className="map-label label-west">WEST PIT</div>

            <div className="map-label label-east">EAST PIT</div>

            <div className="map-label label-control">CONTROL ROOM</div>

            {/* LEGEND */}

            <div className="map-legend">
              <div className="legend-title">RISK LEVEL</div>

              <div>
                <span className="legend-dot critical"></span>
                Critical
              </div>

              <div>
                <span className="legend-dot high"></span>
                High
              </div>

              <div>
                <span className="legend-dot medium"></span>
                Medium
              </div>

              <div>
                <span className="legend-dot low"></span>
                Low
              </div>
            </div>
          </div>
        </div>

        {/* DETAILS */}

        <div className="zone-detail-card">
          <div className="zone-detail-header">
            <div>
              <div className="detail-label">SELECTED ZONE</div>

              <h2>{selectedZone}</h2>

              <p>{selected.name}</p>
            </div>

            <span className={`map-risk-badge ${selected.level.toLowerCase()}`}>
              {selected.level}
            </span>
          </div>

          <div className="zone-risk-score">
            <span>AI RISK SCORE</span>

            <strong>
              {selected.risk}
              <small>/100</small>
            </strong>

            <div className="risk-meter">
              <div
                style={{
                  width: `${selected.risk}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="zone-details">
            <div>
              <span>ZONE TYPE</span>
              <strong>{selected.type}</strong>
            </div>

            <div>
              <span>STATUS</span>
              <strong>{selected.status}</strong>
            </div>
          </div>

          <div className="map-ai-insight">
            <div className="ai-mini-icon">AI</div>

            <div>
              <span>AI LOCATION INSIGHT</span>

              <p>
                {selectedZone === "PE-03"
                  ? "High-risk ventilation conditions detected. Gas sensor anomaly and overdue inspection require immediate attention."
                  : selectedZone === "PE-07"
                    ? "PPE compliance risk is elevated based on recent inspection observations."
                    : selectedZone === "PE-02"
                      ? "Environmental monitoring requires continued observation."
                      : "Zone currently shows normal operating conditions."}
              </p>
            </div>
          </div>

          <div className="zone-actions">
            <button className="secondary-button">VIEW INSPECTIONS</button>

            <button className="primary-button">CREATE INSPECTION</button>
          </div>
        </div>
      </div>

      {/* BOTTOM STATS */}

      <div className="map-bottom-stats">
        <div className="map-stat">
          <span>MONITORED ZONES</span>
          <strong>05</strong>
        </div>

        <div className="map-stat critical-stat">
          <span>CRITICAL ZONES</span>
          <strong>01</strong>
        </div>

        <div className="map-stat">
          <span>ACTIVE INSPECTIONS</span>
          <strong>07</strong>
        </div>

        <div className="map-stat">
          <span>GEO-TAGGED REPORTS</span>
          <strong>148</strong>
        </div>
      </div>
    </div>
  );
}
/* ================================================= */
/* DOCUMENTS */
/* ================================================= */
function Documents({
  documents,
  handleDocumentUpload,
  verifyDocument,
  showToast,
}) {
  const [selectedDoc, setSelectedDoc] = React.useState(
    documents?.[0]?.id || null,
  );

  const fileInputRef = React.useRef(null);

  const selected =
    documents?.find((doc) => doc.id === selectedDoc) || documents?.[0] || null;

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    handleDocumentUpload(file);

    if (showToast) {
      showToast(`${file.name} uploaded successfully`, "success");
    }

    e.target.value = "";
  };

  const handleViewDocument = () => {
    if (!selected) {
      if (showToast) {
        showToast("Please select a document first", "error");
      }
      return;
    }

    if (selected.fileUrl) {
      window.open(selected.fileUrl, "_blank");
    } else {
      if (showToast) {
        showToast("This demo document has no uploaded file preview.", "error");
      }
    }
  };

  const handleVerifyDocument = () => {
    if (!selected) {
      if (showToast) {
        showToast("Please select a document first", "error");
      }
      return;
    }

    verifyDocument(selected.id);
  };

  return (
    <div className="documents-page">
      {/* HEADER */}

      <div className="documents-header">
        <div>
          <div className="breadcrumb">COALGUARD AI / DOCUMENTS</div>

          <h1>Documents</h1>

          <p>
            AI-powered document digitization and compliance evidence management
          </p>
        </div>

        <button className="upload-document-btn" onClick={handleUploadClick}>
          + UPLOAD DOCUMENT
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {/* KPI CARDS */}

      <div className="document-stats">
        <div className="document-stat">
          <span>TOTAL DOCUMENTS</span>
          <strong>1,284</strong>
          <small>All compliance records</small>
        </div>

        <div className="document-stat">
          <span>PROCESSED BY AI</span>
          <strong>1,247</strong>
          <small>97.1% processed</small>
        </div>

        <div className="document-stat">
          <span>PENDING REVIEW</span>
          <strong className="warning-number">18</strong>
          <small>Requires verification</small>
        </div>

        <div className="document-stat">
          <span>AI EXTRACTION ACCURACY</span>
          <strong className="success-number">96.8%</strong>
          <small>Across all documents</small>
        </div>
      </div>

      {/* MAIN CONTENT */}

      <div className="documents-layout">
        {/* DOCUMENT LIST */}

        <div className="documents-list-card">
          <div className="documents-list-header">
            <div>
              <h2>Compliance Documents</h2>

              <p>Recently uploaded and processed records</p>
            </div>

            <div className="document-search">🔍 Search</div>
          </div>

          <div className="document-table">
            <div className="document-table-head">
              <span>DOCUMENT</span>
              <span>TYPE</span>
              <span>UPLOADED BY</span>
              <span>DATE</span>
              <span>STATUS</span>
            </div>

            {documents?.length > 0 ? (
              documents.map((doc) => (
                <button
                  key={doc.id}
                  className={`document-row ${
                    selectedDoc === doc.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedDoc(doc.id)}
                >
                  <div className="document-name">
                    <div className="document-icon">DOC</div>

                    <div>
                      <strong>{doc.name}</strong>
                      <span>{doc.id}</span>
                    </div>
                  </div>

                  <span>{doc.type}</span>

                  <span>{doc.uploadedBy}</span>

                  <span>{doc.date}</span>

                  <span>
                    <b
                      className={`document-status ${
                        doc.status === "VERIFIED"
                          ? "verified"
                          : doc.status === "UNDER REVIEW"
                            ? "review"
                            : "processed"
                      }`}
                    >
                      {doc.status}
                    </b>
                  </span>
                </button>
              ))
            ) : (
              <div
                style={{
                  padding: "40px",
                  textAlign: "center",
                  color: "#94a3b8",
                }}
              >
                No documents available.
              </div>
            )}
          </div>
        </div>

        {/* DOCUMENT DETAILS */}

        <div className="document-detail-card">
          {selected ? (
            <>
              <div className="document-detail-top">
                <div className="document-preview-icon">DOC</div>

                <div>
                  <span>SELECTED DOCUMENT</span>

                  <h2>{selected.name}</h2>

                  <p>{selected.id}</p>
                </div>
              </div>

              {/* AI PROCESSING */}

              <div className="ai-processing-card">
                <div className="ai-processing-header">
                  <div className="ai-mini-icon">AI</div>

                  <div>
                    <strong>AI Document Processing</strong>

                    <span>OCR + compliance field extraction</span>
                  </div>

                  <b>{selected.confidence || "Processing..."}</b>
                </div>

                <div className="processing-bar">
                  <div
                    style={{
                      width:
                        selected.confidence && selected.confidence.includes("%")
                          ? selected.confidence
                          : "60%",
                    }}
                  ></div>
                </div>

                <p>
                  Document scanned successfully. AI extracted{" "}
                  <strong>{selected.extracted || "pending fields"}</strong>{" "}
                  compliance fields from the uploaded report.
                </p>
              </div>

              {/* DOCUMENT INFORMATION */}

              <div className="document-info">
                <div>
                  <span>DOCUMENT TYPE</span>

                  <strong>{selected.type}</strong>
                </div>

                <div>
                  <span>UPLOADED BY</span>

                  <strong>{selected.uploadedBy}</strong>
                </div>

                <div>
                  <span>UPLOAD DATE</span>

                  <strong>{selected.date}</strong>
                </div>

                <div>
                  <span>PROCESSING STATUS</span>

                  <strong>{selected.status}</strong>
                </div>
              </div>

              {/* EXTRACTED DATA */}

              <div className="extracted-fields">
                <div className="section-title">EXTRACTED COMPLIANCE DATA</div>

                <div className="extracted-grid">
                  <div>
                    <span>ZONE</span>

                    <strong>{selected.zone || "PE-03"}</strong>
                  </div>

                  <div>
                    <span>RISK LEVEL</span>

                    <strong className="critical-text">
                      {selected.risk || "CRITICAL"}
                    </strong>
                  </div>

                  <div>
                    <span>INSPECTION DATE</span>

                    <strong>{selected.inspectionDate || selected.date}</strong>
                  </div>

                  <div>
                    <span>OBSERVATIONS</span>

                    <strong>{selected.observations || "03 Findings"}</strong>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}

              <div className="document-actions">
                <button
                  className="secondary-button"
                  onClick={handleViewDocument}
                >
                  VIEW DOCUMENT
                </button>

                <button
                  className="primary-button"
                  onClick={handleVerifyDocument}
                  disabled={selected.status === "VERIFIED"}
                >
                  {selected.status === "VERIFIED"
                    ? "VERIFIED"
                    : "VERIFY & ADD TO RECORD"}
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                padding: "60px 30px",
                textAlign: "center",
                color: "#94a3b8",
              }}
            >
              <div
                style={{
                  fontSize: "40px",
                  marginBottom: "15px",
                }}
              >
                DOC
              </div>

              <h2>No Document Selected</h2>

              <p>Select a document from the list or upload a new document.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* AUDIT TRAIL */
/* ================================================= */

function AuditTrail({ auditLogs }) {
  return (
    <div className="audit-page">
      {/* HEADER */}

      <div className="audit-header">
        <div>
          <div className="breadcrumb">COALGUARD AI / AUDIT TRAIL</div>

          <h1>Audit Trail</h1>

          <p>Transparent and time-stamped record of compliance activities</p>
        </div>

        <div className="audit-security">
          <span className="security-dot"></span>
          AUDIT LOG ACTIVE
        </div>
      </div>

      {/* STATS */}

      <div className="audit-stats">
        <div className="audit-stat">
          <span>TOTAL EVENTS</span>
          <strong>12,846</strong>
          <small>All system activities</small>
        </div>

        <div className="audit-stat">
          <span>TODAY'S EVENTS</span>
          <strong>184</strong>
          <small>27 Sep 2026</small>
        </div>

        <div className="audit-stat">
          <span>AI GENERATED</span>
          <strong className="ai-number">42</strong>
          <small>AI system events</small>
        </div>

        <div className="audit-stat">
          <span>USERS ACTIVE</span>
          <strong>18</strong>
          <small>Current audit period</small>
        </div>
      </div>

      {/* FILTER BAR */}

      <div className="audit-filter-bar">
        <div className="audit-filter-title">
          <strong>Activity Log</strong>
          <span>All compliance system events</span>
        </div>

        <div className="audit-filters">
          <button className="audit-filter active">ALL</button>

          <button className="audit-filter">USER ACTIONS</button>

          <button className="audit-filter">AI EVENTS</button>

          <button className="audit-filter">SYSTEM</button>
        </div>
      </div>

      {/* AUDIT TABLE */}

      <div className="audit-table-card">
        <div className="audit-table-head">
          <span>TIME</span>
          <span>USER / SYSTEM</span>
          <span>ACTION</span>
          <span>MODULE</span>
          <span>ZONE</span>
          <span>STATUS</span>
        </div>

        {auditLogs.map((log) => (
          <div className="audit-row" key={log.id}>
            <div className="audit-time">
              <strong>{log.time}</strong>

              <span>{log.date}</span>
            </div>

            <div className="audit-user">
              <div
                className={`audit-avatar ${
                  log.role === "AI System" ? "ai-avatar" : ""
                }`}
              >
                {log.role === "AI System" ? "AI" : "RK"}
              </div>

              <div>
                <strong>{log.user}</strong>
                <span>{log.role}</span>
              </div>
            </div>

            <div className="audit-action">{log.action}</div>

            <div className="audit-module">{log.module}</div>

            <div className="audit-zone">{log.zone}</div>

            <div>
              <span
                className={`audit-status ${
                  log.status === "AI GENERATED"
                    ? "ai-status"
                    : "recorded-status"
                }`}
              >
                {log.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* AUDIT INTEGRITY */}

      <div className="audit-integrity">
        <div className="integrity-icon">✓</div>

        <div>
          <strong>Audit Integrity Active</strong>

          <p>
            All compliance activities are time-stamped and associated with the
            responsible user or AI system. Records provide a transparent history
            of changes and actions.
          </p>
        </div>

        <div className="integrity-status">SYSTEM VERIFIED</div>
      </div>
    </div>
  );
}
/* ================================================= */
/* PLACEHOLDER */
/* ================================================= */

function PlaceholderPage({ page }) {
  return (
    <div className="placeholder-page">
      <div className="placeholder-icon">◈</div>

      <h2>{page}</h2>

      <p>This module is part of the COALGUARD governance platform.</p>

      <span>Module UI coming next</span>
    </div>
  );
}

export default App;
