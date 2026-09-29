import React, { useState } from "react";
import "../style/student.css";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function UpdateTeacher() {
  const location = useLocation();
  const teacher = location.state || {};
  const navigate = useNavigate();
  const [form, setForm] = useState({
    teacher_name: teacher.teacher_name || "",
    teacher_contact: teacher.teacher_contact || "",
    teacher_subject_specialisation:
      teacher.teacher_subject_specialisation || "",
    teacher_joining_date: String(teacher.teacher_joining_date || "").slice(
      0,
      10,
    ),
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/teachers/${teacher.teacher_id}`, form);
      navigate("/teachers");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-form">
      <div style={{ padding: "20px 5px" }}>Update Teacher Details</div>
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
        <label htmlFor="teacher_name">Name</label>
        <input
          id="teacher_name"
          name="teacher_name"
          value={form.teacher_name}
          onChange={handleChange}
          required
        />
        <label htmlFor="teacher_contact">Contact</label>
        <input
          id="teacher_contact"
          name="teacher_contact"
          value={form.teacher_contact}
          onChange={handleChange}
          required
        />
        <label htmlFor="teacher_subject_specialisation">
          Subject Specialisation
        </label>
        <input
          id="teacher_subject_specialisation"
          name="teacher_subject_specialisation"
          value={form.teacher_subject_specialisation}
          onChange={handleChange}
          required
        />
        <label htmlFor="teacher_joining_date">Joining Date</label>
        <input
          id="teacher_joining_date"
          name="teacher_joining_date"
          type="date"
          value={form.teacher_joining_date}
          onChange={handleChange}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
