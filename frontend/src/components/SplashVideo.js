import React, { useRef, useState } from "react";

export default function SplashVideo({ videoSrc, onVideoEnd }) {
  const videoRef = useRef(null);
  const endedRef = useRef(false);
  const [fadeOut, setFadeOut] = useState(false);

  function handleCloseSplash() {
    if (endedRef.current) return;
    endedRef.current = true;

    setFadeOut(true);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }

    // Wait for fade-out animation to finish before calling onVideoEnd
    setTimeout(() => {
      if (typeof onVideoEnd === "function") onVideoEnd();
    }, 600); // 600ms matches the CSS transition duration
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#000",
        zIndex: 9999,
        cursor: "pointer",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.6s ease",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={handleCloseSplash}
      tabIndex={0}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleCloseSplash}
        style={{ width: "100vw", height: "100vh", objectFit: "cover", borderRadius: 0 }}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
