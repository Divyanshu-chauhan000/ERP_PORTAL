import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {

  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const response = await api.post('/auth/login' , {
        username : username,
        password : password
      })
    localStorage.setItem("token" , response.data.token);
    navigate('/dashboard');
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div>
        <form onSubmit={handleSubmit}>
           <input type="text" name="username" id="" value={username}  onChange={(e) => setUsername(e.target.value)} />
           <input type="password" name="password" id="" value={password} onChange={(e) => setPassword(e.target.value)} />
           <button type='submit'>Login</button>
        </form>
    </div>
  )
}
