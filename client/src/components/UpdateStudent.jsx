import React, { useState } from 'react'
import '../style/student.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';




export default function UpdateStudent() {

    const location = useLocation();
    const student = location.state;

    const navigate = useNavigate();

    const [studentName , setStudentname] = useState(student.student_name);
    const [studentDob , setStudentdob] = useState(student.student_dob);
    const [studentGender , setStudentGender] = useState(student.student_gender);
    const [studentAddress , setStudentAddress] = useState(student.student_address);
    const [studentContact , setStudentContact] = useState(student.student_contact);
    const [studentAdmissionDate , setStudentAdmissionDate] = useState(student.student_admission_date);
    const [ classId , setClassId] = useState(student.class_id); 

    const handleSubmit = async () =>{
        try{
       const response = await axios.put(`http://localhost:5000/students/${student.student_id}` , {
        student_name : studentName,
        student_dob : studentDob,
        student_gender : studentGender,
        student_address : studentAddress,
        student_contact : studentContact,
        student_admission_date : studentAdmissionDate,
        class_id : classId
       })
       console.log(response.data);
       navigate('/students')
    }
    catch(error){
      console.log(error);
    }
  }


  return (
    <div className='add-form' >
      <div style={{padding : '20px 5px '}}>
        Update Student Details
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
