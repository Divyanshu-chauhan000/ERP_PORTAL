import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Table from "../components/Table";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import getRole from "../utils/getRole";

export default function Subject() {
  const navigate = useNavigate();
  const role = getRole();
  const [subjects, setSubjects] = useState([]);
  const [searchId, setSearchId] = useState("");

  const subjectColumns = [
    { key: "subject_id", label: "Subject ID" },
    { key: "subject_name", label: "Subject Name" },
  ];

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await api.get("/subjects");
        setSubjects(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubjects();
  }, []);

  const handleDelete = async (subject) => {
    try {
      await api.delete(`/subjects/${subject.subject_id}`);
      setSubjects((current) =>
        current.filter((item) => item.subject_id !== subject.subject_id),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const actionButtons = [
    {
      label: <MdEdit size={18} />,
      style: "primary",
      onClick: (subject) => navigate("/editsubject", { state: subject }),
    },
    {
      label: <MdDeleteForever size={18} />,
      style: "danger",
      onClick: handleDelete,
    },
  ];

  const filteredSubjects = subjects.filter((subject) =>
    subject.subject_id.toString().includes(searchId),
  );

  return (
    <div>
      <div className="student-bar">
        <h2>Subjects</h2>
        {role === "admin" && (
          <button
            onClick={() => navigate("/addsubject")}
            className="add-btn"
            title="Add subject"
            aria-label="Add subject"
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
        title="Subject Records"
        columns={subjectColumns}
        data={filteredSubjects}
        actionButtons={actionButtons}
        viewLink="/subjects"
      />
    </div>
  );
}
