import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../style/student.css";
import "../style/studentProfile.css";
import getRole from "../utils/getRole";
import { MdDeleteForever, MdEdit, MdSearch, MdClose } from "react-icons/md";
import { IoIosPersonAdd, IoMdFunnel } from "react-icons/io";
import { FaChevronLeft, FaChevronRight, FaUser, FaGraduationCap, FaMapMarkerAlt, FaUsers, FaChalkboardTeacher, FaBriefcase, FaMoneyCheckAlt } from "react-icons/fa";

import api from "../api/axios";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Modal states
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const itemsPerPage = 10;

  const navigate = useNavigate();
  const role = getRole();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get('/teachers/allteachers');
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers", error);
      }
    };
    fetchTeachers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      setTeachers(teachers.filter((teacher) => teacher.teacher_id !== id));
      setSelectedTeacher(null);
    }
  };

  const handleInlineSave = async () => {
    try {
      await api.put(`/teachers/updateteacher/${selectedTeacher.teacher_id}`, editFormData);
      setTeachers(teachers.map(t => t.teacher_id === selectedTeacher.teacher_id ? editFormData : t));
      setSelectedTeacher(null);
      setIsEditing(false);
      alert("Teacher Profile updated successfully!");
    } catch (error) {
      console.error("Error updating teacher", error);
      alert("Failed to update teacher profile.");
    }
  };

  const departments = useMemo(() => {
    const unique = new Set(teachers.map(t => t.department));
    return ["All", ...Array.from(unique).sort()];
  }, [teachers]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchesSearch = 
        (teacher.teacher_name && teacher.teacher_name.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (teacher.teacher_id && teacher.teacher_id.toString().includes(searchQuery));
      
      const matchesDept = selectedDepartment === "All" || teacher.teacher_subject_specialisation === selectedDepartment;
      
      return matchesSearch && matchesDept;
    });
  }, [teachers, searchQuery, selectedDepartment]);

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const currentTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedDepartment]);

  const handleInputChange = (field, value) => {
    setEditFormData({ ...editFormData, [field]: value });
  };

  return (
    <main className="admin-page">
      <header className="admin-welcome">
        <div>
          <p className="admin-eyebrow">Directory</p>
          <h1>Teacher Management</h1>
          <p>View, filter, and manage all faculty members across departments.</p>
        </div>
        <div className="admin-subject-badge" style={{ background: '#e5effa' }}>
          <span className="admin-avatar">
            <FaChalkboardTeacher size={20} />
          </span>
          <span>
            Total Faculty
            <br />
            <strong>{teachers.length} Active</strong>
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
            <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
              <option value="All" disabled style={{display: 'none'}}>Filter by Department</option>
              {departments.map(d => (
                <option key={d} value={d}>{d === "All" ? "All Departments" : d}</option>
              ))}
            </select>
          </div>

          {role === "admin" && (
            <button onClick={() => navigate("/addteacher")} className="add-student-btn">
              <IoIosPersonAdd size={18} /> Add New Teacher
            </button>
          )}
        </div>

        <div className="table-responsive">
          <table className="beautiful-table clickable-rows">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {currentTeachers.length > 0 ? (
                currentTeachers.map((teacher) => (
                  <tr key={teacher.teacher_id} onClick={() => { setSelectedTeacher(teacher); setEditFormData(teacher); setIsEditing(false); }}>
                    <td>
                      <span className="id-badge">#{teacher.teacher_id}</span>
                    </td>
                    <td>
                      <strong>{teacher.teacher_name || "N/A"}</strong>
                    </td>
                    <td>{teacher.teacher_subject_specialisation || "N/A"}</td>
                    <td>{teacher.designation}</td>
                    <td>
                      <span className={`gender-badge ${teacher.gender?.toLowerCase() || 'unknown'}`}>
                        {teacher.gender || 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="empty-state">
                    No teachers found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 0 && (
          <div className="pagination">
            <span className="page-info">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTeachers.length)} of {filteredTeachers.length} entries
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

      {/* COMPREHENSIVE EDITABLE MODAL USING SAME BLUE THEME & LAYOUT AS STUDENT */}
      {selectedTeacher && (
        <div className="student-modal-overlay" onClick={() => { setSelectedTeacher(null); setIsEditing(false); }}>
          <div className="student-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Faculty Profile</h2>
              <button className="close-modal-btn" onClick={() => { setSelectedTeacher(null); setIsEditing(false); }}>
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
                    <h2>{selectedTeacher.fullName}</h2>
                  )}
                  <p className="subtitle">
                    {isEditing ? (
                      <span>
                        Dept: <input type="text" style={{ width: '100px', padding: '2px' }} value={editFormData.department} onChange={(e) => handleInputChange("department", e.target.value)} /> 
                        &nbsp;|&nbsp; Emp ID: <input type="text" style={{ width: '100px', padding: '2px' }} value={editFormData.employeeId} onChange={(e) => handleInputChange("employeeId", e.target.value)} />
                      </span>
                    ) : (
                      <span>Dept: {selectedTeacher.department} &nbsp;|&nbsp; Desig: {selectedTeacher.designation} &nbsp;|&nbsp; Emp ID: {selectedTeacher.employeeId}</span>
                    )}
                  </p>
                  <span className="status-badge">{selectedTeacher.status} Staff</span>
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
                      ) : <p>{selectedTeacher.fullName}</p>}
                    </div>
                    <div className="info-group">
                      <label>Date of Birth</label>
                      {isEditing ? (
                        <input type="date" value={editFormData.dob} onChange={(e) => handleInputChange("dob", e.target.value)} className="modal-input" />
                      ) : <p>{selectedTeacher.dob}</p>}
                    </div>
                    <div className="info-group">
                      <label>Gender</label>
                      {isEditing ? (
                        <select value={editFormData.gender} onChange={(e) => handleInputChange("gender", e.target.value)} className="modal-input">
                          <option>Male</option><option>Female</option><option>Other</option>
                        </select>
                      ) : <p>{selectedTeacher.gender}</p>}
                    </div>
                    <div className="info-group">
                      <label>Blood Group</label>
                      {isEditing ? <input type="text" value={editFormData.bloodGroup} onChange={(e) => handleInputChange("bloodGroup", e.target.value)} className="modal-input" /> : <p>{selectedTeacher.bloodGroup}</p>}
                    </div>
                    <div className="info-group">
                      <label>Aadhaar Number</label>
                      {isEditing ? <input type="text" value={editFormData.aadhaar} onChange={(e) => handleInputChange("aadhaar", e.target.value)} className="modal-input" /> : <p>{selectedTeacher.aadhaar}</p>}
                    </div>
                    <div className="info-group">
                      <label>Religion & Category</label>
                      {isEditing ? (
                        <div style={{display:'flex', gap:'5px'}}><input type="text" style={{width:'50%'}} value={editFormData.religion} onChange={(e) => handleInputChange("religion", e.target.value)} className="modal-input" /><input type="text" style={{width:'50%'}} value={editFormData.category} onChange={(e) => handleInputChange("category", e.target.value)} className="modal-input" /></div>
                      ) : <p>{selectedTeacher.religion} / {selectedTeacher.category}</p>}
                    </div>
                    <div className="info-group">
                      <label>Mother Tongue</label>
                      {isEditing ? <input type="text" value={editFormData.motherTongue} onChange={(e) => handleInputChange("motherTongue", e.target.value)} className="modal-input" /> : <p>{selectedTeacher.motherTongue}</p>}
                    </div>
                    <div className="info-group full-width">
                      <label>Identification Mark</label>
                      {isEditing ? <input type="text" value={editFormData.identificationMark} onChange={(e) => handleInputChange("identificationMark", e.target.value)} className="modal-input" /> : <p>{selectedTeacher.identificationMark}</p>}
                    </div>
                  </div>
                </div>

                {/* Professional Details */}
                <div className="profile-card">
                  <div className="card-header">
                    <FaBriefcase className="card-icon green-icon" />
                    <h3>Professional Details</h3>
                  </div>
                  <div className="card-body">
                    <div className="info-group">
                      <label>Joining Date</label>
                      {isEditing ? <input type="date" value={editFormData.joiningDate} onChange={(e) => handleInputChange("joiningDate", e.target.value)} className="modal-input" /> : <p>{selectedTeacher.joiningDate}</p>}
                    </div>
                    <div className="info-group">
                      <label>Department</label>
                      {isEditing ? <input type="text" value={editFormData.department} onChange={(e) => handleInputChange("department", e.target.value)} className="modal-input" /> : <p>{selectedTeacher.department}</p>}
                    </div>
                    <div className="info-group">
                      <label>Designation</label>
                      {isEditing ? <input type="text" value={editFormData.designation} onChange={(e) => handleInputChange("designation", e.target.value)} className="modal-input" /> : <p>{selectedTeacher.designation}</p>}
                    </div>
                    <div className="info-group">
                      <label>Qualification</label>
                      {isEditing ? <input type="text" value={editFormData.qualification} onChange={(e) => handleInputChange("qualification", e.target.value)} className="modal-input" /> : <p>{selectedTeacher.qualification}</p>}
                    </div>
                    <div className="info-group">
                      <label>Experience</label>
                      {isEditing ? <input type="text" value={editFormData.experience} onChange={(e) => handleInputChange("experience", e.target.value)} className="modal-input" /> : <p>{selectedTeacher.experience}</p>}
                    </div>
                    <div className="info-group full-width">
                      <label>Previous School / Organization</label>
                      {isEditing ? <input type="text" value={editFormData.previousSchool} onChange={(e) => handleInputChange("previousSchool", e.target.value)} className="modal-input" /> : <p>{selectedTeacher.previousSchool}</p>}
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
                      {isEditing ? <textarea value={editFormData.permanentAddress} onChange={(e) => handleInputChange("permanentAddress", e.target.value)} className="modal-input" rows="2" /> : <p>{selectedTeacher.permanentAddress}</p>}
                    </div>
                    <div className="info-group full-width">
                      <label>Current Address</label>
                      {isEditing ? <textarea value={editFormData.currentAddress} onChange={(e) => handleInputChange("currentAddress", e.target.value)} className="modal-input" rows="2" /> : <p>{selectedTeacher.currentAddress}</p>}
                    </div>
                    <div className="info-group">
                      <label>Email Address</label>
                      {isEditing ? <input type="email" value={editFormData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="modal-input" /> : <p>{selectedTeacher.email}</p>}
                    </div>
                    <div className="info-group">
                      <label>Mobile Number</label>
                      {isEditing ? <input type="text" value={editFormData.mobile} onChange={(e) => handleInputChange("mobile", e.target.value)} className="modal-input" /> : <p>{selectedTeacher.mobile}</p>}
                    </div>
                  </div>
                </div>

                {/* Financial & Payroll Details */}
                <div className="profile-card">
                  <div className="card-header">
                    <FaMoneyCheckAlt className="card-icon" style={{ color: '#059669' }} />
                    <h3>Financial & Payroll</h3>
                  </div>
                  <div className="card-body">
                    <div className="info-group">
                      <label>Monthly Salary (₹)</label>
                      {isEditing ? <input type="number" value={editFormData.salary} onChange={(e) => handleInputChange("salary", e.target.value)} className="modal-input" /> : <p>₹ {selectedTeacher.salary}</p>}
                    </div>
                    <div className="info-group">
                      <label>PAN Number</label>
                      {isEditing ? <input type="text" value={editFormData.panNumber} onChange={(e) => handleInputChange("panNumber", e.target.value)} className="modal-input" /> : <p>{selectedTeacher.panNumber}</p>}
                    </div>
                    <div className="info-group">
                      <label>Bank Account Number</label>
                      {isEditing ? <input type="text" value={editFormData.bankAccount} onChange={(e) => handleInputChange("bankAccount", e.target.value)} className="modal-input" /> : <p>{selectedTeacher.bankAccount}</p>}
                    </div>
                    <div className="info-group">
                      <label>Bank IFSC Code</label>
                      {isEditing ? <input type="text" value={editFormData.ifscCode} onChange={(e) => handleInputChange("ifscCode", e.target.value)} className="modal-input" /> : <p>{selectedTeacher.ifscCode}</p>}
                    </div>
                  </div>
                </div>

                {/* Emergency Details */}
                <div className="profile-card">
                  <div className="card-header">
                    <FaUsers className="card-icon orange-icon" />
                    <h3>Emergency Contact Details</h3>
                  </div>
                  <div className="card-body">
                    <div className="info-group">
                      <label>Contact Person Name</label>
                      {isEditing ? <input type="text" value={editFormData.emergencyName} onChange={(e) => handleInputChange("emergencyName", e.target.value)} className="modal-input" /> : <p>{selectedTeacher.emergencyName}</p>}
                    </div>
                    <div className="info-group">
                      <label>Relationship</label>
                      {isEditing ? <input type="text" value={editFormData.relationship} onChange={(e) => handleInputChange("relationship", e.target.value)} className="modal-input" /> : <p>{selectedTeacher.relationship}</p>}
                    </div>
                    <div className="info-group full-width warning-bg" style={{marginTop: '10px'}}>
                      <label>Emergency Contact Number</label>
                      {isEditing ? (
                         <input type="text" value={editFormData.emergencyContact} onChange={(e) => handleInputChange("emergencyContact", e.target.value)} className="modal-input" />
                      ) : (
                        <p><strong>{selectedTeacher.emergencyContact}</strong></p>
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
                      onClick={() => { setIsEditing(false); setEditFormData(selectedTeacher); }}
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
                      onClick={() => handleDelete(selectedTeacher.teacher_id)}
                    >
                      <MdDeleteForever size={18} /> Delete Staff
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
