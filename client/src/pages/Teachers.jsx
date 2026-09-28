import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Table from '../components/Table';

export default function Teachers() {
  const [teacherTable , setTeacherTable] = useState({
    recentTeacher : []
  })

  const recentTeacherColumns = [
    {
      key : "teacher_id" , label : "Teacher ID"
    },
    {
      key : "teacher_name" , label : "Teacher Name"
    },
    {
      key : "teacher_contact" , label : "Teacher Contact"
    },
    {
      key : "teacher_subject_specialisation" , label : "Teacher Subject"
    },
    {
      key : "teacher_joining_date" , label : "Teacher Joining Date"
    }
  ];

  useEffect(() =>{
    const fetchTeacher = async  () =>{
   try{
    const teacherRes = await api.get('/teachers');
    console.log(teacherRes);
    setTeacherTable({recentTeacher : teacherRes.data});
   }catch(error){
    console.log(error);
   }
    }
    fetchTeacher();
  },[])
  return (
    <div>
      <Table title="Teacher Record" columns={recentTeacherColumns} data={teacherTable.recentTeacher }/>
    </div>
  )
}
