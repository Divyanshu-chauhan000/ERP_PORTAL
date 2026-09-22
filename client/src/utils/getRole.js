import React from 'react'
import {jwtDecode} from 'jwt-decode';

function getRole() {
  const token = localStorage.getItem('token');
  if(!token){
    return null
  }
  else{
    const decoded = jwtDecode(token);
    return decoded.role
  }
}

export default getRole
