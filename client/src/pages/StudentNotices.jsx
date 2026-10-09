import React, { useMemo, useState } from "react";
import { FaBullhorn, FaMagnifyingGlass } from "react-icons/fa6";
import "../style/studentNotices.css";

const notices = [
  {
    id: 1,
    title: "Parent-Teacher Meeting",
    category: "Important",
    date: "2026-10-09",
    summary:
      "Parents are invited to discuss student progress with class teachers.",
    details:
      "The meeting will be held on 14 October from 9:00 AM to 12:00 PM. Please bring the student diary and arrive at the assigned classroom. Individual time slots will be shared by the class teacher.",
    isNew: true,
  },
  {
    id: 2,
    title: "Diwali Break Schedule",
    category: "Holiday",
    date: "2026-10-08",
    summary: "Please review the school holiday and reopening dates.",
    details:
      "The school holiday schedule for Diwali has been issued by the administration. Students should check the dates in their class circular and complete assigned work before the break.",
  },
  {
    id: 3,
    title: "Inter-house Competition Registration",
    category: "Activities",
    date: "2026-10-06",
    summary:
      "Share your participation choice with your class teacher by 12 October.",
    details:
      "Students may register for the art, quiz, and sports events. Please tell your class teacher which events you would like to enter. The final schedule will be shared after registration closes.",
  },
  {
    id: 4,
    title: "Updated Library Hours",
    category: "General",
    date: "2026-10-03",
    summary: "The library is open after school until 3:30 PM on weekdays.",
    details:
      "Students can use the library after classes from Monday to Friday. Please return borrowed books by the due date and carry your student identity card.",
  },
];

const categories = ["All", "Important", "Holiday", "Activities", "General"];

function StudentNotices() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const visibleNotices = useMemo(
    () =>
      notices.filter((notice) => {
        const matchesCategory =
          activeCategory === "All" || notice.category === activeCategory;
        const text =
          `${notice.title} ${notice.summary} ${notice.details}`.toLowerCase();
        return matchesCategory && text.includes(search.trim().toLowerCase());
      }),
    [activeCategory, search],
  );

  return (
    <main className="student-notices-page">
      <header className="notices-page-header">
        <div className="notices-heading-icon">
          <FaBullhorn aria-hidden="true" />
        </div>
        <div>
          <p className="notices-eyebrow">School updates</p>
          <h1>Notices</h1>
          <p>Announcements and important information from your school.</p>
        </div>
      </header>
      <section className="notices-panel" aria-label="School notices">
        <div className="notices-toolbar">
          <div>
            <h2>Latest notices</h2>
            <p>
              {visibleNotices.length}{" "}
              {visibleNotices.length === 1 ? "notice" : "notices"}
            </p>
          </div>
          <label className="notice-search">
            <FaMagnifyingGlass aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search notices"
              aria-label="Search notices"
            />
          </label>
        </div>
        <div
          className="notice-filters"
          role="group"
          aria-label="Filter notices by category"
        >
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={activeCategory === category ? "selected" : ""}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="student-notice-list">
          {visibleNotices.map((notice) => (
            <article className="student-notice" key={notice.id}>
              <div className="student-notice-date">
                <span>
                  {new Date(`${notice.date}T00:00:00`).toLocaleDateString(
                    "en-IN",
                    { day: "2-digit", month: "short" },
                  )}
                </span>
                <small>
                  {new Date(`${notice.date}T00:00:00`).getFullYear()}
                </small>
              </div>
              <div className="student-notice-content">
                <div className="student-notice-title-row">
                  <h3>{notice.title}</h3>
                  <span
                    className={`student-notice-category ${notice.category.toLowerCase()}`}
                  >
                    {notice.category}
                  </span>
                  {notice.isNew && <span className="pinned-label">New</span>}
                </div>
                <p className="student-notice-summary">{notice.summary}</p>
                <details>
                  <summary>Read details</summary>
                  <p className="student-notice-details">{notice.details}</p>
                </details>
              </div>
            </article>
          ))}
          {visibleNotices.length === 0 && (
            <p className="notices-empty">No notices match your search.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default StudentNotices;
