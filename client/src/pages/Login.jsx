import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import './../style/login.css'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        username: username,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username" ,  response.data.username)
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-container">
      <div  style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px', color: '#1e293b' }}>School ERP System</div>
      <div style={{ padding : '30px' ,  border : "1px solid #e2e8f0" , borderRadius : '8px' , boxShadow : '0 4px 12px rgba(0,0,0,0.05)', width : '100%', maxWidth : '400px',}}>
        <div style={{ paddingBottom: '16px', fontWeight: 'bold', fontSize: '18px', color: '#475569' }}>
          Sign in to your account
        </div>
        <form onSubmit={handleSubmit} style={{display : 'flex' , flexDirection : 'column' }}>
          <label>User Name</label>
          <input className="login-input"
            type="text"
            name="username"
            id=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            style={ { margin : '6px 0px 16px 0px' , padding : '8px 12px'  , border : '1px solid #cbd5e1' , borderRadius : '4px' , outline : 'none' }}
            required
          />
          <label htmlFor="" >Password</label>
          <input className="login-input"
            type="password"
            name="password"
            id=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
           style={ { margin : '6px 0px 16px 0px' , padding : '8px 12px'  , border : '1px solid #cbd5e1' , borderRadius : '4px' , outline : 'none' }}
          />
          <button style={{ padding : '10px 0px' , color : 'white' , backgroundColor : '#1b4cd1' , border : 'none' , cursor : 'pointer', borderRadius : '4px' , marginTop : '10px' , fontWeight : 'bold'}} type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
