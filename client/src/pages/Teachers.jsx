import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Table from "../components/Table";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import getRole from "../utils/getRole";

export default function Teachers() {
  const [teacherTable, setTeacherTable] = useState({
    recentTeacher: [],
  });

  const navigate = useNavigate();
  const role = getRole();

  const recentTeacherColumns = [
    {
      key: "teacher_id",
      label: "Teacher ID",
    },
    {
      key: "teacher_name",
      label: "Teacher Name",
    },
    {
      key: "teacher_contact",
      label: "Teacher Contact",
    },
    {
      key: "teacher_subject_specialisation",
      label: "Teacher Subject",
    },
    {
      key: "teacher_joining_date",
      label: "Teacher Joining Date",
    },
  ];

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const teacherRes = await api.get("/teachers");
        console.log(teacherRes);
        setTeacherTable({ recentTeacher: teacherRes.data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeacher();
  }, []);

  const handleDelete = async (teacher) => {
    try {
      await api.delete(`/teachers/${teacher.teacher_id}`);
      setTeacherTable({
        recentTeacher: teacherTable.recentTeacher.filter(
          (t) => t.teacher_id !== teacher.teacher_id,
        ),
      });
      console.log("Teacher Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const actionButtons = [
    {
      label: <MdEdit size={18} />,
      style: "primary",
      onClick: (teacher) => navigate("/editteacher", { state: teacher }),
    },
    {
      label: <MdDeleteForever size={18} />,
      style: "danger",
      onClick: (teacher) => handleDelete(teacher),
    },
  ];
  return (
    <div>
      <div className="student-bar">
        <h2>Teachers</h2>
        {role === "admin" && (
          <button
            onClick={() => navigate("/addteacher")}
            className="add-btn"
            title="Add teacher"
            aria-label="Add teacher"
          >
            <IoIosAddCircleOutline size={18} />
          </button>
        )}
      </div>
      <Table
        title="Teacher Record"
        columns={recentTeacherColumns}
        data={teacherTable.recentTeacher}
        actionButtons={actionButtons}
        viewLink="/teachers"
      />
    </div>
  );
}
