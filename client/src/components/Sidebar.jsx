import React from 'react'
import { useNavigate } from 'react-router-dom'
import getRole from '../utils/getRole';
import './../style/sidebar.css'
import { useLocation } from 'react-router-dom';
import { MdDashboardCustomize } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { MdClass } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";  
import { IoIosPaper } from "react-icons/io";

function Sidebar() {
  const role = getRole();
  const location = useLocation();

  const navigate = useNavigate();
  
  const menuItems = [
    {
      icon : <MdDashboardCustomize />,
      label : "Dashboard",
      path : '/dashboard',
    },
     {
      icon : <PiStudentFill />,
      label : "Students",
      path : '/students',
    },
     {
      icon : <GiTeacher />,
      label : "Teacher",
      path : '/teachers',
    },
     {
      icon : <MdClass />,
      label : "Classes",
      path : '/classes',
    },
     {
      icon : <FaCalendarCheck />,
      label : "Attendence",
      path : '/attendence',
    },
     {
      icon : <MdOutlineAttachMoney />,
      label : "Fees",
      path : '/fees',
    },
     {
      icon : <IoIosPaper />,
      label : "Exams",
      path : '/exams',
    },
    
  ]

  
  return (
 <div className='sidebar'>
     <div className='side-head'>
       <h2>School ERP Portal</h2>
       <p>{role} Panel</p>
    </div>
    <div className='side-menu'>
      {
        menuItems.map((items) =>{
          return (
            <div key={items.path} className={`menu-items ${location.pathname === items.path ? 'active' : ""}`} onClick={() => navigate(items.path)}>
                 <span className='menu-icon'>{items.icon}</span>
                 <span className='menu-label'>{items.label}</span>
            </div>
          )
        })
      }
    </div>
 </div>
  )
}

export default Sidebar
