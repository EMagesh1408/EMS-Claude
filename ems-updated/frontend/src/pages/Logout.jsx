import React from "react";

export default function Logout({ user, onConfirmLogout, onCancel }) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #7c3aed 100%)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "40px",
          borderRadius: "25px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <div
          style={{
            fontSize: "70px",
            marginBottom: "10px",
          }}
        >
          🚪
        </div>

        <h1
          style={{
            margin: "0",
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          Logout
        </h1>

        <p
          style={{
            marginTop: "15px",
            color: "#d1d5db",
            fontSize: "16px",
            lineHeight: "1.6",
          }}
        >
          Are you sure you want to logout?
          <br />
          <span
            style={{
              color: "#fbbf24",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            {user?.name || "Admin"}
          </span>
        </p>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "30px",
          }}
        >
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Cancel
          </button>

          <button
            onClick={onConfirmLogout}
            style={{
              flex: 1,
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 10px 20px rgba(239,68,68,0.4)",
              transition: "0.3s",
            }}
          >
            Logout
          </button>
        </div>

        <div
          style={{
            marginTop: "25px",
            color: "#94a3b8",
            fontSize: "13px",
          }}
        >
          Employee Management System
        </div>
      </div>
    </div>
  );
}