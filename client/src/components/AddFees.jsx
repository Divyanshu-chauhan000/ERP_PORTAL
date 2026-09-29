import React, { useState } from "react";
import "../style/student.css";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AddFees() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    class_id: "",
    student_id: "",
    total_fees: "",
    date_of_payment: "",
    balance_due: "",
  });
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/fees", form);
      navigate("/fees");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-form">
      <div style={{ padding: "20px 5px" }}>Add Fee Details</div>
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
        <label htmlFor="total_fees">Total Fees</label>
        <input
          id="total_fees"
          name="total_fees"
          type="number"
          min="0"
          value={form.total_fees}
          onChange={handleChange}
          required
        />
        <label htmlFor="date_of_payment">Payment Date</label>
        <input
          id="date_of_payment"
          name="date_of_payment"
          type="date"
          value={form.date_of_payment}
          onChange={handleChange}
          required
        />
        <label htmlFor="balance_due">Balance Due</label>
        <input
          id="balance_due"
          name="balance_due"
          type="number"
          min="0"
          value={form.balance_due}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
