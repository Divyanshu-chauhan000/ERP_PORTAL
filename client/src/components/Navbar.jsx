import React from "react";
import getRole from "../utils/getRole";
import "./../style/navbar.css";
import { FaBars } from "react-icons/fa6";

function Navbar({ sidebarOpen, onToggleSidebar }) {
  const username = localStorage.getItem("username");
  const role = getRole();

  const getDate = () => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
  };
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="nav-left">
          <button
            type="button"
            className="sidebar-toggle"
            onClick={onToggleSidebar}
            aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
            aria-expanded={sidebarOpen}
            aria-controls="app-sidebar"
            title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
          >
            <FaBars aria-hidden="true" />
          </button>
          <h3>Academic Year 2026-27</h3>
        </div>
        <div className="nav-right">
          <span className="date">{getDate()}</span>
          <div className="userRole">
            <span className="username"> {username}</span>
            <span className="role"> {role}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
