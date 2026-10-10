import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../style/student.css";
import "../style/studentProfile.css";
import getRole from "../utils/getRole";
import { MdDeleteForever, MdEdit, MdSearch, MdClose } from "react-icons/md";
import { IoIosPersonAdd, IoMdFunnel } from "react-icons/io";
import { FaChevronLeft, FaChevronRight, FaUser, FaGraduationCap, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

import api from "../api/axios";

export default function Student() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Modal states
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const itemsPerPage = 10;

  const navigate = useNavigate();
  const role = getRole();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/students/with-class');
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students", error);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((student) => student.student_id !== id));
      setSelectedStudent(null);
    }
  };

  const handleInlineSave = async () => {
    try {
      await api.put(`/students/updatestudent/${selectedStudent.student_id}`, editFormData);
      setStudents(students.map(s => s.student_id === selectedStudent.student_id ? editFormData : s));
      setSelectedStudent(null);
      setIsEditing(false);
      alert("Student Profile updated successfully!");
    } catch (error) {
      console.error("Error updating student", error);
      alert("Failed to update student profile.");
    }
  };

  const classes = useMemo(() => {
    const unique = new Set(students.map(s => s.classSection));
    return ["All", ...Array.from(unique).sort()];
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = 
        (student.student_name && student.student_name.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (student.student_id && student.student_id.toString().includes(searchQuery));
      
      const matchesClass = selectedClass === "All" || student.class_name === selectedClass;
      
      return matchesSearch && matchesClass;
    });
  }, [students, searchQuery, selectedClass]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedClass]);

  const handleInputChange = (field, value) => {
    setEditFormData({ ...editFormData, [field]: value });
  };

  return (
    <main className="admin-page">
      <header className="admin-welcome">
        <div>
          <p className="admin-eyebrow">Directory</p>
          <h1>Student Management</h1>
          <p>View, filter, and manage all enrolled students across classes.</p>
        </div>
        <div className="admin-subject-badge" style={{ background: '#e5effa' }}>
          <span className="admin-avatar">
            <IoIosPersonAdd size={20} />
          </span>
          <span>
            Total Students
            <br />
            <strong>{students.length} Enrolled</strong>
          </span>
        </div>
      </header>

      <section className="admin-panel">
        <div className="table-controls">
          <div className="search-box">
            <MdSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by ID or Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="filter-box">
            <IoMdFunnel className="filter-icon" />
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              <option value="All" disabled style={{display: 'none'}}>Filter by Class</option>
              {classes.map(c => (
                <option key={c} value={c}>{c === "All" ? "All Classes" : c}</option>
              ))}
            </select>
          </div>

          {role === "admin" && (
            <button onClick={() => navigate("/addstudent")} className="add-student-btn">
              <IoIosPersonAdd size={18} /> Add New Student
            </button>
          )}
        </div>

        <div className="table-responsive">
          <table className="beautiful-table clickable-rows">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Gender</th>
                <th>Father's Name</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.length > 0 ? (
                currentStudents.map((student) => (
                  <tr key={student.student_id} onClick={() => { setSelectedStudent(student); setEditFormData(student); setIsEditing(false); }}>
                    <td>
                      <span className="id-badge">#{student.student_id}</span>
                    </td>
                    <td>
                      <strong>{student.student_name || "N/A"}</strong>
                    </td>
                    <td>{student.class_name || "N/A"} - {student.class_section || "N/A"}</td>
                    <td>
                      <span className={`gender-badge ${student.student_gender?.toLowerCase() || 'unknown'}`}>
                        {student.student_gender || 'N/A'}
                      </span>
                    </td>
                    <td>{student.student_father_name || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="empty-state">
                    No students found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 0 && (
          <div className="pagination">
            <span className="page-info">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} entries
            </span>
            <div className="page-buttons">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="page-nav-btn">
                <FaChevronLeft size={12} /> Prev
              </button>
              
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                if (pageNum === 1 || pageNum === totalPages || Math.abs(currentPage - pageNum) <= 1) {
                  return (
                    <button key={i} className={`page-num-btn ${currentPage === pageNum ? "active" : ""}`} onClick={() => handlePageChange(pageNum)}>
                      {pageNum}
                    </button>
                  );
                } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                  return <span key={i} style={{padding: '5px', color: '#888'}}>...</span>;
                }
                return null;
              })}

              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="page-nav-btn">
                Next <FaChevronRight size={12} />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* COMPREHENSIVE EDITABLE MODAL USING STUDENTPROFILE.JSX UI */}
      {selectedStudent && (
        <div className="student-modal-overlay" onClick={() => { setSelectedStudent(null); setIsEditing(false); }}>
          <div className="student-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Student Profile</h2>
              <button className="close-modal-btn" onClick={() => { setSelectedStudent(null); setIsEditing(false); }}>
                <MdClose size={24} />
              </button>
            </div>
            
            <div className="modal-body profile-container" style={{ minHeight: 'auto', padding: '24px' }}>
              <div className="profile-header-card">
                <div className="profile-photo">
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#e5effa', display: 'grid', placeItems: 'center', border: '4px solid #eff6ff' }}>
                    <FaUser size={45} color="#4a6fa5" />
                  </div>
                </div>
                <div className="profile-header-info">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={editFormData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      style={{ fontSize: '26px', fontWeight: 'bold', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '4px 8px', width: '100%', marginBottom: '8px' }}
                    />
                  ) : (
                    <h2>{selectedStudent.fullName}</h2>
                  )}
                  <p className="subtitle">
                    {isEditing ? (
                      <span>
                        Class: <input type="text" style={{ width: '100px', padding: '2px' }} value={editFormData.classSection} onChange={(e) => handleInputChange("classSection", e.target.value)} /> 
                        &nbsp;|&nbsp; Adm No: <input type="text" style={{ width: '100px', padding: '2px' }} value={editFormData.admissionNumber} onChange={(e) => handleInputChange("admissionNumber", e.target.value)} />
                      </span>
                    ) : (
                      <span>Class: {selectedStudent.classSection} &nbsp;|&nbsp; Roll No: {selectedStudent.rollNumber} &nbsp;|&nbsp; Adm No: {selectedStudent.admissionNumber}</span>
                    )}
                  </p>
                  <span className="status-badge">{selectedStudent.status} Student</span>
                </div>
              </div>

              <div className="profile-content-grid">
                
                {/* Personal Details */}
                <div className="profile-card">
                  <div className="card-header">
                    <FaUser className="card-icon blue-icon" />
                    <h3>Personal Details</h3>
                  </div>
                  <div className="card-body">
                    <div className="info-group">
                      <label>Full Name</label>
                      {isEditing ? (
                        <input type="text" value={editFormData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} className="modal-input" />
                      ) : <p>{selectedStudent.fullName}</p>}
                    </div>
                    <div className="info-group">
                      <label>Date of Birth</label>
                      {isEditing ? (
                        <input type="date" value={editFormData.dob} onChange={(e) => handleInputChange("dob", e.target.value)} className="modal-input" />
                      ) : <p>{selectedStudent.dob}</p>}
                    </div>
                    <div className="info-group">
                      <label>Gender</label>
                      {isEditing ? (
                        <select value={editFormData.gender} onChange={(e) => handleInputChange("gender", e.target.value)} className="modal-input">
                          <option>Male</option><option>Female</option><option>Other</option>
                        </select>
                      ) : <p>{selectedStudent.gender}</p>}
                    </div>
                    <div className="info-group">
                      <label>Blood Group</label>
                      {isEditing ? <input type="text" value={editFormData.bloodGroup} onChange={(e) => handleInputChange("bloodGroup", e.target.value)} className="modal-input" /> : <p>{selectedStudent.bloodGroup}</p>}
                    </div>
                    <div className="info-group">
                      <label>Aadhaar Number</label>
                      {isEditing ? <input type="text" value={editFormData.aadhaar} onChange={(e) => handleInputChange("aadhaar", e.target.value)} className="modal-input" /> : <p>{selectedStudent.aadhaar}</p>}
                    </div>
                    <div className="info-group">
                      <label>Religion & Category</label>
                      {isEditing ? (
                        <div style={{display:'flex', gap:'5px'}}><input type="text" style={{width:'50%'}} value={editFormData.religion} onChange={(e) => handleInputChange("religion", e.target.value)} className="modal-input" /><input type="text" style={{width:'50%'}} value={editFormData.category} onChange={(e) => handleInputChange("category", e.target.value)} className="modal-input" /></div>
                      ) : <p>{selectedStudent.religion} / {selectedStudent.category}</p>}
                    </div>
                    <div className="info-group">
                      <label>Mother Tongue</label>
                      {isEditing ? <input type="text" value={editFormData.motherTongue} onChange={(e) => handleInputChange("motherTongue", e.target.value)} className="modal-input" /> : <p>{selectedStudent.motherTongue}</p>}
                    </div>
                    <div className="info-group full-width">
                      <label>Identification Mark</label>
                      {isEditing ? <input type="text" value={editFormData.identificationMark} onChange={(e) => handleInputChange("identificationMark", e.target.value)} className="modal-input" /> : <p>{selectedStudent.identificationMark}</p>}
                    </div>
                  </div>
                </div>

                {/* Academic Details */}
                <div className="profile-card">
                  <div className="card-header">
                    <FaGraduationCap className="card-icon green-icon" />
                    <h3>Academic Details</h3>
                  </div>
                  <div className="card-body">
                    <div className="info-group">
                      <label>Admission Date</label>
                      {isEditing ? <input type="date" value={editFormData.admissionDate} onChange={(e) => handleInputChange("admissionDate", e.target.value)} className="modal-input" /> : <p>{selectedStudent.admissionDate}</p>}
                    </div>
                    <div className="info-group">
                      <label>Board & Medium</label>
                      {isEditing ? (
                        <div style={{display:'flex', gap:'5px'}}><input type="text" style={{width:'50%'}} value={editFormData.board} onChange={(e) => handleInputChange("board", e.target.value)} className="modal-input" /><input type="text" style={{width:'50%'}} value={editFormData.medium} onChange={(e) => handleInputChange("medium", e.target.value)} className="modal-input" /></div>
                      ) : <p>{selectedStudent.board} ({selectedStudent.medium})</p>}
                    </div>
                    <div className="info-group">
                      <label>Stream</label>
                      {isEditing ? <input type="text" value={editFormData.stream} onChange={(e) => handleInputChange("stream", e.target.value)} className="modal-input" /> : <p>{selectedStudent.stream}</p>}
                    </div>
                    <div className="info-group">
                      <label>House / Club</label>
                      {isEditing ? <input type="text" value={editFormData.house} onChange={(e) => handleInputChange("house", e.target.value)} className="modal-input" /> : <p>{selectedStudent.house}</p>}
                    </div>
                    <div className="info-group full-width">
                      <label>Previous School</label>
                      {isEditing ? <input type="text" value={editFormData.previousSchool} onChange={(e) => handleInputChange("previousSchool", e.target.value)} className="modal-input" /> : <p>{selectedStudent.previousSchool}</p>}
                    </div>
                  </div>
                </div>

                {/* Contact & Address */}
                <div className="profile-card">
                  <div className="card-header">
                    <FaMapMarkerAlt className="card-icon purple-icon" />
                    <h3>Contact & Address</h3>
                  </div>
                  <div className="card-body">
                    <div className="info-group full-width">
                      <label>Permanent Address</label>
                      {isEditing ? <textarea value={editFormData.permanentAddress} onChange={(e) => handleInputChange("permanentAddress", e.target.value)} className="modal-input" rows="2" /> : <p>{selectedStudent.permanentAddress}</p>}
                    </div>
                    <div className="info-group full-width">
                      <label>Current Address</label>
                      {isEditing ? <textarea value={editFormData.currentAddress} onChange={(e) => handleInputChange("currentAddress", e.target.value)} className="modal-input" rows="2" /> : <p>{selectedStudent.currentAddress}</p>}
                    </div>
                    <div className="info-group">
                      <label>Student Email</label>
                      {isEditing ? <input type="email" value={editFormData.studentEmail} onChange={(e) => handleInputChange("studentEmail", e.target.value)} className="modal-input" /> : <p>{selectedStudent.studentEmail}</p>}
                    </div>
                    <div className="info-group">
                      <label>Student Mobile</label>
                      {isEditing ? <input type="text" value={editFormData.studentMobile} onChange={(e) => handleInputChange("studentMobile", e.target.value)} className="modal-input" /> : <p>{selectedStudent.studentMobile}</p>}
                    </div>
                  </div>
                </div>

                {/* Family Details */}
                <div className="profile-card">
                  <div className="card-header">
                    <FaUsers className="card-icon orange-icon" />
                    <h3>Family & Emergency Details</h3>
                  </div>
                  <div className="card-body">
                    <div className="info-group">
                      <label>Father's Name</label>
                      {isEditing ? (
                        <div style={{display:'flex', gap:'5px'}}><input type="text" placeholder="Name" value={editFormData.fatherName} onChange={(e) => handleInputChange("fatherName", e.target.value)} className="modal-input" /><input type="text" placeholder="Occupation" value={editFormData.fatherOccupation} onChange={(e) => handleInputChange("fatherOccupation", e.target.value)} className="modal-input" /></div>
                      ) : <p>{selectedStudent.fatherName} ({selectedStudent.fatherOccupation})</p>}
                    </div>
                    <div className="info-group">
                      <label>Father's Mobile</label>
                      {isEditing ? <input type="text" value={editFormData.fatherMobile} onChange={(e) => handleInputChange("fatherMobile", e.target.value)} className="modal-input" /> : <p>{selectedStudent.fatherMobile}</p>}
                    </div>
                    <div className="info-group">
                      <label>Mother's Name</label>
                      {isEditing ? (
                        <div style={{display:'flex', gap:'5px'}}><input type="text" placeholder="Name" value={editFormData.motherName} onChange={(e) => handleInputChange("motherName", e.target.value)} className="modal-input" /><input type="text" placeholder="Occupation" value={editFormData.motherOccupation} onChange={(e) => handleInputChange("motherOccupation", e.target.value)} className="modal-input" /></div>
                      ) : <p>{selectedStudent.motherName} ({selectedStudent.motherOccupation})</p>}
                    </div>
                    <div className="info-group">
                      <label>Mother's Mobile</label>
                      {isEditing ? <input type="text" value={editFormData.motherMobile} onChange={(e) => handleInputChange("motherMobile", e.target.value)} className="modal-input" /> : <p>{selectedStudent.motherMobile}</p>}
                    </div>
                    <div className="info-group full-width warning-bg" style={{marginTop: '10px'}}>
                      <label>Emergency Contact</label>
                      {isEditing ? (
                        <div style={{display:'flex', gap:'10px'}}>
                           <input type="text" placeholder="Name" value={editFormData.emergencyName} onChange={(e) => handleInputChange("emergencyName", e.target.value)} className="modal-input" />
                           <input type="text" placeholder="Contact" value={editFormData.emergencyContact} onChange={(e) => handleInputChange("emergencyContact", e.target.value)} className="modal-input" />
                        </div>
                      ) : (
                        <p>{selectedStudent.emergencyName} - <strong>{selectedStudent.emergencyContact}</strong></p>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {role === "admin" && (
              <div className="modal-footer" style={{ display: 'flex', gap: '15px' }}>
                {isEditing ? (
                  <>
                    <button 
                      className="modal-action-btn" 
                      style={{ background: '#e2e8f0', color: '#0f172a' }}
                      onClick={() => { setIsEditing(false); setEditFormData(selectedStudent); }}
                    >
                      Cancel
                    </button>
                    <button 
                      className="modal-action-btn edit" 
                      onClick={handleInlineSave}
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className="modal-action-btn" 
                      style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}
                      onClick={() => handleDelete(selectedStudent.student_id)}
                    >
                      <MdDeleteForever size={18} /> Delete Student
                    </button>
                    <button 
                      className="modal-action-btn edit" 
                      onClick={() => setIsEditing(true)}
                    >
                      <MdEdit size={18} /> Edit Profile Inline
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
