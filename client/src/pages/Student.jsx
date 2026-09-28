import React from 'react'
import api from '../api/axios'
import '../style/student.css'
import { useState , useEffect } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import getRole from '../utils/getRole';
import { MdDeleteForever,MdEdit } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";

export default function Student() {


  const [students , setstudents] = useState([]);
  const[searchId , setSearchId] = useState('');
  const navigate = useNavigate();
  const role = getRole();

  useEffect(() =>{
     const fetchStudent = async () =>{
      const response = await api.get('/students')
      setstudents(response.data);
     }
   fetchStudent();
  }, [])

  const handleDelete = async (id) =>{
    try{
    await api.delete(`/students/${id}`);
    setstudents(students.filter((student) => student.student_id !== id));
    console.log("deletion successfull")
    }
    catch(error){
      console.log(error)
    }
  }


  return (
    <div>
      <div className='student-bar'>
        <h2>Students </h2>
       
        <div>
          {
            role === 'admin' && (
              <button onClick={() => navigate('/addstudent')} className='add-btn'><IoIosPersonAdd size={18} /></button>
            )
          }
        </div>
      </div>
      <div className='search-std'>
        <input type="text"  placeholder='Search Id' value={searchId} className='searchid-inpt'  onChange={(e) => setSearchId(e.target.value)}/>
      </div>
      <ul className='student-table'>
           <table border="1" cellPadding='10' style={{width: '100%', borderCollapse : 'collapse' , textAlign : 'left'}}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Student DOB</th>
                <th>Student Gender</th>
                <th>Student Address</th>
                <th>Student Contact</th>
                <th>Student Admission Date</th>
                <th> Student Class Id</th>
                <th>Edit Student</th>
              </tr>
            </thead>
            <tbody>
             {
              students.filter((student) =>{
               return student.student_id.toString().includes(searchId);
              }).map((student) =>(
               <tr key={student.student_id}>
                <td>{student.student_id}</td>
                <td>{student.student_name}</td>
                <td>{new Date(student.student_dob).toLocaleDateString('en-US' , {day : '2-digit', month: "short", year:"numeric"} )}</td>
                <td>{student.student_gender}</td>
                <td>{student.student_address}</td>
                <td>{student.student_contact}</td>
                <td>{new Date(student.student_admission_date).toLocaleDateString('en-US', {day : '2-digit' , month:'short', year: 'numeric'} )}</td>
                <td>{student.class_id}</td>
                <td><button style={{width: '50%'}} onClick={() => handleDelete(student.student_id)}><MdDeleteForever size={18}/></button>  <button onClick={() => navigate('/editstudent', {state : student})}><MdEdit size={18} /></button></td>
               </tr>
             )) 
            }
            </tbody>
           </table>
        

      </ul>      
    </div>
  )
}
