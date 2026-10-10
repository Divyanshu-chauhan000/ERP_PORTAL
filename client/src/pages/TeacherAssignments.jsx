import React, { useMemo, useState } from "react";
import { FaBookOpen, FaPlus } from "react-icons/fa6";
import {
  initialAssignments,
  teacherClasses,
  TEACHER_ASSIGNMENT_KEY,
  readDemoList,
  writeDemoList,
} from "../utils/teacherData";
import TeacherPageHeader from "../components/TeacherPageHeader";
import "../style/teacherPortal.css";

const emptyAssignment = {
  title: "",
  classId: "8-A",
  subject: "Mathematics",
  type: "Homework",
  dueDate: "2026-10-16",
  description: "",
  notes: "",
  resource: "",
};

function TeacherAssignments() {
  const [assignments, setAssignments] = useState(() =>
    readDemoList(TEACHER_ASSIGNMENT_KEY, initialAssignments),
  );
  const [selectedClass, setSelectedClass] = useState("All");
  const [showComposer, setShowComposer] = useState(false);
  const [form, setForm] = useState(emptyAssignment);
  const [message, setMessage] = useState("");
  const selectedGroup = teacherClasses.find(
    (group) => group.id === form.classId,
  );
  const visibleAssignments = useMemo(
    () =>
      assignments.filter(
        (assignment) =>
          selectedClass === "All" || assignment.classId === selectedClass,
      ),
    [assignments, selectedClass],
  );

  const updateClass = (classId) => {
    const group = teacherClasses.find((item) => item.id === classId);
    setForm((current) => ({
      ...current,
      classId,
      subject: group?.subjects[0] || "Mathematics",
    }));
  };

  const publishAssignment = (event) => {
    event.preventDefault();
    const updated = [
      {
        ...form,
        id: `ASSIGN-${Date.now()}`,
        assignedDate: new Date().toISOString().slice(0, 10),
        teacher: "Aditi Verma",
      },
      ...assignments,
    ];
    setAssignments(updated);
    writeDemoList(TEACHER_ASSIGNMENT_KEY, updated);
    setForm(emptyAssignment);
    setShowComposer(false);
    setMessage(`Assignment shared with Class ${form.classId} in this demo.`);
  };

  return (
    <main className="teacher-page">
      <TeacherPageHeader
        title="Assignments & Notes"
        description="Share homework, classwork, and subject notes with your students."
      />
      <section className="teacher-panel">
        <div className="teacher-panel-heading">
          <div>
            <h2>Class assignments</h2>
            <p>Students see items for their assigned class.</p>
          </div>
          <button
            type="button"
            className="teacher-primary-button"
            onClick={() => {
              setShowComposer((open) => !open);
              setMessage("");
            }}
          >
            <FaPlus /> New assignment
          </button>
        </div>
        {showComposer && (
          <form
            className="teacher-assignment-form"
            onSubmit={publishAssignment}
          >
            <div className="teacher-form-grid">
              <label>
                Title
                <input
                  required
                  maxLength="100"
                  value={form.title}
                  onChange={(event) =>
                    setForm({ ...form, title: event.target.value })
                  }
                  placeholder="Assignment title"
                />
              </label>
              <label>
                Type
                <select
                  value={form.type}
                  onChange={(event) =>
                    setForm({ ...form, type: event.target.value })
                  }
                >
                  <option>Homework</option>
                  <option>Classwork</option>
                  <option>Notes</option>
                </select>
              </label>
              <label>
                Class
                <select
                  value={form.classId}
                  onChange={(event) => updateClass(event.target.value)}
                >
                  {teacherClasses.map((group) => (
                    <option value={group.id} key={group.id}>
                      Class {group.id}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Subject
                <select
                  value={form.subject}
                  onChange={(event) =>
                    setForm({ ...form, subject: event.target.value })
                  }
                >
                  {selectedGroup?.subjects.map((subject) => (
                    <option key={subject}>{subject}</option>
                  ))}
                </select>
              </label>
              <label>
                Due date
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(event) =>
                    setForm({ ...form, dueDate: event.target.value })
                  }
                />
              </label>
            </div>
            <label>
              Instructions
              <textarea
                required
                rows="3"
                maxLength="600"
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
                placeholder="What should students complete?"
              />
            </label>
            <label>
              Notes or resource
              <input
                value={form.resource}
                onChange={(event) =>
                  setForm({ ...form, resource: event.target.value })
                }
                placeholder="Chapter, lesson notes, or resource name"
              />
            </label>
            <div className="teacher-form-footer">
              <span className="teacher-demo-note">
                Demo only · saved to this browser
              </span>
              <button type="submit" className="teacher-primary-button">
                Share with class
              </button>
            </div>
          </form>
        )}
        {message && (
          <p className="teacher-confirmation" role="status">
            {message}
          </p>
        )}
        <div className="teacher-notice-toolbar">
          <span>{visibleAssignments.length} assignments / notes</span>
          <label className="teacher-field-label">
            Class
            <select
              value={selectedClass}
              onChange={(event) => setSelectedClass(event.target.value)}
            >
              <option value="All">All classes</option>
              {teacherClasses.map((group) => (
                <option key={group.id} value={group.id}>
                  Class {group.id}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="teacher-assignment-list">
          {visibleAssignments.length ? (
            visibleAssignments.map((assignment) => (
              <article className="teacher-assignment-row" key={assignment.id}>
                <span className="teacher-assignment-icon">
                  <FaBookOpen />
                </span>
                <div className="teacher-assignment-content">
                  <div className="teacher-assignment-tags">
                    <span>{assignment.type}</span>
                    <span>Class {assignment.classId}</span>
                    <span>{assignment.subject}</span>
                  </div>
                  <h3>{assignment.title}</h3>
                  <p>{assignment.description}</p>
                  {assignment.notes && (
                    <p className="teacher-assignment-notes">
                      Notes: {assignment.notes}
                    </p>
                  )}
                  {assignment.resource && (
                    <small>Resource: {assignment.resource}</small>
                  )}
                </div>
                <time>
                  Due{" "}
                  {new Date(
                    `${assignment.dueDate}T00:00:00`,
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })}
                </time>
              </article>
            ))
          ) : (
            <p className="teacher-empty">No assignments for this class yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default TeacherAssignments;
