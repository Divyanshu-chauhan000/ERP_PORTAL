import React from 'react'
import { FaUser, FaGraduationCap, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import './../style/studentProfile.css'
function StudentProfile() {

  const profileData = {
    personal: {
      fullName: "Priya Singh",
      dob: "12-08-2012",
      gender: "Female",
      bloodGroup: "B+",
      nationality: "Indian",
      religion: "Hindu",
      category: "General",
      aadhaar: "**** **** 1234",
      birthPlace: "Delhi",
      motherTongue: "Hindi",
      identificationMark: "Mole on left cheek"
    },
    academic: {
      admissionDate: "01-04-2024",
      admissionNumber: "2024001",
      classSection: "Nursery - A",
      rollNumber: "12",
      house: "Red House",
      stream: "N/A",
      previousSchool: "Kidzee Pre-School (TC-9876)",
      medium: "English",
      board: "CBSE",
      academicYear: "2026-27",
      status: "Regular"
    },
    contact: {
      studentMobile: "N/A",
      studentEmail: "priya.singh@student.com",
      permanentAddress: "123, Rose Villa, Sector 4, Rohini, Delhi - 110085",
      currentAddress: "Same as Permanent"
    },
    family: {
      fatherName: "Rajesh Singh",
      fatherOccupation: "Software Engineer",
      fatherMobile: "9876543210",
      motherName: "Neha Singh",
      motherOccupation: "Teacher",
      motherMobile: "9876543211",
      emergencyName: "Rajesh Singh (Father)",
      emergencyContact: "9876543210"
    }
  };


  return (
<div className="profile-container">
      <div className="profile-page-title">
        <h2>Student Profile</h2>
      </div>
      <div className="profile-header-card">
        <div className="profile-photo">
          <img src="https://img.magnific.com/premium-photo/cute-indian-little-school-boy-standing-school_130568-376.jpg" alt="Student" />
        </div>
        <div className="profile-header-info">
          <h2>{profileData.personal.fullName}</h2>
          <p className="subtitle">Class: {profileData.academic.classSection} &nbsp;|&nbsp; Roll No: {profileData.academic.rollNumber} &nbsp;|&nbsp; Adm No: {profileData.academic.admissionNumber}</p>
          <span className="status-badge">{profileData.academic.status} Student</span>
        </div>
      </div>
      <div className="profile-content-grid">
        
        
        <div className="profile-card">
          <div className="card-header">
            <FaUser className="card-icon blue-icon" />
            <h3>Personal Details</h3>
          </div>
          <div className="card-body">
            <div className="info-group">
              <label>Full Name</label>
              <p>{profileData.personal.fullName}</p>
            </div>
            <div className="info-group">
              <label>Date of Birth</label>
              <p>{profileData.personal.dob}</p>
            </div>
            <div className="info-group">
              <label>Gender</label>
              <p>{profileData.personal.gender}</p>
            </div>
            <div className="info-group">
              <label>Blood Group</label>
              <p>{profileData.personal.bloodGroup}</p>
            </div>
            <div className="info-group">
              <label>Aadhaar Number</label>
              <p>{profileData.personal.aadhaar}</p>
            </div>
            <div className="info-group">
              <label>Religion & Category</label>
              <p>{profileData.personal.religion} / {profileData.personal.category}</p>
            </div>
            <div className="info-group">
              <label>Mother Tongue</label>
              <p>{profileData.personal.motherTongue}</p>
            </div>
            <div className="info-group">
              <label>Identification Mark</label>
              <p>{profileData.personal.identificationMark}</p>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <div className="card-header">
            <FaGraduationCap className="card-icon green-icon" />
            <h3>Academic Details</h3>
          </div>
          <div className="card-body">
            <div className="info-group">
              <label>Admission Date</label>
              <p>{profileData.academic.admissionDate}</p>
            </div>
            <div className="info-group">
              <label>Board & Medium</label>
              <p>{profileData.academic.board} ({profileData.academic.medium})</p>
            </div>
            <div className="info-group">
              <label>Stream</label>
              <p>{profileData.academic.stream}</p>
            </div>
            <div className="info-group">
              <label>House / Club</label>
              <p>{profileData.academic.house}</p>
            </div>
            <div className="info-group">
              <label>Previous School</label>
              <p>{profileData.academic.previousSchool}</p>
            </div>
          </div>
        </div>
        <div className="profile-card">
          <div className="card-header">
            <FaMapMarkerAlt className="card-icon purple-icon" />
            <h3>Contact & Address</h3>
          </div>
          <div className="card-body">
            <div className="info-group full-width">
              <label>Permanent Address</label>
              <p>{profileData.contact.permanentAddress}</p>
            </div>
            <div className="info-group full-width">
              <label>Current Address</label>
              <p>{profileData.contact.currentAddress}</p>
            </div>
            <div className="info-group">
              <label>Student Email</label>
              <p>{profileData.contact.studentEmail}</p>
            </div>
            <div className="info-group">
              <label>Student Mobile</label>
              <p>{profileData.contact.studentMobile}</p>
            </div>
          </div>
        </div>
        {/* ---- FAMILY DETAILS CARD ---- */}
        <div className="profile-card">
          <div className="card-header">
            <FaUsers className="card-icon orange-icon" />
            <h3>Family & Emergency Details</h3>
          </div>
          <div className="card-body">
            <div className="info-group">
              <label>Father's Name</label>
              <p>{profileData.family.fatherName} ({profileData.family.fatherOccupation})</p>
            </div>
            <div className="info-group">
              <label>Father's Mobile</label>
              <p>{profileData.family.fatherMobile}</p>
            </div>
            <div className="info-group">
              <label>Mother's Name</label>
              <p>{profileData.family.motherName} ({profileData.family.motherOccupation})</p>
            </div>
            <div className="info-group">
              <label>Mother's Mobile</label>
              <p>{profileData.family.motherMobile}</p>
            </div>
            <div className="info-group full-width warning-bg">
              <label>Emergency Contact</label>
              <p>{profileData.family.emergencyName} - <strong>{profileData.family.emergencyContact}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile
