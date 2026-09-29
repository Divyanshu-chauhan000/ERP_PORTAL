import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import api from "./../api/axios";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import getRole from "../utils/getRole";

export default function Class() {
  const navigate = useNavigate();
  const role = getRole();
  const [classTable, setclassTable] = useState({
    recentClass: [],
  });
  const [searchId, setSearchId] = useState("");

  const classColumns = [
    { key: "class_id", label: "Class Id" },
    { key: "class_name", label: "Class" },
    { key: "class_section", label: "Section" },
    { key: "numberOfstudents", label: "No. of Students" },
  ];

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const classRes = await api.get("/classes");
        console.log(classRes);

        setclassTable({ recentClass: classRes.data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchClass();
  }, []);

  const handleDelete = async (classItem) => {
    try {
      await api.delete(`/classes/${classItem.class_id}`);
      setclassTable((current) => ({
        recentClass: current.recentClass.filter(
          (item) => item.class_id !== classItem.class_id,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const actionButtons = [
    {
      label: <MdEdit size={18} />,
      style: "primary",
      onClick: (classItem) => navigate("/editclass", { state: classItem }),
    },
    {
      label: <MdDeleteForever size={18} />,
      style: "danger",
      onClick: (classItem) => handleDelete(classItem),
    },
  ];

  const filteredClasses = classTable.recentClass.filter((classItem) =>
    classItem.class_id.toString().includes(searchId),
  );

  return (
    <div>
      <div className="student-bar">
        <h2>Classes</h2>
        {role === "admin" && (
          <button
            onClick={() => navigate("/addclass")}
            className="add-btn"
            title="Add class"
            aria-label="Add class"
          >
            <IoIosAddCircleOutline size={18} />
          </button>
        )}
      </div>
      <div className="search-std">
        <input
          type="text"
          placeholder="Search Id"
          value={searchId}
          className="searchid-inpt"
          onChange={(e) => setSearchId(e.target.value)}
        />
      </div>
      <Table
        title="Class Records"
        columns={classColumns}
        data={filteredClasses}
        actionButtons={actionButtons}
        viewLink="/classes"
      />
    </div>
  );
}
