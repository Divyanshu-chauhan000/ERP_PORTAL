import React, { useState } from "react";
import "../style/student.css";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function UpdateSubject() {
  const location = useLocation();
  const subject = location.state || {};
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = useState(subject.subject_name || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/subjects/${subject.subject_id}`, {
        subject_name: subjectName,
      });
      navigate("/subjects");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-form">
      <div style={{ padding: "20px 5px" }}>Update Subject Details</div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "10px",
          padding: "20px",
          border: "2px solid #292a2b",
        }}
      >
        <label htmlFor="subject_name">Subject Name</label>
        <input
          id="subject_name"
          name="subject_name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          required
        />
        <button type="submit">Update Subject</button>
      </form>
    </div>
  );
}
