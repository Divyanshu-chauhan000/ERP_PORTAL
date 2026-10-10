import React from "react";

function TeacherPageHeader({ title, description }) {
  return (
    <header className="teacher-page-header">
      <div>
        <p className="teacher-eyebrow">Teacher workspace</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <span className="teacher-demo-note">Demo data</span>
    </header>
  );
}

export default TeacherPageHeader;
