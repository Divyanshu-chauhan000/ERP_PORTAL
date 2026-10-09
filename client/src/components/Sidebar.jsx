import React from "react";
import { useNavigate } from "react-router-dom";
import getRole from "../utils/getRole";
import "./../style/sidebar.css";
import { useLocation } from "react-router-dom";
import { MdDashboardCustomize, MdLogout } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { MdClass } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoIosPaper } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaBullhorn, FaFileLines, FaXmark } from "react-icons/fa6";

function Sidebar({ onNavigate, onClose }) {
  const role = getRole();
  const location = useLocation();

  const navigate = useNavigate();

  const menuByRole = {
    admin: [
      {
        icon: <MdDashboardCustomize />,
        label: "Dashboard",
        path: "/dashboard",
      },
      { icon: <PiStudentFill />, label: "Students", path: "/students" },
      { icon: <GiTeacher />, label: "Teacher", path: "/teachers" },
      { icon: <MdClass />, label: "Classes", path: "/classes" },
      { icon: <FaCalendarCheck />, label: "Attendence", path: "/attendences" },
      { icon: <MdOutlineAttachMoney />, label: "Fees", path: "/fees" },
      { icon: <IoIosPaper />, label: "Exams", path: "/exams" },
    ],

    student: [
      {
        icon: <MdDashboardCustomize />,
        label: "Dashboard",
        path: "/student-dashboard",
      },
      { icon: <CgProfile />, label: "Profile", path: "/student-profile" },
      { icon: <IoIosPaper />, label: "My Exams", path: "/student-exams" },
      {
        icon: <MdOutlineAttachMoney />,
        label: "My Fees",
        path: "/student-fees",
      },
      {
        icon: <FaCalendarCheck />,
        label: "Attendance",
        path: "/student-attendance",
      },
      {
        icon: <FaFileLines />,
        label: "My Documents",
        path: "/student-documents",
      },
      { icon: <FaBullhorn />, label: "Notices", path: "/student-notices" },
    ],

    teacher: [
      {
        icon: <MdDashboardCustomize />,
        label: "Dashboard",
        path: "/dashboard",
      },
      { icon: <PiStudentFill />, label: "Students", path: "/students" },
      { icon: <MdClass />, label: "Classes", path: "/classes" },
      { icon: <FaCalendarCheck />, label: "Attendence", path: "/attendences" },
      { icon: <IoIosPaper />, label: "Exams", path: "/exams" },
    ],
  };

  const menuItems = menuByRole[role] || [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/");
  };

  return (
    <aside className="sidebar" id="app-sidebar" aria-label="Main navigation">
      <div className="side-head">
        <div className="side-brand-mark">
          <MdDashboardCustomize />
        </div>
        <div>
          <h2>School ERP</h2>
          <p>{role} workspace</p>
        </div>
        <button
          type="button"
          className="sidebar-close"
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          <FaXmark />
        </button>
      </div>
      <div className="side-menu">
        {menuItems.map((items) => {
          return (
            <button
              type="button"
              key={items.path}
              className={`menu-items ${location.pathname === items.path ? "active" : ""}`}
              aria-current={
                location.pathname === items.path ? "page" : undefined
              }
              onClick={() => {
                navigate(items.path);
                onNavigate?.();
              }}
            >
              <span className="menu-icon">{items.icon}</span>
              <span className="menu-label">{items.label}</span>
            </button>
          );
        })}
      </div>
      <div className="side-footer">
        <button
          type="button"
          className="menu-items logout-btn"
          onClick={handleLogout}
        >
          <span className="logout-icon">
            <MdLogout />
          </span>
          <span className="logout-text">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
