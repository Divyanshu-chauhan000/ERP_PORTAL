import React, { useEffect, useState } from "react";
import "./../style/dashboard.css";
import { NavLink } from "react-router-dom";
import StatsCard from "../components/StatsCard";
import api from "../api/axios";
import Table from "../components/Table";

export default function Dashboard() {
  const [stats , setStats] = useState({
    totalStudents : 0,
    totalTeachers : 0,
    totalFeesCollected : 0,
    totalFeesBalance : 0,
    totalAttendencePercentage : 0
  })

  const recentStudents = [
  { id: 'S1284', name: 'Priya Ramachandran', class: '7-B', date: '22 Sep 2026' },
  { id: 'S1283', name: 'Arjun Mehra', class: '10-A', date: '21 Sep 2026' },
] 
const recentStudentColumns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'class', label: 'Class' },
  { key: 'date', label: 'Date' },
]


  useEffect(() =>{
   const fetchStats= async ()=>{
try{
     const [students , teachers , collected , pending , attendence] = await Promise.all([
        api.get('/students/total-students'),
        api.get('/teachers/total-teachers'),
        api.get('/fees/totalcollected'),
        api.get('/fees/feesbalance'),
        api.get('/attendence/overAllAttendence')
    ])
    console.log("Students : ", students.data )
    console.log("Total student count : " , students.data.total_students);

    setStats({
      totalStudents : students.data[0].total_students,
      totalTeachers : teachers.data[0].total_teacher,
      totalFeesCollected : collected.data[0].total_collected_fees || 0,
      totalFeesBalance : pending.data[0].balance_fees || 0,
      totalAttendencePercentage :  attendence.data[0].attendence_percentage
    })
}catch(error){
  console.log(error)
}

   }
   fetchStats();
  }, []
)
  return (
     <div className="dashboard">
      <h2>Overview</h2>
      <div className="stats-grid">
       <StatsCard title="Total Students" value={stats.totalStudents}  />
       <StatsCard title="Total Teachers" value={stats.totalTeachers}  />
       <StatsCard title="Fees Collected" value={stats.totalFeesCollected}  />
       <StatsCard title="Fees Pending" value={stats.totalFeesBalance}  />
       <StatsCard title="Attendence %" value={stats.totalAttendencePercentage}  />
      </div>
      <div>
        <Table 
  title="Recent Admissions"
  columns={recentStudentColumns}
  data={recentStudents}
/>
      </div>
     </div>
  );
}
