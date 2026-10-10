import React, { useState } from "react";
import {
  FaArrowDown,
  FaFileLines,
  FaGraduationCap,
  FaUpload,
} from "react-icons/fa6";
import TeacherPageHeader from "../components/TeacherPageHeader";
import "../style/teacherPortal.css";

const staffDocuments = [
  { name: "Resume / CV", file: "Aditi_Verma_Resume.pdf", status: "On file" },
  {
    name: "Highest qualification",
    file: "MSc_Mathematics.pdf",
    status: "Verified",
  },
  {
    name: "Appointment letter",
    file: "Appointment_Letter.pdf",
    status: "Verified",
  },
];

const payslips = [
  { month: "September 2026", amount: 54200, status: "Processed" },
  { month: "August 2026", amount: 54200, status: "Processed" },
  { month: "July 2026", amount: 54200, status: "Processed" },
];

function TeacherProfile() {
  const [uploadedFile, setUploadedFile] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setMessage("File selected in this demo. It has not been uploaded.");
    }
  };

  return (
    <main className="teacher-page">
      <TeacherPageHeader
        title="My Profile"
        description="Staff details, qualifications, documents, and salary information."
      />

      <section className="teacher-panel">
        <div className="teacher-profile-heading">
          <div className="teacher-avatar">AV</div>
          <div>
            <p className="teacher-eyebrow">Faculty member</p>
            <h2>Aditi Verma</h2>
            <p>Mathematics · Employee ID T001</p>
          </div>
          <span className="teacher-employment-status">Active</span>
        </div>
        <div className="teacher-profile-grid">
          <div>
            <span>Department</span>
            <strong>Middle School Mathematics</strong>
          </div>
          <div>
            <span>Assigned classes</span>
            <strong>7-B, 8-A, 8-C</strong>
          </div>
          <div>
            <span>Class teacher</span>
            <strong>Class 8-A</strong>
          </div>
          <div>
            <span>School email</span>
            <strong>aditi.verma@school.edu</strong>
          </div>
          <div>
            <span>Joining date</span>
            <strong>01 April 2021</strong>
          </div>
          <div>
            <span>Qualification</span>
            <strong>M.Sc. Mathematics · B.Ed.</strong>
          </div>
        </div>
      </section>

      <div className="teacher-profile-columns">
        <section className="teacher-panel">
          <div className="teacher-panel-heading">
            <div>
              <h2>Professional documents</h2>
              <p>Resume and verified staff records</p>
            </div>
            <FaFileLines className="teacher-muted-icon" />
          </div>
          <div className="teacher-document-list">
            {staffDocuments.map((document) => (
              <div className="teacher-document-row" key={document.name}>
                <span className="teacher-document-icon">
                  <FaFileLines />
                </span>
                <div>
                  <strong>{document.name}</strong>
                  <small>{document.file}</small>
                </div>
                <span className="teacher-document-status">
                  {document.status}
                </span>
              </div>
            ))}
          </div>
          <label className="teacher-upload-button">
            <FaUpload /> Select a document
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleFileChange}
            />
          </label>
          {uploadedFile && (
            <p className="teacher-inline-feedback">Selected: {uploadedFile}</p>
          )}
        </section>

        <section className="teacher-panel teacher-salary-panel">
          <div className="teacher-panel-heading">
            <div>
              <h2>Salary overview</h2>
              <p>September 2026 · Demo values</p>
            </div>
          </div>
          <div className="teacher-net-pay">
            <span>Net salary</span>
            <strong>₹54,200</strong>
            <small>Paid on 30 September 2026</small>
          </div>
          <div className="teacher-salary-lines">
            <div>
              <span>Basic + allowances</span>
              <strong>₹58,000</strong>
            </div>
            <div>
              <span>Deductions</span>
              <strong>₹3,800</strong>
            </div>
          </div>
          <div className="teacher-payslip-heading">
            <strong>Recent payslips</strong>
          </div>
          {payslips.map((slip) => (
            <div className="teacher-payslip-row" key={slip.month}>
              <span>{slip.month}</span>
              <strong>₹{slip.amount.toLocaleString("en-IN")}</strong>
              <button
                type="button"
                aria-label={`Download ${slip.month} payslip`}
                onClick={() =>
                  setMessage(`${slip.month} payslip is demo-only.`)
                }
              >
                <FaArrowDown />
              </button>
            </div>
          ))}
        </section>
      </div>

      <section className="teacher-panel teacher-qualification-panel">
        <div className="teacher-panel-heading">
          <div>
            <h2>Teaching assignment</h2>
            <p>Current academic session · 2026-27</p>
          </div>
          <FaGraduationCap className="teacher-muted-icon" />
        </div>
        <div className="teacher-assignment-summary">
          <span>
            <small>Subject</small>
            <strong>Mathematics</strong>
          </span>
          <span>
            <small>Classes</small>
            <strong>7-B, 8-A, 8-C</strong>
          </span>
          <span>
            <small>Class-teacher role</small>
            <strong>Class 8-A</strong>
          </span>
        </div>
      </section>

      <div className="teacher-profile-actions">
        <button
          type="button"
          className="teacher-secondary-button"
          onClick={() =>
            setMessage(
              "Profile update request is demo-only until the staff API is connected.",
            )
          }
        >
          Request profile update
        </button>
      </div>
      {message && (
        <p className="teacher-confirmation" role="status">
          {message}
        </p>
      )}
      <p className="teacher-demo-note">
        All profile, salary, and document details shown here are sample data.
      </p>
    </main>
  );
}

export default TeacherProfile;
