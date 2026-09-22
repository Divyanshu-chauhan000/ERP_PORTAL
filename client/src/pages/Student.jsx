import React from 'react'
// import api from '../api/axios'
import '../style/student.css'
import { useState , useEffect } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

export default function Student() {

  const [students , setstudents] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() =>{
     const fetchStudent = async () =>{
      const response = await axios.get('http://localhost:5000/students')
      setstudents(response.data);
     }
   fetchStudent();
  }, [])

  const handleDelete = async (id) =>{
    try{
    await axios.delete(`http://localhost:5000/students/${id}`);
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
        <h2>Total Number of students </h2>
        <div>
          <button onClick={() => navigate('/addstudent')} className='add-btn'>Add Student</button>
        </div>
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
             students.map((student) =>(
               <tr key={student.student_id}>
                <td>{student.student_id}</td>
                <td>{student.student_name}</td>
                <td>{student.student_dob}</td>
                <td>{student.student_gender}</td>
                <td>{student.student_address}</td>
                <td>{student.student_contact}</td>
                <td>{student.student_admission_date}</td>
                <td>{student.class_id}</td>
                <td><button style={{width: '50%'}} onClick={() => handleDelete(student.student_id)}>Delete</button>  <button onClick={() => navigate('/editstudent', {state : student})}>Edit Student</button></td>
               </tr>
             ))
            }
            </tbody>
           </table>
        

      </ul>      
    </div>
  )
}
