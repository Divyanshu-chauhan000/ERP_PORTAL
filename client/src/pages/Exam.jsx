import React, { useState, useMemo, useEffect } from "react";
import "../style/attendance.css";

// --- Massive Dummy Data ---
const EXAM_GROUPS = [];

const TIMETABLE = [];

const MARKS_DATA = [];

const RESULTS_DATA = [];

export default function Exam() {
  const [session, setSession] = useState("2026-27");
  const [activeTab, setActiveTab] = useState("Overview");

  // State for modules
  const [schedule, setSchedule] = useState(TIMETABLE);
  const [marks, setMarks] = useState(MARKS_DATA);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [autoSaveMsg, setAutoSaveMsg] = useState("");

  const handleMarkChange = (id, val) => {
    setMarks(marks.map(m => m.id === id ? { ...m, marks: val } : m));
    setAutoSaveMsg("Saving...");
    setTimeout(() => setAutoSaveMsg("Saved just now"), 1000);
  };

  const renderOverview = () => (
    <div>
      <header className="admin-welcome" style={{ padding: '24px', border: '1px solid #e2e8f0', borderLeft: '4px solid #2563eb', borderRadius: '8px', background: '#fff', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="admin-eyebrow" style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Academics</p>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>Exams Overview</h1>
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#64748b' }}>Complete exam management, scheduling, and result publishing.</p>
        </div>
      </header>
      <div className="summary-cards">
        <div className="summary-card"><div className="summary-card-title">Upcoming Exams</div><div className="summary-card-value">12</div></div>
        <div className="summary-card"><div className="summary-card-title">Ongoing Today</div><div className="summary-card-value" style={{color:'#d97706'}}>4</div></div>
        <div className="summary-card"><div className="summary-card-title">Completed</div><div className="summary-card-value" style={{color:'#166534'}}>34</div></div>
        <div className="summary-card"><div className="summary-card-title">Results Pending</div><div className="summary-card-value" style={{color:'#b91c1c'}}>2</div></div>
      </div>
      
      <div className="bottom-sections">
        <div className="section-card">
          <h3>Next 7 Days Schedule</h3>
          <table className="minimal-table">
            <thead><tr><th>Date</th><th>Exam</th><th>Class</th><th>Subject</th><th>Time</th></tr></thead>
            <tbody>
              {schedule.slice(0, 5).map(s => (
                <tr key={s.id}><td>{s.date}</td><td>Mid-Term</td><td>{s.classSection}</td><td>{s.subject}</td><td>{s.time}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="section-card" style={{ borderLeft: '4px solid #b91c1c' }}>
          <h3>Action Needed</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}><span className="clash-warning" style={{marginLeft:0, marginRight: '8px'}}>!</span> 2 Clashes found in Timetable <span className="link-primary" style={{float: 'right'}}>Resolve</span></li>
            <li style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}><span style={{color: '#b91c1c', fontWeight: 'bold', marginRight: '8px'}}>•</span> Marks missing for Class 10 - A (Science) <span className="link-primary" style={{float: 'right'}}>Enter Marks</span></li>
            <li style={{ padding: '12px 0' }}><span style={{color: '#059669', fontWeight: 'bold', marginRight: '8px'}}>•</span> Unit Test 1 results ready to publish <span className="link-primary" style={{float: 'right'}}>Publish</span></li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderExamSetup = () => (
    <div>
      <div className="attendance-header">
        <div className="attendance-header-left"><h1>Exam Setup</h1></div>
        <button className="btn-primary" onClick={() => alert("Opening 2-step form...")}>New Exam Group</button>
      </div>
      <div className="minimal-table-container">
        <table className="minimal-table">
          <thead><tr><th>Name</th><th>Type</th><th>Classes</th><th>Date Range</th><th>Subjects</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {EXAM_GROUPS.map(g => (
              <tr key={g.id}>
                <td><strong>{g.name}</strong></td><td>{g.type}</td><td>{g.classes}</td><td>{g.dateRange}</td><td>{g.subjects}</td>
                <td>
                  <span className={`status-badge`} style={g.status === "Results Published" ? {background: '#dcfce7', color: '#166534'} : g.status === "Ongoing" ? {background: '#fef3c7', color: '#b45309'} : {background: '#f1f5f9', color: '#475569'}}>{g.status}</span>
                </td>
                <td><span className="link-primary">Details</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTimetable = () => (
    <div>
      <div className="attendance-header">
        <div className="attendance-header-left"><h1>Timetable (Scheduling)</h1></div>
        <div className="attendance-header-actions">
          <button className="btn-minimal" onClick={() => alert("Publishing schedule...")}>Publish Schedule</button>
          <button className="btn-primary" onClick={() => setSidePanelOpen(true)}>Add Exam Slot</button>
        </div>
      </div>
      
      <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 16px', borderRadius: '6px', color: '#b91c1c', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><strong>2 clashes found</strong> (Teacher/Room double-booked at the same time).</div>
        <button className="btn-minimal" style={{ borderColor: '#fecaca', color: '#b91c1c' }}>Resolve Clashes</button>
      </div>

      <div className="filters-bar">
        <select className="filter-select"><option>Mid-Term</option></select>
        <select className="filter-select"><option>All Classes</option></select>
        <select className="filter-select"><option>List View</option><option>Grid View</option></select>
      </div>

      <div className="minimal-table-container">
        <table className="minimal-table">
          <thead><tr><th>Date</th><th>Time</th><th>Class-Section</th><th>Subject</th><th>Room</th><th>Invigilator</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {schedule.map(s => (
              <tr key={s.id} style={s.clash ? { backgroundColor: '#fef2f2' } : {}}>
                <td>{s.date}</td><td>{s.time}</td><td>{s.classSection}</td><td>{s.subject}</td>
                <td>{s.room}</td>
                <td>{s.invigilator} {s.clash && <span className="clash-warning" title="Teacher double-booked!">!</span>}</td>
                <td><span className="status-badge" style={s.status === "Ongoing" ? {background: '#fef3c7', color: '#b45309'} : {background: '#dbeafe', color: '#1e40af'}}>{s.status}</span></td>
                <td><span className="link-primary" onClick={() => setSidePanelOpen(true)}>Edit</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Side Panel for Add/Edit Slot */}
      {sidePanelOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', background: '#fff', boxShadow: '-5px 0 15px rgba(0,0,0,0.1)', zIndex: 1000, padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
            <h2 style={{ margin: 0, fontSize: '20px' }}>Add/Edit Exam Slot</h2>
            <span style={{ cursor: 'pointer', fontSize: '24px' }} onClick={() => setSidePanelOpen(false)}>×</span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div className="form-group"><label>Date</label><input type="date" className="form-control" defaultValue="2026-09-15" /></div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div className="form-group" style={{ flex: 1 }}><label>Start Time</label><input type="time" className="form-control" defaultValue="09:00" /></div>
              <div className="form-group" style={{ flex: 1 }}><label>End Time</label><input type="time" className="form-control" defaultValue="12:00" /></div>
            </div>
            <div className="form-group"><label>Class</label><select className="form-control"><option>Class 10</option></select></div>
            <div className="form-group"><label>Section</label><select className="form-control"><option>A</option></select></div>
            <div className="form-group"><label>Subject</label><select className="form-control"><option>Mathematics</option></select></div>
            <div className="form-group"><label>Room</label><input type="text" className="form-control" defaultValue="Room 101" /></div>
            <div className="form-group"><label>Invigilator</label><input type="text" className="form-control" defaultValue="Priya Singh" /></div>
            <div className="form-group"><label>Max Marks</label><input type="number" className="form-control" defaultValue="100" /></div>
          </div>
          <div style={{ display: 'flex', gap: '12px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
            <button className="btn-minimal" style={{ flex: 1 }} onClick={() => setSidePanelOpen(false)}>Cancel</button>
            <button className="btn-primary" style={{ flex: 1 }} onClick={() => { alert("Slot saved!"); setSidePanelOpen(false); }}>Save Slot</button>
          </div>
        </div>
      )}
    </div>
  );

  const renderMarksEntry = () => {
    const entered = marks.filter(m => m.marks !== "").length;
    const total = marks.length;
    const pct = Math.round((entered / total) * 100);

    return (
      <div>
        <div className="attendance-header">
          <div className="attendance-header-left"><h1>Marks Entry</h1></div>
        </div>
        
        <div className="filters-bar" style={{ flexWrap: 'wrap' }}>
          <select className="filter-select"><option>Mid-Term</option></select>
          <select className="filter-select"><option>Class 10</option></select>
          <select className="filter-select"><option>Section A</option></select>
          <select className="filter-select"><option>Mathematics</option></select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '13px', color: '#475569', marginBottom: '4px' }}>Marks entered: {entered} of {total} ({pct}%)</div>
            <div style={{ width: '300px', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: '#2563eb' }}></div>
            </div>
          </div>
          <div style={{ fontSize: '13px', color: '#059669', fontStyle: 'italic' }}>{autoSaveMsg}</div>
        </div>

        <div className="minimal-table-container">
          <table className="minimal-table">
            <thead><tr><th>Roll No.</th><th>Student Name</th><th>Marks</th><th>Max Marks</th><th>Grade</th><th>Absent</th><th>Remarks</th></tr></thead>
            <tbody>
              {marks.map(m => (
                <tr key={m.id}>
                  <td>{m.rollNo}</td>
                  <td>{m.name}</td>
                  <td>
                    <input type="number" className="form-control" style={{ width: '80px', padding: '6px', border: m.marks > m.maxMarks ? '1px solid #dc2626' : '1px solid #cbd5e1' }} value={m.marks} onChange={(e) => handleMarkChange(m.id, e.target.value)} disabled={m.absent} placeholder="--" />
                  </td>
                  <td style={{ color: '#64748b' }}>{m.maxMarks}</td>
                  <td style={{ fontWeight: '500' }}>{m.marks === "" ? "-" : m.marks >= 90 ? "A+" : m.marks >= 75 ? "A" : "B"}</td>
                  <td><input type="checkbox" checked={m.absent} onChange={() => setMarks(marks.map(x => x.id === m.id ? { ...x, absent: !x.absent, marks: x.absent ? "" : "0" } : x))} /></td>
                  <td><input type="text" className="form-control" style={{ padding: '6px' }} placeholder="Optional note" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderResults = () => (
    <div>
      <div className="attendance-header">
        <div className="attendance-header-left">
          <h1>Results & Publishing</h1>
          <span className="status-badge" style={{ background: '#fef3c7', color: '#b45309', marginLeft: '12px' }}>Ready to publish</span>
        </div>
        <button className="btn-primary" onClick={() => { if(window.confirm("Publish results for Class 10 - A?\n\nTotal Students: 15\nPass: 100%")) alert("Published successfully and locked."); }}>Publish Results</button>
      </div>

      <div className="filters-bar">
        <select className="filter-select"><option>Mid-Term</option></select>
        <select className="filter-select"><option>Class 10</option></select>
        <select className="filter-select"><option>Section A</option></select>
      </div>

      <div className="admin-stats" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '24px' }}>
        <div className="admin-stat"><span>Total Students</span><strong>15</strong></div>
        <div className="admin-stat stat-good"><span>Passed</span><strong>15</strong></div>
        <div className="admin-stat stat-danger"><span>Failed</span><strong style={{color:'#dc2626'}}>0</strong></div>
        <div className="admin-stat"><span>Pass %</span><strong>100%</strong></div>
        <div className="admin-stat"><span>Class Topper</span><strong>Priya 0 (415)</strong></div>
      </div>

      <div className="minimal-table-container">
        <table className="minimal-table">
          <thead><tr><th>Roll No.</th><th>Name</th><th>Sub 1</th><th>Sub 2</th><th>Sub 3</th><th>Sub 4</th><th>Sub 5</th><th>Total</th><th>%</th><th>Grade</th><th>Rank</th><th>Result</th></tr></thead>
          <tbody>
            {RESULTS_DATA.map(r => (
              <tr key={r.id}>
                <td>{r.rollNo}</td>
                <td><span className="link-primary">{r.name}</span></td>
                {r.marks.map((m, idx) => <td key={idx}>{m}</td>)}
                <td><strong>{r.total}</strong></td>
                <td>{r.pct}%</td>
                <td><strong>{r.grade}</strong></td>
                <td>{r.rank}</td>
                <td><span className="status-badge" style={{background: '#dcfce7', color: '#166534'}}>{r.result}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="footer-note">Results can be published only after all marks are entered. Published results are locked.</div>
    </div>
  );

  const renderReports = () => (
    <div>
      <div className="attendance-header">
        <div className="attendance-header-left"><h1>Exam Reports</h1></div>
      </div>
      <div className="bottom-sections" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {["Exam Schedule", "Marksheets (Bulk)", "Class-wise Result Analysis", "Subject-wise Performance", "Failed Students List"].map((title, i) => (
          <div className="section-card" key={i}>
            <h3 style={{ marginBottom: '8px' }}>{title}</h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px', lineHeight: '1.4' }}>Download {title.toLowerCase()} for the selected session and exam group.</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-minimal" style={{ fontSize: '12px', padding: '6px 10px' }}>PDF</button>
              <button className="btn-minimal" style={{ fontSize: '12px', padding: '6px 10px' }}>CSV</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      
      {/* Left Sub-Menu Navbar */}
      <div style={{ width: '240px', background: '#fff', borderRight: '1px solid #e2e8f0', padding: '24px 0' }}>
        <div style={{ padding: '0 24px', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>Exams Module</h2>
          <select className="date-picker" style={{ width: '100%', marginTop: '12px' }} value={session} onChange={(e) => setSession(e.target.value)}>
            <option value="2025-26">Session 2025-26</option>
            <option value="2026-27">Session 2026-27</option>
          </select>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {["Overview", "Exam Setup", "Timetable", "Marks Entry", "Results & Publishing", "Reports"].map(menu => (
            <li key={menu}>
              <button 
                onClick={() => setActiveTab(menu)}
                style={{ width: '100%', textAlign: 'left', padding: '12px 24px', border: 'none', background: activeTab === menu ? '#eff6ff' : 'transparent', color: activeTab === menu ? '#2563eb' : '#475569', fontWeight: activeTab === menu ? '600' : '500', fontSize: '14px', cursor: 'pointer', borderRight: activeTab === menu ? '3px solid #2563eb' : '3px solid transparent' }}
              >
                {menu}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto', height: '100vh', boxSizing: 'border-box' }}>
        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>Exams / <span style={{ color: '#0f172a', fontWeight: '500' }}>{activeTab}</span></div>
        
        {activeTab === "Overview" && renderOverview()}
        {activeTab === "Exam Setup" && renderExamSetup()}
        {activeTab === "Timetable" && renderTimetable()}
        {activeTab === "Marks Entry" && renderMarksEntry()}
        {activeTab === "Results & Publishing" && renderResults()}
        {activeTab === "Reports" && renderReports()}
      </div>
    </div>
  );
}
