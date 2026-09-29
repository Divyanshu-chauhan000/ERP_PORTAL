import React, { useState } from "react";
import "../style/student.css";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function UpdateClass() {
  const location = useLocation();
  const classItem = location.state || {};
  const navigate = useNavigate();
  const [form, setForm] = useState({
    class_name: classItem.class_name || "",
    class_section: classItem.class_section || "",
    numberOfstudents: classItem.numberOfstudents ?? "",
  });
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/classes/${classItem.class_id}`, form);
      navigate("/classes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-form">
      <div style={{ padding: "20px 5px" }}>Update Class Details</div>
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
        <label htmlFor="class_name">Class Name</label>
        <input
          id="class_name"
          name="class_name"
          value={form.class_name}
          onChange={handleChange}
          required
        />
        <label htmlFor="class_section">Section</label>
        <input
          id="class_section"
          name="class_section"
          value={form.class_section}
          onChange={handleChange}
          required
        />
        <label htmlFor="numberOfstudents">Number of Students</label>
        <input
          id="numberOfstudents"
          name="numberOfstudents"
          type="number"
          min="0"
          value={form.numberOfstudents}
          onChange={handleChange}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
