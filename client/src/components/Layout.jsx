import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import "./../style/layout.css";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.matchMedia("(min-width: 561px)").matches,
  );
  const closeSidebarOnMobile = () => {
    if (window.matchMedia("(max-width: 560px)").matches) setSidebarOpen(false);
  };

  return (
    <div
      className={`side-content ${sidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`}
    >
      <Sidebar
        onNavigate={closeSidebarOnMobile}
        onClose={() => setSidebarOpen(false)}
      />
      <button
        type="button"
        className="sidebar-backdrop"
        aria-label="Close navigation menu"
        onClick={() => setSidebarOpen(false)}
      />
      <div className="nav-content">
        <Navbar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((open) => !open)}
        />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
