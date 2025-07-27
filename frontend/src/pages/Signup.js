import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SplashVideo from "../components/SplashVideo";

function handleGoogleSignup() {
  window.alert("Google sign-up is just a UI demo.\nIntegrate with Google OAuth in production.");
}

function isStrongPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}

export default function Signup() {
  const [showSplash, setShowSplash] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSplashEnd() {
    setShowSplash(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isStrongPassword(password)) {
      setMessage(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
      return;
    }
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });
      setMessage(res.data.message);
      setUsername("");
      setPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration error");
    }
  }

  if (showSplash) {
    return (
      <SplashVideo
        videoSrc="/signup-splash.mp4"
        onVideoEnd={handleSplashEnd}
      />
    );
  }

  return (
    <div
      style={{
        maxWidth: 350,
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
        Create new account
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
        Signup
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex", flexDirection: "column",
          gap: "16px", marginBottom: 16
        }}
      >
        <input
          name="username"
          placeholder="Username"
          value={username}
          required
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: 12,
            border: "2px solid #dbeafe",
            borderRadius: 8,
            fontSize: 16,
            background: "#f7faff",
            boxShadow: "0 1px 8px #2563eb10",
            transition: ".26s"
          }}
          onMouseOver={e => e.currentTarget.style.borderColor = "#6366f1"}
          onMouseOut={e => e.currentTarget.style.borderColor = "#dbeafe"}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          required
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: 12,
            border: "2px solid #dbeafe",
            borderRadius: 8,
            fontSize: 16,
            background: "#f7faff",
            boxShadow: "0 1px 8px #2563eb10",
            transition: ".26s"
          }}
          onMouseOver={e => e.currentTarget.style.borderColor = "#6366f1"}
          onMouseOut={e => e.currentTarget.style.borderColor = "#dbeafe"}
        />
        <div
          style={{
            fontSize: "0.93em",
            color: isStrongPassword(password) || !password ? "#0b6aeeff" : "#b91c1c",
            marginTop: 4,
            marginBottom: 0,
            minHeight: 18,
          }}
        >
          Password must be at least 8 characters, with uppercase, lowercase, number, and special character.
        </div>
        <button
          type="submit"
          disabled={!isStrongPassword(password)}
          style={{
            background: "linear-gradient(90deg, #2563eb 70%, #6366f1 100%)",
            color: "white", border: "none", borderRadius: 8, padding: "12px 0",
            fontSize: 16, fontWeight: "bold", cursor: "pointer", letterSpacing: "1px",
            boxShadow: "0 2px 8px #6366f134", transition: "0.26s"
          }}
          onMouseOver={e => { e.currentTarget.style.background = "linear-gradient(90deg,#6366f1 70%,#2563eb 100%)" }}
          onMouseOut={e => { e.currentTarget.style.background = "linear-gradient(90deg,#2563eb 70%,#6366f1 100%)" }}
        >
          Sign Up
        </button>
        <button
          type="button"
          onClick={handleGoogleSignup}
          style={{
            marginTop: 4,
            background: "linear-gradient(90deg,#f8fafc 60%,#dbeafe 100%)",
            color: "#2563eb",
            border: "2px solid #2563eb",
            borderRadius: 8,
            padding: "11px 0",
            fontWeight: "bold",
            fontSize: "1em",
            letterSpacing: ".5px",
            cursor: "pointer",
            transition: "box-shadow 0.25s, border-color 0.25s, background 0.33s"
          }}
          onMouseOver={e => { e.currentTarget.style.background = "linear-gradient(90deg,#dbeafe 20%,#2563eb11 100%)"; e.currentTarget.style.borderColor = "#6366f1"; }}
          onMouseOut={e => { e.currentTarget.style.background = "linear-gradient(90deg,#f8fafc 60%,#dbeafe 100%)"; e.currentTarget.style.borderColor = "#2563eb"; }}
        >
          <span style={{ verticalAlign: "middle" }}>Sign up with Google</span>
        </button>
      </form>
      <div style={{ minHeight: "24px", textAlign: "center", color: "#b91c1c" }}>
        {message}
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: "0.98em",
          color: "#1e40af",
          fontWeight: "bold",
          marginTop: 0,
          paddingTop: 0,
        }}
      >
        Already have an account 👉{" "}
        <Link to="/login" style={{ color: "#2563eb", fontWeight: 500 }}>
          Log in
        </Link>
      </div>
    </div>
  );
}
