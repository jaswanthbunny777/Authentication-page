import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SplashVideo from "../components/SplashVideo";

function handleGoogleLogin() {
  window.alert("Google login is just a UI demo.\nIntegrate with Google OAuth in production.");
}

export default function Login() {
  const [showSplash, setShowSplash] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleSplashEnd() {
    setShowSplash(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful!");
      navigate("/home");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login error");
    }
  }

  if (showSplash) {
    return (
      <SplashVideo
        videoSrc="/login-splash.mp4"
        onVideoEnd={handleSplashEnd}
        onClickSplash={handleSplashEnd} // Pass the click handler!
      />
    );
  }

  // ... rest of your login UI as before ...
  return (
    <div style={{
      maxWidth: 350, margin: "60px auto", background: "#fff", borderRadius: 16,
      boxShadow: "0 8px 32px #2563eb1e", padding: "36px 28px 32px 28px"
    }}>
      {/* ... rest of your code (same as you pasted) ... */}
      {/* unchanged below */}
      <div style={{
        background: "linear-gradient(90deg,#2563eb 70%, #6366f1 100%)",
        color: "#fff",
        fontWeight: "bold", padding: "14px",
        borderRadius: 12, fontSize: "1.18em", marginBottom: 24,
        textAlign: "center", letterSpacing: ".02em", boxShadow: "0 2px 12px #2563eb2c"
      }}>
        Please enter your credentials
      </div>
      <h2 style={{
        marginTop: 0, color: "transparent",
        background: "linear-gradient(90deg, #2563eb, #6366f1)",
        backgroundClip: "text", WebkitBackgroundClip: "text",
        fontWeight: "bold", textAlign: "center", marginBottom: 20, userSelect: "none"
      }}>Login</h2>
      <form onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: 16 }}>
        {/* ... rest of your form ... */}
        <input
          name="username"
          placeholder="Username"
          value={username}
          required autoComplete="username"
          onChange={e => setUsername(e.target.value)}
          style={{
            padding: 12, border: "2px solid #dbeafe", borderRadius: 8, fontSize: 16,
            transition: ".26s", background: "#f7faff",
            boxShadow: "0 1px 8px #2563eb10"
          }}
          onMouseOver={e => e.currentTarget.style.borderColor = "#6366f1"}
          onMouseOut={e => e.currentTarget.style.borderColor = "#dbeafe"}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          required autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
          style={{
            padding: 12, border: "2px solid #dbeafe", borderRadius: 8, fontSize: 16,
            transition: ".26s", background: "#f7faff",
            boxShadow: "0 1px 8px #2563eb10"
          }}
          onMouseOver={e => e.currentTarget.style.borderColor = "#6366f1"}
          onMouseOut={e => e.currentTarget.style.borderColor = "#dbeafe"}
        />
        <label style={{
          display: "flex", alignItems: "center", fontSize: 15, gap: 8, marginTop: 4,
          fontWeight: 500, cursor: "pointer", WebkitUserSelect: "none", userSelect: "none"
        }}>
          <input
            type="checkbox"
            checked={remember}
            onChange={e => setRemember(e.target.checked)}
            style={{ accentColor: "#2563eb", width: 18, height: 18 }}
          />
          Remember me
        </label>
        <Link to="/change-password" style={{
          color: "#6366f1", textDecoration: "underline", fontWeight: 500, alignItems: "center"
        }}>
          Forgot password?
        </Link>
        <button
          type="submit"
          style={{
            background: "linear-gradient(90deg, #2563eb 70%, #6366f1 100%)",
            color: "white", border: "none", borderRadius: 8, padding: "12px 0",
            fontSize: 16, fontWeight: "bold", cursor: "pointer", letterSpacing: "1px",
            boxShadow: "0 2px 8px #6366f134", transition: "0.26s"
          }}
          onMouseOver={e => { e.currentTarget.style.background = "linear-gradient(90deg,#6366f1 70%,#2563eb 100%)" }}
          onMouseOut={e => { e.currentTarget.style.background = "linear-gradient(90deg,#2563eb 70%,#6366f1 100%)" }}
        >
          Log In
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
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
          <span style={{ verticalAlign: "middle" }}>Log in with Google</span>
        </button>
      </form>
      <div style={{
        minHeight: "24px", textAlign: "center", color: "#b91c1c"
      }}>{message}</div>
      <div style={{
        textAlign: "center", fontSize: "0.98em", color: "#1e40af",
        fontWeight: "bold", marginTop: 0, paddingTop: 0
      }}>
        Don't have an account 👉{" "}
        <Link to="/signup" style={{ color: "#2563eb", fontWeight: 500 }}>
          Sign up
        </Link>
      </div>
    </div>
  );
}
