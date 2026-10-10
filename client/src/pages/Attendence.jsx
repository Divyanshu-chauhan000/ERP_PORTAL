import React, { useState, useMemo, useEffect } from "react";
import "../style/attendance.css";

const DUMMY_STUDENTS = [];

const MONTHLY_REPORT = [];

export default function Attendence() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [classFilter, setClassFilter] = useState("All");
  const [sectionFilter, setSectionFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  
  const [students, setStudents] = useState(DUMMY_STUDENTS);
  const [editModal, setEditModal] = useState({ isOpen: false, student: null });
  const [editForm, setEditForm] = useState({ status: "Present", reason: "" });

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchClass = classFilter === "All" || s.classSection.includes(`Class ${classFilter} -`);
      const matchSection = sectionFilter === "All" || s.classSection.includes(`- ${sectionFilter}`);
      const matchStatus = statusFilter === "All" || s.status === statusFilter;
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.toString() === search;
      return matchClass && matchSection && matchStatus && matchSearch;
    });
  }, [students, classFilter, sectionFilter, statusFilter, search]);

  const stats = useMemo(() => {
    const total = students.length;
    const present = students.filter(s => s.status === "Present").length;
    const absent = students.filter(s => s.status === "Absent").length;
    const leave = students.filter(s => s.status === "Leave").length;
    return { total, present, absent, leave, presentPct: Math.round((present/total)*100), absentPct: Math.round((absent/total)*100) };
  }, [students]);

  const lowAttendanceStudents = useMemo(() => {
    return [...students].filter(s => s.overallAttendance < 75).sort((a,b) => a.overallAttendance - b.overallAttendance).slice(0, 5);
  }, [students]);

  const openEditModal = (student) => {
    setEditModal({ isOpen: true, student });
    setEditForm({ status: student.status === "Not Marked" ? "Present" : student.status, reason: "" });
  };

  const saveEdit = () => {
    setStudents(students.map(s => s.id === editModal.student.id ? { ...s, status: editForm.status, timeMarked: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), markedBy: "Admin" } : s));
    setEditModal({ isOpen: false, student: null });
  };

  return (
    <div className="attendance-page">
      {/* 1. Header */}
      <header className="admin-welcome" style={{ padding: '24px', border: '1px solid #e2e8f0', borderLeft: '4px solid #2563eb', borderRadius: '8px', background: '#fff', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="admin-eyebrow" style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Operations</p>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>Attendance</h1>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#64748b' }}>Monitor and manage daily attendance for all classes.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <input type="date" className="date-picker" value={date} onChange={(e) => setDate(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
          <div className="attendance-header-actions">
            <button className="btn-minimal" onClick={() => alert("Downloading CSV...")}>Export</button>
            <button className="btn-primary" onClick={() => alert("Quick Mark mode enabled")}>Mark Attendance</button>
          </div>
        </div>
      </header>

      {/* 2. Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-card-title">Total Students</div>
          <div className="summary-card-value">{stats.total}</div>
          <div className="summary-card-subtext">Registered</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-title">Present Today</div>
          <div className="summary-card-value">{stats.present} <span style={{fontSize:'16px', color:'#166534'}}>({stats.presentPct}%)</span></div>
          <div className="summary-card-subtext">Marked present</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-title">Absent Today</div>
          <div className="summary-card-value">{stats.absent} <span style={{fontSize:'16px', color:'#b91c1c'}}>({stats.absentPct}%)</span></div>
          <div className="summary-card-subtext">Marked absent</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-title">On Leave Today</div>
          <div className="summary-card-value">{stats.leave}</div>
          <div className="summary-card-subtext">Approved leaves</div>
        </div>
      </div>

      {/* 3. Filters Bar */}
      <div className="filters-bar">
        <select className="filter-select" value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
          <option value="All">All Classes</option>
          {Array.from({length: 12}).map((_, i) => <option key={i+1} value={i+1}>Class {i+1}</option>)}
        </select>
        <select className="filter-select" value={sectionFilter} onChange={(e) => setSectionFilter(e.target.value)}>
          <option value="All">All Sections</option>
          {["A", "B", "C", "D"].map(s => <option key={s} value={s}>Section {s}</option>)}
        </select>
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Leave">Leave</option>
          <option value="Not Marked">Not Marked</option>
        </select>
        <input type="text" className="filter-search" placeholder="Search by name or roll number..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* 4. Student Attendance Table */}
      <div className="minimal-table-container">
        <table className="minimal-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}><input type="checkbox" /></th>
              <th>Roll No.</th>
              <th>Student Name</th>
              <th>Class-Section</th>
              <th>Status</th>
              <th>Time Marked</th>
              <th>Marked By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? filteredStudents.slice(0, 20).map(s => (
              <tr key={s.id}>
                <td><input type="checkbox" /></td>
                <td>{s.rollNo}</td>
                <td><span className="link-primary">{s.name}</span></td>
                <td>{s.classSection}</td>
                <td>
                  <span className={`status-badge status-${s.status.toLowerCase().replace(" ", "")}`}>
                    {s.status}
                  </span>
                </td>
                <td>{s.timeMarked}</td>
                <td>{s.markedBy}</td>
                <td>
                  <span className="link-primary" onClick={() => openEditModal(s)}>Edit</span>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={8} style={{textAlign: 'center', padding: '24px'}}>No students found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 5 & 6. Bottom Layout */}
      <div className="bottom-sections">
        {/* Low Attendance Alert */}
        <div className="section-card">
          <h3>Low Attendance Alert (&lt; 75%)</h3>
          <table className="minimal-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Percentage</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {lowAttendanceStudents.map(s => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.classSection}</td>
                  <td style={{color: '#b91c1c', fontWeight: '500'}}>{s.overallAttendance}%</td>
                  <td><span className="link-primary">View Profile</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Monthly Class Report */}
        <div className="section-card">
          <h3>Monthly Class Report</h3>
          <table className="minimal-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Section</th>
                <th>Avg %</th>
                <th>Below 75%</th>
              </tr>
            </thead>
            <tbody>
              {MONTHLY_REPORT.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.class}</td>
                  <td>{r.section}</td>
                  <td>{r.avgAttendance}%</td>
                  <td>{r.studentsBelow75} Students</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. Footer Note */}
      <div className="footer-note">
        Attendance can be edited for the last 7 days only. Changes are logged for audit.
      </div>

      {/* Edit Modal */}
      {editModal.isOpen && (
        <div className="minimal-modal-overlay">
          <div className="minimal-modal">
            <div className="minimal-modal-header">
              <h3>Edit Attendance - {editModal.student.name}</h3>
            </div>
            <div className="minimal-modal-body">
              <div className="form-group">
                <label>Status</label>
                <select className="form-control" value={editForm.status} onChange={e => setEditForm({...editForm, status: e.target.value})}>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Leave">Leave</option>
                </select>
              </div>
              <div className="form-group">
                <label>Reason / Note</label>
                <input type="text" className="form-control" placeholder="Optional" value={editForm.reason} onChange={e => setEditForm({...editForm, reason: e.target.value})} />
              </div>
            </div>
            <div className="minimal-modal-footer">
              <button className="btn-minimal" onClick={() => setEditModal({ isOpen: false, student: null })}>Cancel</button>
              <button className="btn-primary" onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
