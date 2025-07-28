import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SplashVideo from "../components/SplashVideo";

function isStrongPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}

export default function Home() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  function handleSplashEnd() {
    setShowSplash(false);
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    if (!isStrongPassword(newPassword)) {
      setMessage(
        "New password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
      return;
    }
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/change-password`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error changing password");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  if (showSplash) {
    return (
      <SplashVideo
        videoSrc="/home-splash.mp4"
        onVideoEnd={handleSplashEnd}
      />
    );
  }

  return (
    <div
      style={{
        maxWidth: 430,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 8px 24px #0001",
        padding: "36px 28px 32px 28px",
      }}
    >
      <h2
        style={{
          color: "#2563eb",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
          userSelect: "none",
        }}
      >
        Welcome to Authentication App
      </h2>
      <div>
        <div className="feature-step-card">
          <div className="feature-step-text">
            User registration (Signup)
          </div>
          <img
            src="/feature1.jpg"
            alt="Signup Step"
            className="feature-step-image"
          />
        </div>
        <div className="feature-step-card">
          <div className="feature-step-text">
            User login authentication
          </div>
          <img
            src="/feature2.jpg"
            alt="Login Step"
            className="feature-step-image"
          />
        </div>
        <div className="feature-step-card">
          <div className="feature-step-text">
            Protected dashboard after login
          </div>
          <img
            src="/feature3.jpg"
            alt="Home Dashboard"
            className="feature-step-image"
          />
        </div>
      </div>
      <div className="gradient-card" style={{ margin: "32px 0 24px 0", padding: 24 }}>
        <h3 style={{ color: "#174ea6", textAlign: "center", marginBottom: 10, paddingBlockEnd: 10 }}>
          Change Password
        </h3>
        <form onSubmit={handleChangePassword}>
          <input
            className="input-animate"
            type="password"
            placeholder="Old password"
            required
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
          />
          <input
            className="input-animate"
            type="password"
            placeholder="New password"
            required
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <div
            style={{
              fontSize: "0.93em",
              color: isStrongPassword(newPassword) || !newPassword
                ? "#ffffffff"
                : "#f30000ff",
              marginBottom: 10,
              minHeight: 18,
            }}
          >
            New password must be at least 8 characters, with uppercase, lowercase, number, and special character.
          </div>
          <button
            type="submit"
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "10px 0",
              fontSize: 16,
              fontWeight: "bold",
              cursor: "pointer",
              width: "100%",
              letterSpacing: "1px",
              marginTop: 10
            }}
          >
            Change Password
          </button>
        </form>
        <div
          style={{
            marginTop: 10,
            minHeight: "22px",
            textAlign: "center",
            color: message.includes("success") ? "#168a00" : "#b91c1c",
            fontWeight: 600,
          }}
        >
          {message}
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handleLogout}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "10px 18px",
            fontSize: 16,
            fontWeight: "bold",
            cursor: "pointer",
            letterSpacing: "1px",
            minWidth: 130,
            boxShadow: "0 2px 8px #2563eb20",
            transition:
              "background 0.22s, box-shadow 0.22s, transform 0.18s cubic-bezier(.51,1,.72,1)"
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = "#1d4ed8";
            e.currentTarget.style.transform = "translateY(-3px) scale(1.07)";
            e.currentTarget.style.boxShadow = "0 6px 24px #2563eb40";
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = "#2563eb";
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 2px 8px #2563eb20";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
