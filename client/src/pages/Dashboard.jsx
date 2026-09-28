import React, { useEffect, useState } from "react";
import "./../style/dashboard.css";
import { NavLink } from "react-router-dom";
import StatsCard from "../components/StatsCard";
import api from "../api/axios";
import Table from "../components/Table";


export default function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalFeesCollected: 0,
    totalFeesBalance: 0,
    totalAttendencePercentage: 0,
  });

  const [tableData, setTableData] = useState({
    recentStudents: [],
  });

  const recentStudentColumns = [
    { key: "student_id", label: "ID" },
    { key: "student_name", label: "Name" },
    { key: "class_name", label: "Class" },
    { key: "class_section", label: "Section" },
    { key: "student_admission_date", label: "Date" },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [students, teachers, collected, pending, attendence] =
          await Promise.all([
            api.get("/students/total-students"),
            api.get("/teachers/total-teachers"),
            api.get("/fees/totalcollected"),
            api.get("/fees/feesbalance"),
            api.get("/attendence/overAllAttendence"),
          ]);
        console.log("Students : ", students.data);
        console.log("Total student count : ", students.data.total_students);

        const recentStudentRes = await api.get(
          "/students/with-class?page=1&limit=5",
        );
        console.log(recentStudentRes);

        setTableData({
          recentStudents : recentStudentRes.data
        })

        setStats({
          totalStudents: students.data[0].total_students,
          totalTeachers: teachers.data[0].total_teacher,
          totalFeesCollected: collected.data[0].total_collected_fees || 0,
          totalFeesBalance: pending.data[0].balance_fees || 0,
          totalAttendencePercentage: attendence.data[0].attendence_percentage,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchStats();
  }, []);
  return (
    <div className="dashboard">
      <h2>Overview</h2>
      <div className="stats-grid">
        <StatsCard title="Total Students" value={stats.totalStudents} />
        <StatsCard title="Total Teachers" value={stats.totalTeachers} />
        <StatsCard title="Fees Collected" value={stats.totalFeesCollected} />
        <StatsCard title="Fees Pending" value={stats.totalFeesBalance} />
        <StatsCard
          title="Attendence %"
          value={stats.totalAttendencePercentage}
        />
      </div>
      <div style={{ width: "50%" }}>
        <Table
          title="Recent Admissions"
          columns={recentStudentColumns}
          data={tableData.recentStudents}
        />
      </div>
    </div>
  );
}
