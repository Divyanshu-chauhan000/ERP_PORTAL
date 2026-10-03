import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios';

function StudentDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decode = jwtDecode(token);
  const studentId =  decode.student_id;

  const [stats , setStats ] = useState({
    totalExams : 0,
    averageMarks : 0,
    feePending : 0,
    attendencePercentage : 0
  });
 

  useEffect(() => {
    const fetchStats = async () =>{
    try{
     const[exams , fees , attendance] = await Promise.all(
      [
        api.get(`/exams?student_id=${studentId}`),
        api.get(`/fees?student_id${studentId}`),
        api.get(`/attendences?student_id${studentId}`)

      ]
     )

     const examData = exams.data
     const totalMarks = examData.reduce((sum , e) => sum + e.marks , 0);
     const maxMarks = examData.reduce((sum , e) => sum + e.max_marks , 0);
     const avg = maxMarks > 0 ? ((totalMarks / maxMarks) * 100 ).toFixed(1) : 0


     const feesData = fees.data[0];
     const pending = feesData ? feesData.balance_due : 0;

     const attendanceData = attendance.data[0];
     const attendancePercentage  =  attendanceData ? attendanceData.attendance_percentage : 0
 

     setStats({
       totalExams : examData.length(),
       averageMarks : avg,
      feePending : pending,
      attendencePercentage : attendancePercentage
     })
    }catch(error){
      console.log(error)
    }
    }

    fetchStats();
  },[])

   
  const quickLinks = [

  ]


  return (
    <div>
      
    </div>
  )
}

export default StudentDashboard
