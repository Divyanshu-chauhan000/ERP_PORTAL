import React, { useMemo, useState } from "react";
import { FaBookOpen, FaCalendarDays } from "react-icons/fa6";
import {
  DEMO_STUDENT_CLASS,
  TEACHER_ASSIGNMENT_KEY,
  initialAssignments,
  readDemoList,
} from "../utils/teacherData";
import "../style/studentAssignments.css";

function StudentAssignments() {
  const [filter, setFilter] = useState("All");
  const assignments = useMemo(
    () =>
      readDemoList(TEACHER_ASSIGNMENT_KEY, initialAssignments).filter(
        (assignment) => assignment.classId === DEMO_STUDENT_CLASS,
      ),
    [],
  );
  const visibleAssignments =
    filter === "All"
      ? assignments
      : assignments.filter((assignment) => assignment.type === filter);
  const categories = [
    "All",
    ...new Set(assignments.map((assignment) => assignment.type)),
  ];

  return (
    <main className="student-assignments-page">
      <header className="student-assignments-header">
        <div>
          <p className="student-assignment-kicker">
            Class {DEMO_STUDENT_CLASS}
          </p>
          <h1>Assignments & Notes</h1>
          <p>Work and learning notes shared by your teachers.</p>
        </div>
        <span className="student-assignment-count">
          {assignments.length} items
        </span>
      </header>
      <section className="student-assignments-panel">
        <div className="student-assignment-toolbar">
          <div>
            <h2>Class work</h2>
            <p>Latest assignments and revision notes</p>
          </div>
          <div
            className="student-assignment-filters"
            role="group"
            aria-label="Filter assignments"
          >
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={filter === category ? "active" : ""}
                aria-pressed={filter === category}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="student-assignment-list">
          {visibleAssignments.length ? (
            visibleAssignments.map((assignment) => (
              <article className="student-assignment-row" key={assignment.id}>
                <span className="student-assignment-icon">
                  <FaBookOpen aria-hidden="true" />
                </span>
                <div className="student-assignment-content">
                  <div className="student-assignment-tags">
                    <span>{assignment.type}</span>
                    <span>{assignment.subject}</span>
                    <span>From {assignment.teacher || "Class teacher"}</span>
                  </div>
                  <h3>{assignment.title}</h3>
                  <p>{assignment.description}</p>
                  {assignment.notes && (
                    <p className="student-assignment-notes">
                      <strong>Teacher notes:</strong> {assignment.notes}
                    </p>
                  )}
                  {assignment.resource && (
                    <span className="student-assignment-resource">
                      Resource: {assignment.resource}
                    </span>
                  )}
                </div>
                <div className="student-assignment-due">
                  <FaCalendarDays aria-hidden="true" />
                  <span>Due</span>
                  <strong>
                    {new Date(
                      `${assignment.dueDate}T00:00:00`,
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </strong>
                </div>
              </article>
            ))
          ) : (
            <p className="student-assignment-empty">
              No assignments in this category.
            </p>
          )}
        </div>
        <p className="student-assignment-demo-note">
          Demo class: {DEMO_STUDENT_CLASS}. Teacher-posted items appear here
          when they target this class.
        </p>
      </section>
    </main>
  );
}

export default StudentAssignments;
