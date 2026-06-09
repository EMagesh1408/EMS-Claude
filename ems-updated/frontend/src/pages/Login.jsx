import React, { useState } from "react";
import { loginUser } from "../api/employeeApi";

const ADMIN_ACCOUNTS = {
  "magesh":     { password: "1408", name: "Magesh",     role: "admin", department: "Admin", avatar: "MK" },
  "dhanasekar": { password: "1234", name: "Dhanasekar", role: "admin", department: "Admin", avatar: "DK" },
  "subasri":    { password: "1234", name: "Subasri",    role: "admin", department: "Admin", avatar: "SB" },
};

export default function Login({ onLogin }) {
  const [panel, setPanel]       = useState("signin");   // "signin" | "signup"
  const [tab, setTab]           = useState("admin");     // "admin" | "employee"
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage]   = useState("");
  const [loading, setLoading]   = useState(false);

  // ── login logic (unchanged) ───────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    if (tab === "admin") {
      if (!username.trim() || !password.trim()) {
        setMessage("Please enter username and password.");
        return;
      }
      const key = username.trim().toLowerCase();
      const adminUser = ADMIN_ACCOUNTS[key];
      if (adminUser && adminUser.password === password.trim()) {
        onLogin({ ...adminUser, email: key + "@admin.com" });
      } else {
        setMessage("Invalid username or password.");
      }
      return;
    }

    if (!email.trim() || !password.trim()) {
      setMessage("Please enter email and password.");
      return;
    }
    setLoading(true);
    try {
      const data = await loginUser(email.trim(), password.trim());
      if (data.user.role === "admin") {
        setMessage("This is an admin account. Please use Admin Login.");
      } else {
        onLogin(data.user);
      }
    } catch (err) {
      setMessage(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (t) => {
    setTab(t);
    setMessage("");
    setUsername(""); setEmail(""); setPassword("");
  };

  const switchPanel = (p) => {
    setPanel(p);
    setMessage("");
    setUsername(""); setEmail(""); setPassword("");
  };

  // ── shared sub-styles ─────────────────────────────────────────────────
  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    marginBottom: "14px",
    border: "1.5px solid #dde3ef",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
    fontSize: "14px",
    color: "#1e293b",
    background: "#f8fafc",
    transition: "border-color 0.2s",
  };

  const tabBtnStyle = (t) => ({
    flex: 1,
    padding: "9px",
    border: "none",
    borderRadius: "7px",
    fontWeight: "700",
    fontSize: "13px",
    cursor: "pointer",
    background: tab === t ? "linear-gradient(135deg,#667eea,#764ba2)" : "transparent",
    color: tab === t ? "#fff" : "#94a3b8",
    transition: "all 0.2s",
  });

  const ghostBtn = {
    padding: "10px 32px",
    border: "2px solid #fff",
    borderRadius: "24px",
    background: "transparent",
    color: "#fff",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    letterSpacing: "0.5px",
    transition: "background 0.2s, color 0.2s",
  };

  const solidBtn = {
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "10px",
    background: loading ? "#94a3b8" : "linear-gradient(135deg,#667eea,#764ba2)",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "700",
    cursor: loading ? "not-allowed" : "pointer",
    letterSpacing: "0.3px",
    transition: "opacity 0.2s",
  };

  const isSignIn = panel === "signin";

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg,#e8ecff 0%,#f0e8ff 50%,#e0f0ff 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      {/* ── card wrapper ─────────────────────────────────────────── */}
      <div style={{
        position: "relative",
        width: "820px",
        height: "520px",
        background: "#fff",
        borderRadius: "22px",
        boxShadow: "0 24px 72px rgba(102,126,234,0.18)",
        overflow: "hidden",
        display: "flex",
      }}>

        {/* ══ LEFT FORM PANEL ══════════════════════════════════════ */}
        <div style={{
          width: "50%",
          padding: "48px 44px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          transform: isSignIn ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.6s cubic-bezier(0.77,0,0.175,1)",
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          boxSizing: "border-box",
          zIndex: isSignIn ? 2 : 1,
        }}>
          <h2 style={{ fontSize: "26px", fontWeight: "800", color: "#1e293b", marginBottom: "6px", marginTop: 0 }}>
            Sign In
          </h2>

          {/* social row */}
          <div style={{ display: "flex", gap: "10px", margin: "14px 0 10px" }}>
            {["G+", "f", "Q", "in"].map((icon) => (
              <div key={icon} style={{
                width: "38px", height: "38px", borderRadius: "8px",
                border: "1.5px solid #e2e8f0", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "13px", fontWeight: "700",
                color: "#475569", cursor: "pointer",
              }}>{icon}</div>
            ))}
          </div>

          <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "14px" }}>
            or use your email password
          </p>

          {/* tab switcher */}
          <div style={{
            display: "flex", gap: "4px", marginBottom: "14px",
            background: "#f1f5f9", padding: "4px", borderRadius: "9px",
          }}>
            <button type="button" style={tabBtnStyle("admin")}    onClick={() => switchTab("admin")}>🔑 Admin</button>
            <button type="button" style={tabBtnStyle("employee")} onClick={() => switchTab("employee")}>👤 Employee</button>
          </div>

          <form onSubmit={handleLogin}>
            {tab === "admin" ? (
              <>
                <input type="text"     placeholder="Username"  value={username}  onChange={(e) => setUsername(e.target.value)}  style={inputStyle} autoComplete="off" />
                <input type="password" placeholder="Password"  value={password}  onChange={(e) => setPassword(e.target.value)}  style={inputStyle} />
              </>
            ) : (
              <>
                <input type="email"    placeholder="Employee Email" value={email}    onChange={(e) => setEmail(e.target.value)}    style={inputStyle} />
                <input type="password" placeholder="Password"       value={password} onChange={(e) => setPassword(e.target.value) } style={inputStyle} />
              </>
            )}

            <p style={{ fontSize: "12px", color: "#667eea", textAlign: "right", marginTop: "-8px", marginBottom: "14px", cursor: "pointer" }}>
              Forgot Your Password?
            </p>

            <button type="submit" disabled={loading} style={solidBtn}>
              {loading ? "Logging in…" : `Sign In as ${tab === "admin" ? "Admin" : "Employee"}`}
            </button>

            {message && (
              <p style={{ marginTop: "12px", color: "#ef4444", fontWeight: "600", fontSize: "13px", textAlign: "center" }}>
                ⚠️ {message}
              </p>
            )}
          </form>
        </div>

        {/* ══ RIGHT FORM PANEL (Employee Register placeholder) ════ */}
        <div style={{
          width: "50%",
          padding: "48px 44px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          transform: isSignIn ? "translateX(100%)" : "translateX(0)",
          transition: "transform 0.6s cubic-bezier(0.77,0,0.175,1)",
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%",
          boxSizing: "border-box",
          zIndex: isSignIn ? 1 : 2,
        }}>
          <h2 style={{ fontSize: "26px", fontWeight: "800", color: "#1e293b", marginBottom: "6px", marginTop: 0 }}>
            Create Account
          </h2>

          {/* social row */}
          <div style={{ display: "flex", gap: "10px", margin: "14px 0 10px" }}>
            {["G+", "f", "Q", "in"].map((icon) => (
              <div key={icon} style={{
                width: "38px", height: "38px", borderRadius: "8px",
                border: "1.5px solid #e2e8f0", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "13px", fontWeight: "700",
                color: "#475569", cursor: "pointer",
              }}>{icon}</div>
            ))}
          </div>

          <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "14px" }}>
            or use your email for registration
          </p>

          <input type="text"     placeholder="Full Name"  style={inputStyle} />
          <input type="email"    placeholder="Email"      style={inputStyle} />
          <input type="password" placeholder="Password"   style={inputStyle} />

          <button type="button" style={solidBtn}>
            Sign Up
          </button>
        </div>

        {/* ══ SLIDING OVERLAY PANEL ════════════════════════════════ */}
        <div style={{
          position: "absolute",
          top: 0,
          left: isSignIn ? "50%" : "0%",
          width: "50%",
          height: "100%",
          background: "linear-gradient(135deg,#667eea 0%,#764ba2 60%,#4f46e5 100%)",
          borderRadius: isSignIn ? "0 22px 22px 0" : "22px 0 0 22px",
          transition: "left 0.6s cubic-bezier(0.77,0,0.175,1), border-radius 0.6s",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 40px",
          boxSizing: "border-box",
          textAlign: "center",
        }}>
          {isSignIn ? (
            /* overlay showing when Sign In form is active → prompt to sign up */
            <>
              <h2 style={{ color: "#fff", fontSize: "28px", fontWeight: "800", marginBottom: "12px", marginTop: 0 }}>
                Hello, Friend!
              </h2>
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "14px", lineHeight: "1.6", marginBottom: "32px" }}>
                Register with your personal details to use all of site features
              </p>
              <button
                type="button"
                style={ghostBtn}
                onClick={() => switchPanel("signup")}
                onMouseEnter={(e) => { e.target.style.background = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={(e) => { e.target.style.background = "transparent"; }}
              >
                SIGN UP
              </button>
            </>
          ) : (
            /* overlay showing when Sign Up form is active → prompt to sign in */
            <>
              <h2 style={{ color: "#fff", fontSize: "28px", fontWeight: "800", marginBottom: "12px", marginTop: 0 }}>
                Welcome Back!
              </h2>
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "14px", lineHeight: "1.6", marginBottom: "32px" }}>
                Enter your personal details to use all of site features
              </p>
              <button
                type="button"
                style={ghostBtn}
                onClick={() => switchPanel("signin")}
                onMouseEnter={(e) => { e.target.style.background = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={(e) => { e.target.style.background = "transparent"; }}
              >
                SIGN IN
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
