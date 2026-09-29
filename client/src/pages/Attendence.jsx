import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Table from "../components/Table";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import getRole from "../utils/getRole";

export default function Attendence() {
  const navigate = useNavigate();
  const role = getRole();
  const [attendences, setAttendences] = useState([]);
  const [searchId, setSearchId] = useState("");

  const attendenceColumns = [
    { key: "attendence_id", label: "Attendance ID" },
    { key: "class_id", label: "Class ID" },
    { key: "student_id", label: "Student ID" },
    { key: "teacher_id", label: "Teacher ID" },
    { key: "date", label: "Date" },
    { key: "attendence_status", label: "Status" },
  ];

  useEffect(() => {
    const fetchAttendence = async () => {
      try {
        const response = await api.get("/attendence");
        setAttendences(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAttendence();
  }, []);

  const handleDelete = async (attendence) => {
    try {
      await api.delete(`/attendence/${attendence.attendence_id}`);
      setAttendences((current) =>
        current.filter(
          (item) => item.attendence_id !== attendence.attendence_id,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const actionButtons = [
    {
      label: <MdEdit size={18} />,
      style: "primary",
      onClick: (attendence) =>
        navigate("/editattendence", { state: attendence }),
    },
    {
      label: <MdDeleteForever size={18} />,
      style: "danger",
      onClick: handleDelete,
    },
  ];

  const filteredAttendences = attendences.filter(
    (attendence) =>
      attendence.attendence_id.toString().includes(searchId) ||
      attendence.student_id.toString().includes(searchId),
  );

  return (
    <div>
      <div className="student-bar">
        <h2>Attendance</h2>
        {role === "admin" && (
          <button
            onClick={() => navigate("/addattendence")}
            className="add-btn"
            title="Add attendance"
            aria-label="Add attendance"
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
        title="Attendance Records"
        columns={attendenceColumns}
        data={filteredAttendences}
        actionButtons={actionButtons}
        viewLink="/attendences"
      />
    </div>
  );
}
