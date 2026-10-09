import React, { useState } from "react";
import { FaFileLines, FaFilePdf } from "react-icons/fa6";
import "../style/studentDocuments.css";

const documents = [
  {
    id: 1,
    name: "Student Identity Card",
    category: "Identity",
    date: "2026-04-08",
    status: "Verified",
    description: "Current academic session identity record",
  },
  {
    id: 2,
    name: "Birth Certificate",
    category: "Identity",
    date: "2026-04-08",
    status: "Verified",
    description: "Submitted during admission",
  },
  {
    id: 3,
    name: "Class 7 Report Card",
    category: "Academic",
    date: "2026-04-12",
    status: "Verified",
    description: "Previous academic year result",
  },
  {
    id: 4,
    name: "Term 1 Fee Receipt",
    category: "Fees",
    date: "2026-07-15",
    status: "Verified",
    description: "Payment receipt for the first term",
  },
  {
    id: 5,
    name: "Transport Permission Form",
    category: "Other",
    date: "2026-09-02",
    status: "Pending",
    description: "Awaiting office verification",
  },
];

const categories = ["All", "Identity", "Academic", "Fees", "Other"];

function StudentDocuments() {
  const [activeCategory, setActiveCategory] = useState("All");
  const visibleDocuments = documents.filter(
    (document) =>
      activeCategory === "All" || document.category === activeCategory,
  );

  return (
    <main className="student-documents-page">
      <header className="documents-page-header">
        <div>
          <p className="documents-eyebrow">Student records</p>
          <h1>My Documents</h1>
          <p>View the documents recorded for your student profile.</p>
        </div>
        <div className="document-count">
          <strong>{documents.length}</strong>
          <span>Documents</span>
        </div>
      </header>

      <section className="documents-panel" aria-label="Student documents">
        <div className="documents-panel-header">
          <div>
            <h2>Document Register</h2>
            <p>School records and submitted forms</p>
          </div>
          <span className="records-label">
            {visibleDocuments.length} records
          </span>
        </div>

        <div
          className="document-filters"
          role="group"
          aria-label="Filter documents by category"
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

        <div className="document-list">
          {visibleDocuments.map((document) => (
            <article className="document-row" key={document.id}>
              <div className="document-file-icon">
                {document.category === "Other" ? (
                  <FaFileLines aria-hidden="true" />
                ) : (
                  <FaFilePdf aria-hidden="true" />
                )}
              </div>
              <div className="document-info">
                <h3>{document.name}</h3>
                <p>{document.description}</p>
              </div>
              <div className="document-meta">
                <span className="document-category">{document.category}</span>
                <span>
                  Added{" "}
                  {new Date(`${document.date}T00:00:00`).toLocaleDateString(
                    "en-IN",
                    { day: "2-digit", month: "short", year: "numeric" },
                  )}
                </span>
              </div>
              <span
                className={`document-status ${document.status.toLowerCase()}`}
              >
                <span className="status-dot" />
                {document.status}
              </span>
            </article>
          ))}
          {visibleDocuments.length === 0 && (
            <p className="documents-empty">No documents in this category.</p>
          )}
        </div>
        <p className="documents-footnote">
          For corrections or missing records, contact the school office.
        </p>
      </section>
    </main>
  );
}

export default StudentDocuments;
