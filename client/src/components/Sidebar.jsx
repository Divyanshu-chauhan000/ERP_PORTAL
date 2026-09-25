import React from 'react'
import { useNavigate } from 'react-router-dom'

function Sidebar() {

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
    <div>
      {
        menuItems.map((items) =>{
          const Icon = items.icon;
          return (
            <div key={items.path} onClick={() => navigate(`/${items.path}`)}>
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
