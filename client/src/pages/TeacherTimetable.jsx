import React from "react";
import { teacherPeriodTimes, teacherTimetable } from "../utils/teacherData";
import TeacherPageHeader from "../components/TeacherPageHeader";
import "../style/teacherPortal.css";

function TeacherTimetable() {
  return (
    <main className="teacher-page">
      <TeacherPageHeader
        title="My Timetable"
        description="Your weekly teaching periods and school commitments."
      />
      <section className="teacher-panel">
        <div className="teacher-panel-heading">
          <div>
            <h2>Weekly timetable</h2>
            <p>Teaching periods and school commitments.</p>
          </div>
          <span className="teacher-demo-note">Term 2 · 2026-27</span>
        </div>
        <div className="teacher-timetable">
          {teacherTimetable.map((day) => (
            <article className="teacher-timetable-day" key={day.day}>
              <h3>{day.day}</h3>
              <div className="teacher-period-grid">
                {day.periods.map((period, index) => (
                  <div
                    className={`teacher-period ${period === "—" ? "free" : ""}`}
                    key={`${day.day}-${index}`}
                  >
                    <span>
                      Period {index + 1} · {teacherPeriodTimes[index]}
                    </span>
                    <strong>{period}</strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default TeacherTimetable;
