import React, { useState } from "react";
import { teacherClasses, teacherRosters } from "../utils/teacherData";
import TeacherPageHeader from "../components/TeacherPageHeader";
import "../style/teacherPortal.css";

function TeacherClasses() {
  const [selectedClass, setSelectedClass] = useState("8-A");
  const roster = teacherRosters[selectedClass] || [];
  const currentClass = teacherClasses.find(
    (group) => group.id === selectedClass,
  );

  return (
    <main className="teacher-page">
      <TeacherPageHeader
        title="My Classes"
        description="Your assigned groups and student rosters."
      />
      <section className="teacher-panel">
        <div className="teacher-panel-heading">
          <div>
            <h2>Assigned classes</h2>
            <p>Classes and subjects assigned to you this term.</p>
          </div>
          <span className="teacher-demo-note">Demo data</span>
        </div>
        <div className="teacher-class-grid">
          {teacherClasses.map((group) => (
            <button
              type="button"
              className={`teacher-class-card ${selectedClass === group.id ? "selected" : ""}`}
              key={group.id}
              onClick={() => setSelectedClass(group.id)}
            >
              <span>Class {group.id}</span>
              <strong>{group.subject}</strong>
              <small>
                {group.students} students · {group.room}
              </small>
              {group.classTeacher && (
                <span className="teacher-class-teacher-label">
                  Class teacher
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="teacher-roster-heading">
          <div>
            <h3>Class {selectedClass} roster</h3>
            <p>
              {roster.length} sample students · {currentClass?.students}{" "}
              students total
            </p>
          </div>
        </div>
        <div className="teacher-table-wrap">
          <table className="teacher-table">
            <thead>
              <tr>
                <th>Roll</th>
                <th>Student</th>
                <th>Student ID</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {roster.map((student) => (
                <tr key={student.id}>
                  <td>{student.roll}</td>
                  <td>
                    <strong>{student.name}</strong>
                  </td>
                  <td>{student.id}</td>
                  <td>
                    <span
                      className={`teacher-status ${student.status.toLowerCase()}`}
                    >
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default TeacherClasses;
