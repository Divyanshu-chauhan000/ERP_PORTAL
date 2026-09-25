import React from 'react'
import getRole from '../utils/getRole';
import './../style/navbar.css'

function Navbar() {

  const username = localStorage.getItem('username');
  const role = getRole();


  const getDate = () =>{
    const options = {weekday : 'short' , year : 'numeric' , month : 'short', day : 'numeric'};
    return new Date().toLocaleDateString('en-US' , options)
  }
  return (
    <nav className='navbar'>
      <div className='nav-content'>
          <div className='nav-left'>
             <h3>Academic Year 2026-27</h3> 
          </div>
          <div className='nav-right'>
             <span className='date'>{getDate()}</span>
             <div className='userRole'>
              <span className='username'> {username}</span>
              <span className='role'> {role}</span>
             </div> 
          </div>
      </div>
    </nav>
  )
}

export default Navbar
