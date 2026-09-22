import React, { useState } from 'react'
import '../style/student.css'
import { Form } from 'react-router-dom'
import axios from 'axios';
import api from '../api/axios';

export default function AddStudent() {
  
  const [studentName , setStudentname] = useState("");
  const [studentDob , setStudentdob] = useState("");
  const [studentGender , setStudentGender] = useState("");
  const [studentAddress , setStudentAddress] = useState("");
  const [studentContact , setStudentContact] = useState("");
  const [studentAdmissionDate , setStudentAdmissionDate] = useState("");
  const [ classId , setClassId] = useState(""); 

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
       const response = await api.post('/students' , {
        student_name : studentName,
        student_dob : studentDob,
        student_gender : studentGender,
        student_address : studentAddress,
        student_contact : studentContact,
        student_admission_date : studentAdmissionDate,
        class_id : classId
       })
       console.log(response.data)
    }
    catch(error){
      console.log(error);
    }
  }



  return (
    <div className='add-form' >
      <div style={{padding : '20px 5px '}}>
        Add Student Details
      </div>
      <form onSubmit={handleSubmit}  style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px', padding: '20px',border: '2px solid #292a2b', }}>
        <label htmlFor="">Name</label>
        <input type="text" name="student_name" id="" value={studentName} onChange={(e) => setStudentname(e.target.value)} />
        <label htmlFor="">Date of Birth</label>
        <input type="date" name="studebt_dob" id="" value={studentDob} onChange={(e) => setStudentdob(e.target.value)} />
        <label htmlFor="">Gender</label>
        <input type="text" name='gender' value={studentGender} onChange={(e) => setStudentGender(e.target.value)} />
        <label htmlFor="">Address</label>
        <input type="text" name="address" id="" value = {studentAddress} onChange={(e) => setStudentAddress(e.target.value)} />
        <label htmlFor="">Contact</label>
        <input type="text" name="contact" id="" value={studentContact} onChange={(e) => setStudentContact(e.target.value)} />
        <label htmlFor="">Admission Date</label>
        <input type="date" name="admission_date" id="" value={studentAdmissionDate} onChange={(e) => setStudentAdmissionDate(e.target.value)}/>
        <label htmlFor="">Class Id</label>
        <input type="number" name="class_id" id="" value={classId} onChange={(e) => setClassId(e.target.value)}/>

        <button type='Submit'>Submit</button>
      </form>
    </div>
  )
}
