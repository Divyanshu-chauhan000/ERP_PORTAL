import React, { useState } from "react";
import { FaCalendarCheck, FaTrophy, FaClock, FaBookOpen } from "react-icons/fa";
import {
  DEMO_STUDENT_CLASS,
  DEMO_STUDENT_ID,
  TEACHER_RESULT_KEY,
  readDemoList,
} from "../utils/teacherData";
import "../style/studentExam.css";

const upcomingExams = [
  {
    id: 1,
    subject: "Mathematics",
    date: "14-10-2026",
    time: "10:00 AM - 01:00 PM",
    syllabus: "Chapters 1-5 · Algebra",
    type: "Mid Term",
  },
  {
    id: 2,
    subject: "Science",
    date: "16-10-2026",
    time: "10:00 AM - 01:00 PM",
    syllabus: "Physics & Chemistry Basics",
    type: "Mid Term",
  },
  {
    id: 3,
    subject: "English",
    date: "20-10-2026",
    time: "10:00 AM - 12:30 PM",
    syllabus: "Grammar & Literature",
    type: "PT 1",
  },
];

const pastResults = [
  {
    id: 1,
    subject: "English",
    maxMarks: 100,
    obtained: 85,
    grade: "A",
    status: "Pass",
    class: "Class 8",
    type: "Mid Term",
  },
  {
    id: 2,
    subject: "Hindi",
    maxMarks: 100,
    obtained: 78,
    grade: "B+",
    status: "Pass",
    class: "Class 8",
    type: "Mid Term",
  },
  {
    id: 3,
    subject: "Computer",
    maxMarks: 50,
    obtained: 48,
    grade: "A+",
    status: "Pass",
    class: "Class 7",
    type: "Final Exam",
  },
  {
    id: 4,
    subject: "Mathematics",
    maxMarks: 100,
    obtained: 32,
    grade: "D",
    status: "Fail",
    class: "Class 8",
    type: "PT 1",
  },
];

const examTypes = ["All Exams", "PT 1", "PT 2", "Mid Term", "Final Exam"];
const resultTypes = examTypes;

function getDateParts(dateText) {
  const [day, month, year] = dateText.split("-");
  const date = new Date(`${year}-${month}-${day}T00:00:00`);
  return {
    day,
    month: date.toLocaleDateString("en", { month: "short" }).toUpperCase(),
  };
}

function getGrade(percentage) {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  return "D";
}

function StudentExams() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [examTypeFilter, setExamTypeFilter] = useState("All Exams");
  const [resultClassFilter, setResultClassFilter] = useState("All Classes");
  const [resultTypeFilter, setResultTypeFilter] = useState("All Exams");
  const [publishedAssessments] = useState(() =>
    readDemoList(TEACHER_RESULT_KEY, []),
  );

  const publishedResults = publishedAssessments
    .filter((assessment) => assessment.classId === DEMO_STUDENT_CLASS)
    .flatMap((assessment) => {
      const studentResult = (assessment.students || []).find(
        (student) => student.studentId === DEMO_STUDENT_ID,
      );
      if (!studentResult) return [];
      const percentage = Math.round(
        (studentResult.marks / assessment.maxMarks) * 100,
      );
      return [
        {
          id: `${assessment.id}-${studentResult.studentId}`,
          subject: assessment.subject,
          maxMarks: assessment.maxMarks,
          obtained: studentResult.marks,
          grade: getGrade(percentage),
          status: percentage >= 33 ? "Pass" : "Fail",
          class: `Class ${assessment.classId}`,
          type: assessment.examType,
        },
      ];
    });
  const allResults = [...publishedResults, ...pastResults];
  const resultClasses = [
    "All Classes",
    ...new Set(allResults.map((result) => result.class)),
  ];
  const visibleExams = upcomingExams.filter(
    (exam) => examTypeFilter === "All Exams" || exam.type === examTypeFilter,
  );
  const visibleResults = allResults.filter(
    (result) =>
      (resultClassFilter === "All Classes" ||
        result.class === resultClassFilter) &&
      (resultTypeFilter === "All Exams" || result.type === resultTypeFilter),
  );
  const averageScore = Math.round(
    allResults.reduce(
      (sum, result) => sum + (result.obtained / result.maxMarks) * 100,
      0,
    ) / allResults.length,
  );

  return (
    <main className="exams-container">
      <header className="student-exams-header">
        <div>
          <p className="student-exams-eyebrow">Academic session 2026-27</p>
          <h1>Exams & Results</h1>
          <p>Your exam schedule and published scores.</p>
        </div>
        <div className="exam-overview" aria-label="Exam overview">
          <div>
            <span>Upcoming</span>
            <strong>{upcomingExams.length}</strong>
          </div>
          <div>
            <span>Results</span>
            <strong>{allResults.length}</strong>
          </div>
          <div>
            <span>Average</span>
            <strong>{averageScore}%</strong>
          </div>
        </div>
      </header>

      <div className="tabs-container" role="tablist" aria-label="Exam views">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "upcoming"}
          className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          <FaCalendarCheck aria-hidden="true" /> Upcoming Exams{" "}
          <span>{upcomingExams.length}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "results"}
          className={`tab-btn ${activeTab === "results" ? "active" : ""}`}
          onClick={() => setActiveTab("results")}
        >
          <FaTrophy aria-hidden="true" /> Past Results{" "}
          <span>{allResults.length}</span>
        </button>
      </div>

      {activeTab === "upcoming" ? (
        <section className="student-exam-panel" role="tabpanel">
          <div className="student-exam-panel-header">
            <div className="student-exam-panel-title">
              <span className="student-exam-panel-icon schedule">
                <FaCalendarCheck aria-hidden="true" />
              </span>
              <div>
                <h2>Exam schedule</h2>
                <p>{visibleExams.length} exams listed</p>
              </div>
            </div>
            <label className="exam-filter-label">
              <span>Exam type</span>
              <select
                value={examTypeFilter}
                onChange={(event) => setExamTypeFilter(event.target.value)}
              >
                {examTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {visibleExams.length ? (
            <div className="student-exam-list">
              {visibleExams.map((exam) => {
                const date = getDateParts(exam.date);
                return (
                  <article className="student-exam-row" key={exam.id}>
                    <div className="exam-date-block">
                      <strong>{date.day}</strong>
                      <span>{date.month}</span>
                    </div>
                    <div className="student-exam-main">
                      <div className="student-exam-title-line">
                        <h3>{exam.subject}</h3>
                        <span className="student-exam-type">{exam.type}</span>
                      </div>
                      <p className="exam-syllabus">
                        <FaBookOpen aria-hidden="true" /> {exam.syllabus}
                      </p>
                    </div>
                    <div className="student-exam-time">
                      <FaClock aria-hidden="true" />
                      <span>{exam.time}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="exam-empty">No exams match this filter.</p>
          )}
        </section>
      ) : (
        <section className="student-exam-panel" role="tabpanel">
          <div className="student-exam-panel-header">
            <div className="student-exam-panel-title">
              <span className="student-exam-panel-icon results">
                <FaTrophy aria-hidden="true" />
              </span>
              <div>
                <h2>Published results</h2>
                <p>{visibleResults.length} results shown</p>
              </div>
            </div>
            <div className="result-filters">
              <label className="exam-filter-label">
                <span>Class</span>
                <select
                  value={resultClassFilter}
                  onChange={(event) => setResultClassFilter(event.target.value)}
                >
                  {resultClasses.map((schoolClass) => (
                    <option key={schoolClass}>{schoolClass}</option>
                  ))}
                </select>
              </label>
              <label className="exam-filter-label">
                <span>Exam type</span>
                <select
                  value={resultTypeFilter}
                  onChange={(event) => setResultTypeFilter(event.target.value)}
                >
                  {resultTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          {visibleResults.length ? (
            <div className="student-results-list">
              {visibleResults.map((result) => {
                const score = Math.round(
                  (result.obtained / result.maxMarks) * 100,
                );
                return (
                  <article className="student-result-row" key={result.id}>
                    <div className="student-result-heading">
                      <div>
                        <h3>{result.subject}</h3>
                        <p>
                          {result.class} <span>·</span> {result.type}
                        </p>
                      </div>
                      <span
                        className={`student-grade grade-${result.grade.charAt(0).toLowerCase()}`}
                      >
                        {result.grade}
                      </span>
                    </div>
                    <div className="student-result-score">
                      <div className="score-bar">
                        <span style={{ width: `${score}%` }} />
                      </div>
                      <span>
                        {result.obtained}
                        <small> / {result.maxMarks}</small>
                      </span>
                      <span
                        className={`student-result-status ${result.status.toLowerCase()}`}
                      >
                        {result.status}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="exam-empty">No results match these filters.</p>
          )}
        </section>
      )}
    </main>
  );
}

export default StudentExams;
