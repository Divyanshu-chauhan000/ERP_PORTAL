import React, { useState } from 'react'
import { FaCalendarCheck, FaTrophy, FaFileAlt } from "react-icons/fa";
import Table from "./../components/Table";
import './../style/studentExam.css'
function StudentExams() {

  const [activeTab , setActiveTab] = useState('upcoming');
  const [examTypeFilter , setExamTypeFilter] = useState('All');


  const [resultClassFilter , setResultClassFilter] = useState('All');
  const [resultTypeFilter , setResultTypeFilter] = useState('All');

  const upcomingExams = [
    { id: 1, subject: "Mathematics", date: "28-05-2025", time: "10:00 AM - 01:00 PM", syllabus: "Ch 1 to 5, Algebra", type: "Mid Term" },
    { id: 2, subject: "Science", date: "30-05-2025", time: "10:00 AM - 01:00 PM", syllabus: "Physics & Chemistry Basics", type: "Mid Term" },
    { id: 3, subject: "English", date: "05-06-2025", time: "10:00 AM - 12:30 PM", syllabus: "Grammar & Literature", type: "PT 1" }
  ];  

  const pastResults = [
    { id: 1, subject: "English", maxMarks: 100, obtained: 85, grade: "A", status: "Pass", class: "Class 8", type: "Mid Term" },
    { id: 2, subject: "Hindi", maxMarks: 100, obtained: 78, grade: "B+", status: "Pass", class: "Class 8", type: "Mid Term" },
    { id: 3, subject: "Computer", maxMarks: 50, obtained: 48, grade: "A+", status: "Pass", class: "Class 7", type: "Final Exam" },
    { id: 4, subject: "Mathematics", maxMarks: 100, obtained: 32, grade: "D", status: "Fail", class: "Class 8", type: "PT 1" }
  ];

    const upcomingColumns = [
    { key: 'subject', label: 'Subject', render: (row) => <strong>{row.subject}</strong> },
    { 
      key: 'dateTime', 
      label: 'Date & Time', 
      render: (row) => (
        <div className="date-time">
          <span className="exam-date">{row.date}</span>
          <span className="exam-time">{row.time}</span>
        </div>
      )
    },
    { key: 'type', label: 'Exam Type', render: (row) => <span className="exam-type-badge">{row.type}</span> },
    { key: 'syllabus', label: 'Syllabus', render: (row) => <span className="syllabus-text">{row.syllabus}</span> }
  ];

  const pastColumns = [
    { key: 'subject', label: 'Subject', render: (row) => <strong>{row.subject}</strong> },
    { key: 'classType', label: 'Class & Type', render: (row) => <span className="exam-type-badge">{row.class} - {row.type}</span> },
    { key: 'maxMarks', label: 'Max Marks' },
    { key: 'obtained', label: 'Obtained Marks', render: (row) => <strong>{row.obtained}</strong> },
    { 
      key: 'grade', 
      label: 'Grade', 
      render: (row) => <span className={`grade-badge grade-${row.grade.charAt(0).toLowerCase()}`}>{row.grade}</span> 
    },
    { 
      key: 'status', 
      label: 'Status', 
      render: (row) => <span className={`status-badge ${row.status === 'Pass' ? 'pass' : 'fail'}`}>{row.status}</span> 
    }
  ];


  return (
    <div className='exams-container'>

      <div className='page-header'>
        <h2>My Exams & Results </h2>
        <p>View your upcoming exam schedule and past performance. </p>
      </div>

      <div className='tabs-container'>
         <button className={`tab-btn ${activeTab === 'upcoming' ? 'active' : " "}`} onClick={() => setActiveTab('upcoming')}>
          <FaCalendarCheck />
         </button>

                 <button className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`} onClick={() => setActiveTab('results')}>
          <FaTrophy /> Past Results
        </button>
      </div>

      {
        activeTab === 'upcoming' && (
          <div className='exam-card'> 
               <div className='card-header' style={{ justifyContent : "space-between" , flexWrap : "wrap"}}>
                <div style={{display : 'flex' , alignItems : 'center' , gap:'12px'}}> 
                                <FaFileAlt className="card-icon blue-icon" />
              <h3>Upcoming Exam Schedule</h3>
                  </div>

                  <select className='exam-filter-select' value={examTypeFilter} onChange={(e) => setExamTypeFilter(e.target.value)}>
                     <option value="All">All Exams</option>
              <option value="PT 1">PT 1</option>
              <option value="PT 2">PT 2</option>
              <option value="Mid Term">Mid Term</option>
              <option value="Final Exam">Final Exam</option>
                    </select> 
        
               </div>
          <div className="table-responsive">
            <Table 
              columns={upcomingColumns} 
              data={upcomingExams.filter(exam => examTypeFilter === 'All' || exam.type === examTypeFilter)}
              viewLink="#"
            />
          </div>


          </div>
        )
      }

      {activeTab === 'results' && (
        <div className="exam-card">
          <div className="card-header" style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FaTrophy className="card-icon orange-icon" />
              <h3>Exam Results</h3>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <select 
                className="exam-filter-select"
                value={resultClassFilter} 
                onChange={(e) => setResultClassFilter(e.target.value)}
              >
                <option value="All">All Classes</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
              </select>
              <select 
                className="exam-filter-select"
                value={resultTypeFilter} 
                onChange={(e) => setResultTypeFilter(e.target.value)}
              >
                <option value="All">All Exams</option>
                <option value="PT 1">PT 1</option>
                <option value="Mid Term">Mid Term</option>
                <option value="Final Exam">Final Exam</option>
              </select>
            </div>
          </div>
          <div className="table-responsive">
            <Table 
              columns={pastColumns} 
              data={pastResults.filter(res => 
                (resultClassFilter === 'All' || res.class === resultClassFilter) &&
                (resultTypeFilter === 'All' || res.type === resultTypeFilter)
              )}
              viewLink="#"
            />
          </div>
        </div>
      )}
       
    </div>
  );
}

export default StudentExams
