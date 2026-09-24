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
import { useNavigate } from 'react-router-dom'

function Sidebar() {

  const navigate = useNavigate();
  
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
      {
        menuItems.map((items) =>{
          const Icon = items.icon;
          return (
            <div key={items.path} onClick={() => navigate('/items.path')}>
                 <Icon size={20} />
                 <span>{items.label}</span>
            </div>
          )
        })
      }
    </div>
  )
}

export default Sidebar
