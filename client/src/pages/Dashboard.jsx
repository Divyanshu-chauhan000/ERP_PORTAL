import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaUsers,
  FaChalkboardTeacher,
  FaRupeeSign,
  FaExclamationTriangle,
  FaMoneyCheckAlt,
  FaRegBell,
} from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import "./../style/dashboard.css";
import api from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();
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

        const recentStudentRes = await api.get(
          "/students/with-class?page=1&limit=5",
        );

        setTableData({
          recentStudents: recentStudentRes.data,
        });

        setStats({
          totalStudents: students.data[0]?.total_students || 0,
          totalTeachers: teachers.data[0]?.total_teacher || 0,
          totalFeesCollected: collected.data[0]?.total_collected_fees || 0,
          totalFeesBalance: pending.data[0]?.balance_fees || 0,
          totalAttendencePercentage: attendence.data[0]?.attendence_percentage || 0,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchStats();
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Calculate health
  const attendanceIsLow = stats.totalAttendencePercentage < 75;
  const highPendingFees = stats.totalFeesBalance > 50000;

  return (
    <main className="admin-page">
      <header className="admin-welcome">
        <div>
          <p className="admin-eyebrow">{today}</p>
          <h1>Good morning, Admin</h1>
          <p>Welcome to your control center. Here's what's happening today.</p>
        </div>
        <div className="admin-subject-badge">
          <span className="admin-avatar">AD</span>
          <span>
            System Administrator
            <br />
            Management
          </span>
        </div>
      </header>

      {/* Very User Friendly Big Quick Actions */}
      <div className="admin-quick-actions-bar">
        <button onClick={() => navigate("/students")} className="quick-action-btn primary">
          <div className="qa-icon"><FaUserPlus /></div>
          <div className="qa-text">
            <strong>Add New Student</strong>
            <small>Enroll a student</small>
          </div>
        </button>
        <button onClick={() => navigate("/fees")} className="quick-action-btn success">
          <div className="qa-icon"><FaMoneyCheckAlt /></div>
          <div className="qa-text">
            <strong>Collect Fees</strong>
            <small>Record a payment</small>
          </div>
        </button>
        <button onClick={() => navigate("/teachers")} className="quick-action-btn warning">
          <div className="qa-icon"><FaChalkboardTeacher /></div>
          <div className="qa-text">
            <strong>Manage Teachers</strong>
            <small>View staff directory</small>
          </div>
        </button>
      </div>

      <section className="admin-stats" aria-label="School overview">
        <div className="admin-stat">
          <span>Total Students</span>
          <strong>{stats.totalStudents}</strong>
          <small>Enrolled across all classes</small>
        </div>
        <div className="admin-stat">
          <span>Total Teachers</span>
          <strong>{stats.totalTeachers}</strong>
          <small>Active faculty members</small>
        </div>
        <div className="admin-stat stat-good">
          <span>Fees Collected</span>
          <strong>₹ {stats.totalFeesCollected}</strong>
          <small>Current academic year</small>
        </div>
        <div className={`admin-stat ${highPendingFees ? 'stat-danger' : ''}`}>
          <span>Fees Pending</span>
          <strong>₹ {stats.totalFeesBalance}</strong>
          <small>Outstanding dues</small>
        </div>
        <div className={`admin-stat ${attendanceIsLow ? 'stat-danger' : 'stat-good'}`}>
          <span>Overall Attendance</span>
          <strong>{stats.totalAttendencePercentage}%</strong>
          <small>Average student presence</small>
        </div>
      </section>

      <div className="admin-dashboard-grid">
        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Recent Admissions</h2>
              <p>Newly enrolled students</p>
            </div>
            <button
              type="button"
              className="admin-link-button"
              onClick={() => navigate("/students")}
            >
              View all <FaArrowRight />
            </button>
          </div>
          <div className="admin-schedule-list">
            {tableData.recentStudents.length > 0 ? (
              tableData.recentStudents.map((student) => (
                <div className="admin-schedule-row" key={student.student_id}>
                  <span className="admin-time">
                    <FaUserPlus /> {student.student_id}
                  </span>
                  <div>
                    <strong>{student.student_name}</strong>
                    <small>
                      Class {student.class_name} - {student.class_section} · Admitted on {new Date(student.student_admission_date).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              ))
            ) : (
              <p className="admin-empty">No recent admissions found.</p>
            )}
          </div>
        </section>

        <div>
          <section className="admin-panel" style={{marginBottom: "15px"}}>
            <div className="admin-panel-heading">
              <div>
                <h2>Needs Attention</h2>
                <p>System alerts & updates</p>
              </div>
            </div>
            {attendanceIsLow ? (
              <div className="attention-item">
                <FaExclamationTriangle className="attention-icon" />
                <div className="attention-content">
                  <strong>Low Overall Attendance</strong>
                  <p>Attendance has dropped below 75%. Consider checking the attendance registers.</p>
                </div>
              </div>
            ) : null}
            
            {highPendingFees ? (
              <div className="attention-item warning">
                <FaRegBell className="attention-icon" />
                <div className="attention-content">
                  <strong>High Pending Fees</strong>
                  <p>Total pending fees is over ₹50,000. It is recommended to send fee reminders.</p>
                </div>
              </div>
            ) : null}

            {!attendanceIsLow && !highPendingFees && (
              <p className="admin-empty" style={{padding: "10px 0"}}>All systems are looking good! No pending alerts.</p>
            )}
          </section>

          <section className="admin-panel">
            <div className="admin-panel-heading">
              <div>
                <h2>Quick Shortcuts</h2>
                <p>Frequent admin tasks</p>
              </div>
            </div>
            <button
              type="button"
              className="admin-action-row"
              onClick={() => navigate("/students")}
            >
              <span className="admin-action-icon students">
                <FaUsers />
              </span>
              <span>
                <strong>Manage Students</strong>
                <small>View, add, or edit student details</small>
              </span>
              <FaArrowRight className="admin-action-arrow" />
            </button>
            <button
              type="button"
              className="admin-action-row"
              onClick={() => navigate("/teachers")}
            >
              <span className="admin-action-icon teachers">
                <FaChalkboardTeacher />
              </span>
              <span>
                <strong>Manage Teachers</strong>
                <small>Directory and assignments</small>
              </span>
              <FaArrowRight className="admin-action-arrow" />
            </button>
            <button
              type="button"
              className="admin-action-row"
              onClick={() => navigate("/fees")}
            >
              <span className="admin-action-icon fees">
                <FaRupeeSign />
              </span>
              <span>
                <strong>Fee Collection</strong>
                <small>Process payments and dues</small>
              </span>
              <FaArrowRight className="admin-action-arrow" />
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}
