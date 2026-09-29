import React, { useState } from "react";
import "../style/student.css";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AddSubject() {
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/subjects", { subject_name: subjectName });
      navigate("/subjects");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-form">
      <div style={{ padding: "20px 5px" }}>Add Subject Details</div>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
