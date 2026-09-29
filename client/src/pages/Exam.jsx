import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Table from "../components/Table";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import getRole from "../utils/getRole";

export default function Exam() {
  const navigate = useNavigate();
  const role = getRole();
  const [exams, setExams] = useState([]);
  const [searchId, setSearchId] = useState("");

  const examColumns = [
    { key: "exam_id", label: "Exam ID" },
    { key: "exam_type", label: "Exam Type" },
    { key: "class_id", label: "Class ID" },
    { key: "student_id", label: "Student ID" },
    { key: "subject_id", label: "Subject ID" },
    { key: "marks", label: "Marks" },
    { key: "max_marks", label: "Maximum Marks" },
    { key: "exam_date", label: "Exam Date" },
  ];

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await api.get("/exams");
        setExams(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExams();
  }, []);

  const handleDelete = async (exam) => {
    try {
      await api.delete(`/exams/${exam.exam_id}`);
      setExams((current) =>
        current.filter((item) => item.exam_id !== exam.exam_id),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const actionButtons = [
    {
      label: <MdEdit size={18} />,
      style: "primary",
      onClick: (exam) => navigate("/editexam", { state: exam }),
    },
    {
      label: <MdDeleteForever size={18} />,
      style: "danger",
      onClick: handleDelete,
    },
  ];

  const filteredExams = exams.filter(
    (exam) =>
      exam.exam_id.toString().includes(searchId) ||
      exam.student_id.toString().includes(searchId),
  );

  return (
    <div>
      <div className="student-bar">
        <h2>Exams</h2>
        {role === "admin" && (
          <button
            onClick={() => navigate("/addexam")}
            className="add-btn"
            title="Add exam"
            aria-label="Add exam"
          >
            <IoIosAddCircleOutline size={18} />
          </button>
        )}
      </div>
      <div className="search-std">
        <input
          type="text"
          placeholder="Search ID"
          value={searchId}
          className="searchid-inpt"
          onChange={(e) => setSearchId(e.target.value)}
        />
      </div>
      <Table
        title="Exam Records"
        columns={examColumns}
        data={filteredExams}
        actionButtons={actionButtons}
        viewLink="/exams"
      />
    </div>
  );
}
