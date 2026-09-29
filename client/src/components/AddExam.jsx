import React, { useState } from "react";
import "../style/student.css";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AddExam() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    exam_type: "",
    class_id: "",
    student_id: "",
    subject_id: "",
    marks: "",
    max_marks: "",
    exam_date: "",
  });
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/exams", form);
      navigate("/exams");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-form">
      <div style={{ padding: "20px 5px" }}>Add Exam Details</div>
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
        <label htmlFor="exam_type">Exam Type</label>
        <input
          id="exam_type"
          name="exam_type"
          value={form.exam_type}
          onChange={handleChange}
          required
        />
        <label htmlFor="class_id">Class ID</label>
        <input
          id="class_id"
          name="class_id"
          type="number"
          value={form.class_id}
          onChange={handleChange}
          required
        />
        <label htmlFor="student_id">Student ID</label>
        <input
          id="student_id"
          name="student_id"
          type="number"
          value={form.student_id}
          onChange={handleChange}
          required
        />
        <label htmlFor="subject_id">Subject ID</label>
        <input
          id="subject_id"
          name="subject_id"
          type="number"
          value={form.subject_id}
          onChange={handleChange}
          required
        />
        <label htmlFor="marks">Marks</label>
        <input
          id="marks"
          name="marks"
          type="number"
          min="0"
          value={form.marks}
          onChange={handleChange}
          required
        />
        <label htmlFor="max_marks">Maximum Marks</label>
        <input
          id="max_marks"
          name="max_marks"
          type="number"
          min="0"
          value={form.max_marks}
          onChange={handleChange}
          required
        />
        <label htmlFor="exam_date">Exam Date</label>
        <input
          id="exam_date"
          name="exam_date"
          type="date"
          value={form.exam_date}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
