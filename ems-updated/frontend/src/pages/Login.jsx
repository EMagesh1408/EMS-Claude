import React, { useState } from "react";
import { loginUser } from "../api/employeeApi";

const ADMIN_ACCOUNTS = {
  magesh: {
    password: "1408",
    name: "Magesh",
    role: "admin",
    department: "Admin",
    avatar: "MK",
  },
  dhanasekar: {
    password: "1234",
    name: "Dhanasekar",
    role: "admin",
    department: "Admin",
    avatar: "DK",
  },
  subasri: {
    password: "1234",
    name: "Subasri",
    role: "admin",
    department: "Admin",
    avatar: "SB",
  },
};

export default function Login({ onLogin }) {
  const [isActive, setIsActive] = useState(false);

  const [username, setUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [email, setEmail] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");

  const [message, setMessage] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();

    const key = username.trim().toLowerCase();
    const adminUser = ADMIN_ACCOUNTS[key];

    if (
      adminUser &&
      adminUser.password === adminPassword.trim()
    ) {
      onLogin({
        ...adminUser,
        email: key + "@admin.com",
      });
    } else {
      setMessage("Invalid Admin Credentials");
    }
  };

  const handleEmployeeLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(
        email.trim(),
        employeePassword.trim()
      );

      onLogin(data.user);
    } catch (err) {
      setMessage("Invalid Employee Credentials");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#667eea,#764ba2)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "900px",
          maxWidth: "100%",
          minHeight: "550px",
          background: "#fff",
          borderRadius: "30px",
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
        }}
      >
        {/* Employee Login */}
        <div
          style={{
            position: "absolute",
            left: isActive ? "0%" : "50%",
            width: "50%",
            height: "100%",
            transition: "0.6s",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
          }}
        >
          <form
            onSubmit={handleEmployeeLogin}
            style={{
              width: "80%",
              textAlign: "center",
            }}
          >
            <h1>Employee Login</h1>

            <input
              type="email"
              placeholder="Employee Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={employeePassword}
              onChange={(e) =>
                setEmployeePassword(e.target.value)
              }
              style={inputStyle}
            />

            <button style={buttonStyle}>
              Sign In
            </button>
          </form>
        </div>

        {/* Admin Login */}
        <div
          style={{
            position: "absolute",
            left: isActive ? "50%" : "0%",
            width: "50%",
            height: "100%",
            transition: "0.6s",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
          }}
        >
          <form
            onSubmit={handleAdminLogin}
            style={{
              width: "80%",
              textAlign: "center",
            }}
          >
            <h1>Admin Login</h1>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={adminPassword}
              onChange={(e) =>
                setAdminPassword(e.target.value)
              }
              style={inputStyle}
            />

            <button style={buttonStyle}>
              Sign In
            </button>
          </form>
        </div>

        {/* Sliding Panel */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: isActive ? "0%" : "50%",
            width: "50%",
            height: "100%",
            background:
              "linear-gradient(135deg,#5c6bc0,#512da8)",
            color: "#fff",
            transition: "0.6s",
            borderRadius: isActive
              ? "0 150px 150px 0"
              : "150px 0 0 150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "40px",
            boxSizing: "border-box",
          }}
        >
          {isActive ? (
            <div>
              <h1>Welcome Admin!</h1>
              <p>
                Manage Employees, Payroll,
                Attendance and Reports
              </p>

              <button
                onClick={() =>
                  setIsActive(false)
                }
                style={outlineButton}
              >
                Employee Login
              </button>
            </div>
          ) : (
            <div>
              <h1>Hello Employee!</h1>
              <p>
                Access Salary, Attendance,
                Profile and Performance
              </p>

              <button
                onClick={() =>
                  setIsActive(true)
                }
                style={outlineButton}
              >
                Admin Login
              </button>
            </div>
          )}
        </div>

        {message && (
          <div
            style={{
              position: "absolute",
              bottom: 20,
              width: "100%",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "14px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background:
    "linear-gradient(135deg,#667eea,#764ba2)",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
};

const outlineButton = {
  padding: "12px 25px",
  border: "1px solid white",
  background: "transparent",
  color: "#fff",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "15px",
};