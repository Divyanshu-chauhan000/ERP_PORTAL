import React, { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  teacherClasses,
  teacherNotices,
  TEACHER_NOTICE_KEY,
  readDemoList,
  writeDemoList,
} from "../utils/teacherData";
import TeacherPageHeader from "../components/TeacherPageHeader";
import "../style/teacherPortal.css";

const initialForm = {
  title: "",
  detail: "",
  classId: "8-A",
  category: "Class Test",
  date: "2026-10-09",
};

function TeacherNotices() {
  const [filter, setFilter] = useState("All");
  const [showComposer, setShowComposer] = useState(false);
  const [notices, setNotices] = useState(() =>
    readDemoList(TEACHER_NOTICE_KEY, teacherNotices),
  );
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const visibleNotices = useMemo(
    () =>
      notices.filter(
        (notice) => filter === "All" || notice.category === filter,
      ),
    [filter, notices],
  );
  const categories = [
    "All",
    ...new Set(notices.map((notice) => notice.category)),
  ];

  const publishNotice = (event) => {
    event.preventDefault();
    const newNotice = {
      ...form,
      id: `NOTICE-${Date.now()}`,
      author: "Aditi Verma",
    };
    const updated = [newNotice, ...notices];
    setNotices(updated);
    writeDemoList(TEACHER_NOTICE_KEY, updated);
    setForm(initialForm);
    setShowComposer(false);
    setMessage(
      `Notice published for ${form.classId === "All assigned" ? "all assigned classes" : `Class ${form.classId}`} in this demo.`,
    );
  };

  return (
    <main className="teacher-page">
      <TeacherPageHeader
        title="Notices"
        description="Publish class tests, homework reminders, and class announcements."
      />
      <section className="teacher-panel">
        <div className="teacher-panel-heading">
          <div>
            <h2>Class notices</h2>
            <p>Notices are visible to students in the selected class.</p>
          </div>
          <button
            type="button"
            className="teacher-primary-button"
            onClick={() => {
              setShowComposer((open) => !open);
              setMessage("");
            }}
          >
            <FaPlus /> New notice
          </button>
        </div>
        {showComposer && (
          <form className="teacher-notice-form" onSubmit={publishNotice}>
            <label>
              Notice title
              <input
                required
                maxLength="100"
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                placeholder="e.g. Mathematics class test"
              />
            </label>
            <div className="teacher-notice-form-row">
              <label>
                Class
                <select
                  value={form.classId}
                  onChange={(event) =>
                    setForm({ ...form, classId: event.target.value })
                  }
                >
                  <option>All assigned</option>
                  {teacherClasses.map((group) => (
                    <option key={group.id} value={group.id}>
                      Class {group.id}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Category
                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm({ ...form, category: event.target.value })
                  }
                >
                  <option>Class Test</option>
                  <option>Homework</option>
                  <option>General</option>
                  <option>Schedule</option>
                </select>
              </label>
              <label>
                Date
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(event) =>
                    setForm({ ...form, date: event.target.value })
                  }
                />
              </label>
            </div>
            <label>
              Message
              <textarea
                required
                rows="3"
                maxLength="500"
                value={form.detail}
                onChange={(event) =>
                  setForm({ ...form, detail: event.target.value })
                }
                placeholder="Write the details students need to know"
              />
            </label>
            <div className="teacher-form-footer">
              <span className="teacher-demo-note">
                Demo only · saved to this browser
              </span>
              <button type="submit" className="teacher-primary-button">
                Publish notice
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
          <span>{visibleNotices.length} notices</span>
          <label className="teacher-field-label">
            Category
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              aria-label="Filter notices by category"
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="teacher-notice-list">
          {visibleNotices.length ? (
            visibleNotices.map((notice) => (
              <article className="teacher-notice-row" key={notice.id}>
                <time>{notice.date}</time>
                <div>
                  <div className="teacher-notice-meta">
                    <span className="teacher-notice-category">
                      {notice.category}
                    </span>
                    <span>Class {notice.classId || "All assigned"}</span>
                  </div>
                  <h3>{notice.title}</h3>
                  <p>{notice.detail}</p>
                  <small>Posted by {notice.author || "School Office"}</small>
                </div>
              </article>
            ))
          ) : (
            <p className="teacher-empty">No notices in this category.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default TeacherNotices;
