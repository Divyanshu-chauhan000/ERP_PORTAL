import React from 'react'
import {
  MdDashboard , 
  MdPeople,
  MdSchool,
  MdClass,
  MdEventNote,
  MdAttachMoney,
  MdAssignmentTurnedIn,
  MdAccountCircle,
  MdLogout
} from 'react-icons'

function Sidebar() {
  
  const menuItems = [
    {
      icon : MdDashboard,
      label : "Dashboard",
      path : '/dashboard',
    },
     {
      icon : MdPeople,
      label : "Students",
      path : '/students',
    },
     {
      icon : MdSchool,
      label : "Teacher",
      path : '/teachers',
    },
     {
      icon : MdClass,
      label : "Classes",
      path : '/classes',
    },
     {
      icon : MdEventNote,
      label : "Attendence",
      path : '/attendence',
    },
     {
      icon : MdAttachMoney,
      label : "Fees",
      path : '/fees',
    },
     {
      icon : MdAssignmentTurnedIn,
      label : "Exams",
      path : '/exams',
    },
    
  ]

  
  return (
    <div>
      
    </div>
  )
}

export default Sidebar
