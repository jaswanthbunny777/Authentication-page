import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function isStrongPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}

export default function ChangePassword() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleChangePassword(e) {
    e.preventDefault();
    if (!isStrongPassword(newPassword)) {
      setMessage(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
      return;
    }
    setMessage("");
    try {
      // Adjust the endpoint as per your backend "forgot password" flow logic!
      const res = await axios.post("http://localhost:5000/api/auth/change-password", {
        username,
        newPassword,
      });
      setMessage(res.data.message || "Password changed successfully!");
      setUsername("");
      setNewPassword("");
      setTimeout(() => navigate("/login"), 1800);  // Redirect after change
    } catch (err) {
      setMessage(err.response?.data?.message || "Error changing password");
    }
  }

  return (
    <div
      style={{
        maxWidth: 370,
        margin: "60px auto",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 8px 32px #2563eb1e",
        padding: "36px 28px 32px 28px",
      }}
    >
      <div
        style={{
          background: "linear-gradient(90deg,#2563eb,#6366f1)",
          color: "#fff",
          fontWeight: "bold",
          padding: "14px",
          borderRadius: 12,
          fontSize: "1.18em",
          marginBottom: 24,
          textAlign: "center",
          letterSpacing: ".07em",
          boxShadow: "0 2px 12px #2563eb2c"
        }}
      >
        Reset your password
      </div>
      <h2
        style={{
          marginTop: 0,
          color: "transparent",
          background: "linear-gradient(90deg, #2563eb, #6366f1)",
          backgroundClip: "text", WebkitBackgroundClip: "text",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
          userSelect: "none"
        }}
      >
        Change Password
      </h2>
      <form
        onSubmit={handleChangePassword}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: 16,
        }}
        autoComplete="off"
      >
        <input
          name="username"
          placeholder="Username"
          value={username}
          required
          autoComplete="username"
          onChange={e => setUsername(e.target.value)}
          style={{
            padding: 12,
            border: "2px solid #dbeafe",
            borderRadius: 8,
            fontSize: 16,
            background: "#f7faff",
            boxShadow: "0 1px 8px #2563eb10",
            transition: ".26s"
          }}
          onMouseOver={e=>e.currentTarget.style.borderColor="#6366f1"}
          onMouseOut={e=>e.currentTarget.style.borderColor="#dbeafe"}
        />
        <input
          name="newPassword"
          placeholder="New password"
          type="password"
          value={newPassword}
          required
          autoComplete="new-password"
          onChange={e => setNewPassword(e.target.value)}
          style={{
            padding: 12,
            border: "2px solid #dbeafe",
            borderRadius: 8,
            fontSize: 16,
            background: "#f7faff",
            boxShadow: "0 1px 8px #2563eb10",
            transition: ".26s"
          }}
          onMouseOver={e=>e.currentTarget.style.borderColor="#6366f1"}
          onMouseOut={e=>e.currentTarget.style.borderColor="#dbeafe"}
        />
        <div
          style={{
            fontSize: "0.93em",
            color: isStrongPassword(newPassword) || !newPassword ? "#2563eb" : "#b91c1c",
            marginTop: 4,
            marginBottom: 0,
            minHeight: 18,
          }}
        >
          Password must be at least 8 characters, with uppercase, lowercase, number, and special character.
        </div>
        <button
          type="submit"
          disabled={!isStrongPassword(newPassword)}
          style={{
            background: "linear-gradient(90deg, #2563eb 70%, #6366f1 100%)",
            color: "white", border: "none", borderRadius: 8, padding: "12px 0",
            fontSize: 16, fontWeight: "bold", cursor: "pointer", letterSpacing: "1px",
            boxShadow: "0 2px 8px #6366f134", transition: "0.26s"
          }}
          onMouseOver={e=>{e.currentTarget.style.background="linear-gradient(90deg,#6366f1 70%,#2563eb 100%)"}}
          onMouseOut={e=>{e.currentTarget.style.background="linear-gradient(90deg,#2563eb 70%,#6366f1 100%)"}}
        >
          Change Password
        </button>
      </form>
      <div style={{ minHeight: 24, marginTop: 8, textAlign: "center", color: "#b91c1c" }}>{message}</div>
      <div style={{
        textAlign: "center", fontSize: "0.98em", color: "#1e40af",
        fontWeight: "bold", marginTop: 0, paddingTop: 0
      }}>
        <Link to="/login" style={{ color: "#2563eb", fontWeight: 500 }}>
          Back to Login
        </Link>
      </div>
    </div>
  );
}
