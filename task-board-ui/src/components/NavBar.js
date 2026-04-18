import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#007bff",
        padding: "10px 20px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <h3 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        TaskBoard
      </h3>

      <button
        style={{
          background: "white",
          color: "#007bff",
          border: "none",
          padding: "6px 10px",
          borderRadius: "5px",
          cursor: "pointer"
        }}
        onClick={() => navigate("/")}
      >
        Projects
      </button>
    </div>
  );
}

export default Navbar;