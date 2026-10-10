import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { teacherClasses, teacherRosters } from "../utils/teacherData";
import TeacherPageHeader from "../components/TeacherPageHeader";
import "../style/teacherPortal.css";

function TeacherAttendance() {
  const [selectedClass, setSelectedClass] = useState("8-A");
  const [statuses, setStatuses] = useState(() =>
    Object.fromEntries(
      Object.entries(teacherRosters).flatMap(([classId, roster]) =>
        roster.map((student) => [`${classId}-${student.id}`, student.status]),
      ),
    ),
  );
  const [confirmation, setConfirmation] = useState("");
  const roster = teacherRosters[selectedClass] || [];
  const presentCount = roster.filter(
    (student) => statuses[`${selectedClass}-${student.id}`] === "Present",
  ).length;

  const setStatus = (studentId, status) => {
    setStatuses((current) => ({
      ...current,
      [`${selectedClass}-${studentId}`]: status,
    }));
    setConfirmation("");
  };

  const markAllPresent = () => {
    setStatuses((current) => ({
      ...current,
      ...Object.fromEntries(
        roster.map((student) => [`${selectedClass}-${student.id}`, "Present"]),
      ),
    }));
    setConfirmation("");
  };

  return (
    <main className="teacher-page">
      <TeacherPageHeader
        title="Attendance"
        description="Review the roster and record attendance for your classes."
      />
      <section className="teacher-panel">
        <div className="teacher-panel-heading">
          <div>
            <h2>Class attendance</h2>
            <p>Friday, 09 October 2026 · Morning session</p>
          </div>
          <label className="teacher-field-label">
            Class
            <select
              value={selectedClass}
              onChange={(event) => {
                setSelectedClass(event.target.value);
                setConfirmation("");
              }}
              aria-label="Select class"
            >
              {teacherClasses.map((group) => (
                <option key={group.id} value={group.id}>
                  Class {group.id}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="teacher-attendance-toolbar">
          <span>
            {presentCount} present of {roster.length} shown
          </span>
          <button
            type="button"
            className="teacher-secondary-button"
            onClick={markAllPresent}
          >
            Mark all present
          </button>
        </div>
        <div className="teacher-attendance-list">
          {roster.map((student) => {
            const status =
              statuses[`${selectedClass}-${student.id}`] || "Present";
            return (
              <div className="teacher-attendance-row" key={student.id}>
                <span className="teacher-roll">
                  {String(student.roll).padStart(2, "0")}
                </span>
                <div className="teacher-person">
                  <strong>{student.name}</strong>
                  <small>{student.id}</small>
                </div>
                <div
                  className="teacher-attendance-options"
                  role="group"
                  aria-label={`Attendance for ${student.name}`}
                >
                  {["Present", "Absent", "Leave"].map((option) => (
                    <button
                      type="button"
                      key={option}
                      aria-pressed={status === option}
                      className={`${status === option ? "selected" : ""} ${option.toLowerCase()}`}
                      onClick={() => setStatus(student.id, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="teacher-form-footer">
          <span className="teacher-demo-note">
            Demo only · not connected to the server
          </span>
          <button
            type="button"
            className="teacher-primary-button"
            onClick={() =>
              setConfirmation(
                `Demo attendance saved for Class ${selectedClass}.`,
              )
            }
          >
            <FaCheck /> Save attendance
          </button>
        </div>
        {confirmation && (
          <p className="teacher-confirmation" role="status">
            {confirmation}
          </p>
        )}
      </section>
    </main>
  );
}

export default TeacherAttendance;
