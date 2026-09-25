import React from 'react'
import { useNavigate } from 'react-router-dom'
import getRole from '../utils/getRole';
import './../style/sidebar.css'

function Sidebar() {
  const role = getRole();

  const navigate = useNavigate();
  
  const menuItems = [
    {
      icon : '📊',
      label : "Dashboard",
      path : '/dashboard',
    },
     {
      icon : '👨‍🎓',
      label : "Students",
      path : '/students',
    },
     {
      icon : '👨‍🏫',
      label : "Teacher",
      path : '/teachers',
    },
     {
      icon : '📚',
      label : "Classes",
      path : '/classes',
    },
     {
      icon : '✅',
      label : "Attendence",
      path : '/attendence',
    },
     {
      icon : '💰',
      label : "Fees",
      path : '/fees',
    },
     {
      icon : '📝',
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
            <div key={items.path} className='menu-items' onClick={() => navigate(items.path)}>
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
