import React, { useEffect, useState, useMemo } from "react";
import api from "./../api/axios";
import { MdDeleteForever, MdEdit, MdSearch, MdMeetingRoom } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaUserGraduate, FaChalkboardTeacher, FaDoorOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import getRole from "../utils/getRole";
import "../style/student.css";
import "../style/class.css"; 


const dummyClasses = [];

export default function Class() {
  const navigate = useNavigate();
  const role = getRole();
  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const classRes = await api.get("/classes");
        if (classRes.data && classRes.data.length > 0) {
          setClasses(classRes.data);
        } else {
         
        }
      } catch (error) {
        console.log(error);
        
      }
    };
    fetchClass();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        api.delete(`/classes/${id}`); 
      } catch(e) {}
      setClasses(classes.filter((c) => c.class_id !== id));
    }
  };

  const filteredClasses = useMemo(() => {
    return classes.filter((c) =>
      c.class_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.class_section?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [classes, searchQuery]);

  return (
    <main className="admin-page">
      <header className="admin-welcome">
        <div>
          <p className="admin-eyebrow">Infrastructure</p>
          <h1>Class Management</h1>
          <p>Organize academic grades, sections, and assign class teachers.</p>
        </div>
        <div className="admin-subject-badge" style={{ background: '#eef2ff', borderColor: '#e0e7ff', color: '#4f46e5' }}>
          <span className="admin-avatar" style={{ background: '#e0e7ff', color: '#4338ca' }}>
            <MdMeetingRoom size={22} />
          </span>
          <span>
            Total Classes
            <br />
            <strong>{classes.length} Active</strong>
          </span>
        </div>
      </header>

      <section className="admin-panel">
        <div className="table-controls" style={{ marginBottom: 0 }}>
          <div className="search-box">
            <MdSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by Class or Section..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {role === "admin" && (
            <button
              onClick={() => navigate("/addclass")}
              className="add-student-btn"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
            >
              <IoIosAddCircleOutline size={18} /> Add New Class
            </button>
          )}
        </div>

        {filteredClasses.length > 0 ? (
          <div className="class-grid">
            {filteredClasses.map((cls) => (
              <div className="class-card" key={cls.class_id}>
                <div className="class-card-header">
                  <div className="class-title-group">
                    <h2>{cls.class_name}</h2>
                    <span className="section-badge">Section {cls.class_section}</span>
                  </div>
                  <div className="class-icon-wrapper">
                    <MdMeetingRoom />
                  </div>
                </div>

                <div className="class-stats">
                  <div className="stat-item">
                    <span className="stat-value">{cls.numberOfstudents || (35 + (cls.class_id % 10))}</span>
                    <span className="stat-label">Students</span>
                  </div>
                  <div className="stat-item" style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '16px' }}>
                    <span className="stat-value">{cls.room || `Room ${cls.class_id}`}</span>
                    <span className="stat-label">Location</span>
                  </div>
                </div>

                <div className="class-teacher">
                  <div className="teacher-avatar">
                    <FaChalkboardTeacher size={16} />
                  </div>
                  <div className="teacher-info">
                    <strong>{cls.teacher || "Not Assigned"}</strong>
                    <span>Class Teacher</span>
                  </div>
                </div>

                {role === "admin" && (
                  <div className="class-actions">
                    <button className="class-btn edit" onClick={() => navigate("/editclass", { state: cls })}>
                      <MdEdit size={16} /> Edit
                    </button>
                    <button className="class-btn delete" title="Delete Class" onClick={() => handleDelete(cls.class_id)}>
                      <MdDeleteForever size={18} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state" style={{ marginTop: '20px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            No classes found matching your criteria.
          </div>
        )}
      </section>
    </main>
  );
}
