import React, { useState } from "react";
import {
  teacherClasses,
  teacherRosters,
  TEACHER_RESULT_KEY,
  readDemoList,
  writeDemoList,
} from "../utils/teacherData";
import TeacherPageHeader from "../components/TeacherPageHeader";
import "../style/teacherPortal.css";

function TeacherExams() {
  const [selectedClass, setSelectedClass] = useState("8-A");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [examType, setExamType] = useState("PT 1");
  const [maxMarks, setMaxMarks] = useState("100");
  const assessmentKey = `${selectedClass}|${selectedSubject}|${examType}`;
  const [marksByAssessment, setMarksByAssessment] = useState(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("erpDemoExamDrafts") || "{}",
      );
      return {
        ...stored,
        "8-A|Mathematics|PT 1": stored["8-A|Mathematics|PT 1"] || {
          S0801: "82",
          S0802: "91",
          S0803: "74",
          S0804: "",
          S0805: "",
          S0806: "88",
        },
      };
    } catch {
      return {
        "8-A|Mathematics|PT 1": {
          S0801: "82",
          S0802: "91",
          S0803: "74",
          S0804: "",
          S0805: "",
          S0806: "88",
        },
      };
    }
  });
  const [confirmation, setConfirmation] = useState("");
  const roster = teacherRosters[selectedClass] || [];
  const marks = marksByAssessment[assessmentKey] || {};
  const pendingCount = roster.filter(
    (student) => marks[student.id] === undefined || marks[student.id] === "",
  ).length;
  const availableSubjects =
    teacherClasses.find((group) => group.id === selectedClass)?.subjects || [];

  const updateClass = (classId) => {
    const subjects =
      teacherClasses.find((group) => group.id === classId)?.subjects || [];
    setSelectedClass(classId);
    setSelectedSubject(subjects[0] || "Mathematics");
    setConfirmation("");
  };

  const updateMark = (studentId, value) => {
    setMarksByAssessment((current) => {
      const updated = {
        ...current,
        [assessmentKey]: { ...current[assessmentKey], [studentId]: value },
      };
      localStorage.setItem("erpDemoExamDrafts", JSON.stringify(updated));
      return updated;
    });
    setConfirmation("");
  };

  const saveDraft = () =>
    setConfirmation(
      `Draft saved for Class ${selectedClass} · ${selectedSubject} · ${examType} in this browser.`,
    );

  const publishResults = () => {
    if (pendingCount) {
      setConfirmation(
        `Enter marks for all ${pendingCount} remaining students before publishing.`,
      );
      return;
    }
    const assessment = {
      id: assessmentKey,
      classId: selectedClass,
      subject: selectedSubject,
      examType,
      maxMarks: Number(maxMarks),
      publishedDate: new Date().toISOString().slice(0, 10),
      students: roster.map((student) => ({
        studentId: student.id,
        name: student.name,
        marks: Number(marks[student.id]),
      })),
    };
    const stored = readDemoList(TEACHER_RESULT_KEY, []);
    writeDemoList(TEACHER_RESULT_KEY, [
      assessment,
      ...stored.filter((item) => item.id !== assessment.id),
    ]);
    setConfirmation(
      `Results published for Class ${selectedClass} · ${selectedSubject} · ${examType}. The matching demo student can see their result in Student Exams.`,
    );
  };

  return (
    <main className="teacher-page">
      <TeacherPageHeader
        title="Exams & Marks"
        description="Enter and review assessment marks for your classes."
      />
      <section className="teacher-panel">
        <div className="teacher-panel-heading">
          <div>
            <h2>Assessment marks</h2>
            <p>Only your assigned classes and subjects are available.</p>
          </div>
          <span className="teacher-demo-note">Demo data</span>
        </div>
        <div className="teacher-assessment-filters">
          <label className="teacher-field-label">
            Class
            <select
              value={selectedClass}
              onChange={(event) => updateClass(event.target.value)}
            >
              {teacherClasses.map((group) => (
                <option key={group.id} value={group.id}>
                  Class {group.id}
                </option>
              ))}
            </select>
          </label>
          <label className="teacher-field-label">
            Subject
            <select
              value={selectedSubject}
              onChange={(event) => {
                setSelectedSubject(event.target.value);
                setConfirmation("");
              }}
            >
              {availableSubjects.map((subject) => (
                <option key={subject}>{subject}</option>
              ))}
            </select>
          </label>
          <label className="teacher-field-label">
            Exam
            <select
              value={examType}
              onChange={(event) => {
                setExamType(event.target.value);
                setConfirmation("");
              }}
            >
              <option>PT 1</option>
              <option>PT 2</option>
              <option>Mid Term</option>
              <option>Final Exam</option>
            </select>
          </label>
          <label className="teacher-field-label">
            Max marks
            <input
              type="number"
              min="1"
              value={maxMarks}
              onChange={(event) => setMaxMarks(event.target.value)}
            />
          </label>
        </div>
        <div className="teacher-assessment-summary">
          <span>
            <strong>{roster.length}</strong> students
          </span>
          <span>
            <strong>{pendingCount}</strong> marks pending
          </span>
          <span>
            <strong>{roster.length - pendingCount}</strong> entered
          </span>
        </div>
        <div className="teacher-marks-list">
          {roster.map((student) => (
            <label className="teacher-mark-row" key={student.id}>
              <span className="teacher-roll">
                {String(student.roll).padStart(2, "0")}
              </span>
              <span className="teacher-person">
                <strong>{student.name}</strong>
                <small>{student.id}</small>
              </span>
              <span className="teacher-mark-input">
                <input
                  type="number"
                  min="0"
                  max={maxMarks}
                  value={marks[student.id] ?? ""}
                  onChange={(event) =>
                    updateMark(student.id, event.target.value)
                  }
                  aria-label={`Marks for ${student.name}`}
                  placeholder="—"
                />
                <small>/ {maxMarks}</small>
              </span>
            </label>
          ))}
        </div>
        <div className="teacher-form-footer">
          <span className="teacher-demo-note">
            Drafts and published marks are stored in this browser only.
          </span>
          <div className="teacher-exam-actions">
            <button
              type="button"
              className="teacher-secondary-button"
              onClick={saveDraft}
            >
              Save draft
            </button>
            <button
              type="button"
              className="teacher-primary-button"
              onClick={publishResults}
            >
              Publish results
            </button>
          </div>
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

export default TeacherExams;
