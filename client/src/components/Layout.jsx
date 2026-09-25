import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import './../style/layout.css'

function Layout({ children }) {
  return (
    <div className="side-content">
      <Sidebar />
      <div className="nav-content">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
