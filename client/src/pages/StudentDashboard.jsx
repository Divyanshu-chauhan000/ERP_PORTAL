import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios';
import StatsCard from '../components/StatsCard'
import { FaCalendarCheck } from "react-icons/fa6";
import { MdOutlineAttachMoney, MdPerson3 } from "react-icons/md";
import { IoIosPaper } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaChartBar } from "react-icons/fa6";
import { CiWarning } from "react-icons/ci";
import './../style/StudentDashboard.css'

function StudentDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decode = jwtDecode(token);
  const studentId = decode.student_id;


  const [stats, setStats] = useState({
    totalExams: 0,
    averageMarks: 0,
    feePending: 0,
    attendencePercentage: 0
  });

  const [profile, setProfile] = useState({});



  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [exams, fees, attendance, profileRes] = await Promise.all(
          [
            api.get(`/exam/myExams/${studentId}`),
            api.get(`/fees?student_id=${studentId}`),
            api.get(`/attendence?student_id=${studentId}`),
            api.get(`/students/profile/${studentId}`)
          ]
        );


        const examData = exams.data
        const totalMarks = examData.reduce((sum, e) => sum + e.marks, 0);
        const maxMarks = examData.reduce((sum, e) => sum + e.max_marks, 0);
        const avg = maxMarks > 0 ? ((totalMarks / maxMarks) * 100).toFixed(1) : 0


        const feesData = fees.data[0];
        const pending = feesData ? feesData.balance_due : 0;

        const attendanceData = attendance.data[0];
        const attendancePercentage = attendanceData ? attendanceData.attendance_percentage : 0


        setProfile(profileRes.data[0]);
        setStats({
          totalExams: examData.length,
          averageMarks: avg,
          feePending: pending,
          attendencePercentage: attendancePercentage
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchStats();
  }, [])

  const quickLinks = [
    {
      icon: <CgProfile size={32} />,
      label: 'My Profile',
      path: '/student-profile',
      color: '#eff6ff',
      border: '#3b82f6'
    },
    {
      icon: <IoIosPaper size={32} />,
      label: 'My Exams',
      path: '/student-exams',
      color: '#f0fdf4',
      border: '#22c55e'
    },
    {
      icon: <MdOutlineAttachMoney size={32} />,
      label: 'My Fees',
      path: '/student-fees',
      color: '#fefce8',
      border: '#eab308'
    },
    {
      icon: <FaCalendarCheck size={32} />,
      label: 'Attendance',
      path: '/student-attendance',
      color: '#fdf4ff',
      border: '#a855f7'
    }
  ]

  const upcomingExamsDummy = [
    {
      id: 1,
      subject: "Engineering Drawing",
      category: "Unit Test 1",
      date: "2025-05-28",
      time: "10:00 AM - 11:30 AM",
      color: "blue"
    },
    {
      id: 2,
      subject: "Mathematics",
      category: "Mid Term Exam",
      date: "2025-06-02",
      time: "10:00 AM - 1:00 PM",
      color: "green"
    },
    {
      id: 3,
      subject: "Chemistry",
      category: "Practical Exam",
      date: "2025-06-10",
      time: "02:00 PM - 05:00 PM",
      color: "purple"
    }
  ];




  return (
    <div className='student-dashboard'>
      <div className='welcome-banner'>

        <img src="https://img.magnific.com/premium-photo/cute-indian-little-school-boy-standing-school_130568-376.jpg" alt="" />

        <div>
          <h1>Welcome back , {profile.student_name} </h1>
          <p>{profile.class_name} -<span>"{profile.class_section}"</span></p>
        </div>
      </div>
      <div className='stats-grid'>
        <StatsCard title="Total Exams" value={stats.totalExams} color="#3b82f6" icon={<IoIosPaper />} />
        <StatsCard title="Average Marks" value={`${stats.averageMarks}% `} color="#22c55e" icon={<FaChartBar />} />
        <StatsCard title="Fees Pending" value={`₹${stats.feePending}`} color="#f59e0b" icon={<MdOutlineAttachMoney />} />
        <StatsCard title="Attendance" value={`${Number(stats.attendencePercentage).toFixed(1)}%`} color="#8b5cf6" icon={<FaCalendarCheck />} />
      </div>

      {/* exams and link section */}










      <div className='dashboard-content'>
        <div className='content-left'>
          <div className='upcoming-exams'>
            <div className='section-header'>
              <div className='title-with-icon'>
                <FaCalendarCheck className='header-icon blue-icon' />
                <h3>Upcoming Exams</h3>
              </div>
              <span className='view-all' onClick={() => navigate('/student-exams')}>View All</span>
            </div>

            <div className='exam-list'>
              {
                upcomingExamsDummy.map((exam) => {
                  const dateObj = new Date(exam.date);
                  const day = dateObj.getDate().toString().padStart(2, '0');

                  const month = dateObj.toLocaleString('default', { month: "short" }).toUpperCase();

                  return (
                    <div key={exam.id} className='exam-item'>
                      <div className='exam-date'>
                        <span className={`day ${exam.color}-text`}>{day}</span>
                        <span className='month'>{month}</span>
                      </div>
                      <div className='exam-info'>
                        <div className='subject-name'>
                          <MdPerson3 className={`subject-icon ${exam.color}-icon`} />
                          <h4>{exam.subject}</h4>
                        </div>
                        <p>{exam.category}</p>
                      </div>
                      <div className='exam-time'>
                        {exam.time}
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>


        <div className='content-right'>
          <div className='fee-overView'>
            <div className='section-header'>
              <div className='title-with-icon'>
                <MdOutlineAttachMoney className='header-icon orange-icon' />
                <h3>Fee Overview</h3>
              </div>
            </div>
            <div className='fee-content'>
              <p className='fee-subtitle'>Paid vs Pending</p>

              <div className='progress-bar-container'>
                <div className='progress-bar-fill' style={{ width: '87.5%' }}>Rs. 17500 Paid</div>
              </div >
            
            <div className='fee-details'>
              <div className='fee-stat'>
                <span className='dot green-dot'></span>
                <div>
                  <p>Paid</p>
                  <h4>Rs. 17500</h4>
                </div>
              </div>
              <div className='fee-stat text-right'>
                <div>
                  <p><span className='dot orange-dot'></span>  Pending
                  </p>
                  <h4>Rs. 2500 </h4>
                </div>
              </div>
            </div>

            <div className='fee-warning'>
              <CiWarning size={20} />
              <p>Please clear pending fees to avoid any late fee.</p>
            </div>
          </div>
        
     

        <div className='quick-actions-container'>
          <h3 className='quick-title'>Quick Links</h3>
          <div className='quick-links'>
            {
              quickLinks.map((link) => (
                <div key={link.path} className='quickLinksstyle' style={{ backgroundClip: link.color, borderLeft: `4px solid ${link.border}` }} onClick={() => navigate(link.path)}>
                  <span style={{ color: link.border }}>{link.icon}</span>
                  <p style={{ color: link.border }}>{link.label}</p>
                </div>
              ))
            }
          </div>
          </div>

        </div>
      </div>
    </div>



















    </div >
  )
}

export default StudentDashboard


{/* // 1st ED maths
// 2nd chemistry maths  */}