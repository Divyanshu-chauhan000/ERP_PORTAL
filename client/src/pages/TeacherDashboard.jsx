import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaClipboardCheck,
  FaClock,
  FaUsers,
} from "react-icons/fa6";
import { teacherClasses, teacherSchedule } from "../utils/teacherData";
import "../style/teacherPortal.css";

function TeacherDashboard() {
  const navigate = useNavigate();

  return (
    <main className="teacher-page">
      <header className="teacher-welcome">
        <div>
          <p className="teacher-eyebrow">Friday · 09 October 2026</p>
          <h1>Good morning, Aditi</h1>
          <p>Here is your teaching day at a glance.</p>
        </div>
        <div className="teacher-subject-badge">
          <span className="teacher-avatar">AV</span>
          <span>
            Mathematics
            <br />
            Middle School
          </span>
        </div>
      </header>

      <section className="teacher-stats" aria-label="Teaching overview">
        <div className="teacher-stat">
          <span>Assigned classes</span>
          <strong>3</strong>
          <small>Across 2 grades</small>
        </div>
        <div className="teacher-stat">
          <span>Students</span>
          <strong>90</strong>
          <small>On your rosters</small>
        </div>
        <div className="teacher-stat">
          <span>Attendance</span>
          <strong>1</strong>
          <small>Class pending today</small>
        </div>
        <div className="teacher-stat">
          <span>Marks pending</span>
          <strong>2</strong>
          <small>Mid-term assessment</small>
        </div>
      </section>

      <div className="teacher-dashboard-grid">
        <section className="teacher-panel">
          <div className="teacher-panel-heading">
            <div>
              <h2>Today's schedule</h2>
              <p>8 periods · Friday</p>
            </div>
            <button
              type="button"
              className="teacher-link-button"
              onClick={() => navigate("/teacher-timetable")}
            >
              Timetable <FaArrowRight />
            </button>
          </div>
          <div className="teacher-schedule-list">
            {teacherSchedule.map((item, index) => (
              <div
                className="teacher-schedule-row"
                key={`${item.time}-${item.classId || item.subject}`}
              >
                <span className="teacher-time">
                  <FaClock />P{index + 1} · {item.time}
                </span>
                <div>
                  <strong>
                    {item.classId
                      ? `Class ${item.classId} · ${item.subject}`
                      : item.subject}
                  </strong>
                  <small>
                    {item.room} · {item.kind}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="teacher-panel">
          <div className="teacher-panel-heading">
            <div>
              <h2>Needs attention</h2>
              <p>Quick follow-up items</p>
            </div>
          </div>
          <button
            type="button"
            className="teacher-action-row"
            onClick={() => navigate("/teacher-attendance")}
          >
            <span className="teacher-action-icon attendance">
              <FaCalendarCheck />
            </span>
            <span>
              <strong>Complete attendance</strong>
              <small>Class 8-A · Period 1</small>
            </span>
            <FaArrowRight className="teacher-action-arrow" />
          </button>
          <button
            type="button"
            className="teacher-action-row"
            onClick={() => navigate("/teacher-exams")}
          >
            <span className="teacher-action-icon marks">
              <FaClipboardCheck />
            </span>
            <span>
              <strong>Enter assessment marks</strong>
              <small>2 students pending</small>
            </span>
            <FaArrowRight className="teacher-action-arrow" />
          </button>
          <button
            type="button"
            className="teacher-action-row"
            onClick={() => navigate("/teacher-assignments")}
          >
            <span className="teacher-action-icon marks">
              <FaClipboardCheck />
            </span>
            <span>
              <strong>Share class work</strong>
              <small>Assignments and lesson notes</small>
            </span>
            <FaArrowRight className="teacher-action-arrow" />
          </button>
        </section>
      </div>

      <section className="teacher-panel">
        <div className="teacher-panel-heading">
          <div>
            <h2>My classes</h2>
            <p>Assigned groups this term</p>
          </div>
          <button
            type="button"
            className="teacher-link-button"
            onClick={() => navigate("/teacher-classes")}
          >
            All classes <FaArrowRight />
          </button>
        </div>
        <div className="teacher-class-grid">
          {teacherClasses.map((group) => (
            <button
              type="button"
              className="teacher-class-card"
              key={group.id}
              onClick={() => navigate("/teacher-classes")}
            >
              <span>Class {group.id}</span>
              <strong>{group.subject}</strong>
              <small>
                <FaUsers /> {group.students} students · {group.room}
              </small>
              {group.classTeacher && (
                <span className="teacher-class-teacher-label">
                  Class teacher
                </span>
              )}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default TeacherDashboard;
