import React from "react";
import "./../style/dashboard.css";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="sideBar">
        <h2>ERP PORTAL</h2>
        <div className="sideLinks">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/students">Students</NavLink>
          <NavLink to="/teachers">Teachers</NavLink>
          <NavLink to="/classes">Classes</NavLink>
          <NavLink to="/subjects">Subjects</NavLink>
          <NavLink to="/attendences">Attendences</NavLink>
          <NavLink to="/fees">Fees</NavLink>
          <NavLink to="/exams">Exams</NavLink>
        </div>
      </div>
      <div className="main">
        <div className="dash-container">

          {/* This is welcome bar */}
          <div className="welcome-bar">
           <div className="welcome">
             
           </div>
           <div className="profile">

           </div>
          </div>

           {/* This is count card section */}
          <div className="count-card">
            <div>Total Students</div>
            <div>Teachers</div>
            <div>Classes</div>
            <div>Fees Due</div>
          </div>

          
        </div>
      </div>
    </div>
  );
}
