import React, { useState } from "react";
import "../style/student.css";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AddAttendence() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    class_id: "",
    student_id: "",
    teacher_id: "",
    date: "",
    attendence_status: "present",
  });
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/attendence", form);
      navigate("/attendences");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-form">
      <div style={{ padding: "20px 5px" }}>Add Attendance Details</div>
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
        <label htmlFor="teacher_id">Teacher ID</label>
        <input
          id="teacher_id"
          name="teacher_id"
          type="number"
          value={form.teacher_id}
          onChange={handleChange}
          required
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <label htmlFor="attendence_status">Status</label>
        <select
          id="attendence_status"
          name="attendence_status"
          value={form.attendence_status}
          onChange={handleChange}
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
