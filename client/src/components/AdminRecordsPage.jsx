import React, { useMemo, useState } from "react";
import { FaMagnifyingGlass, FaPlus, FaXmark } from "react-icons/fa6";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { readAdminCollection, writeAdminCollection } from "../utils/adminDemoData";
import "../style/adminRecords.css";

const modules = {
  students: {
    title: "Students", description: "Manage student profiles, class placement, and contact details.", idKey: "student_id", searchKeys: ["student_id", "student_name", "class_id", "student_contact"],
    columns: [["student_id", "Student ID"], ["student_name", "Student name"], ["class_id", "Class"], ["student_contact", "Contact"], ["student_admission_date", "Admission date"]],
    fields: [["student_name", "Student name", "text"], ["student_dob", "Date of birth", "date"], ["student_gender", "Gender", "select", ["Female", "Male", "Other"]], ["student_address", "Address", "text"], ["student_contact", "Contact", "tel"], ["student_admission_date", "Admission date", "date"], ["class_id", "Class ID", "number"]],
  },
  teachers: {
    title: "Teachers", description: "Maintain staff records, specialisations, and class-teacher assignments.", idKey: "teacher_id", searchKeys: ["teacher_id", "teacher_name", "teacher_contact", "teacher_subject_specialisation"],
    columns: [["teacher_id", "Teacher ID"], ["teacher_name", "Teacher name"], ["teacher_subject_specialisation", "Specialisation"], ["class_teacher_of", "Class teacher"], ["teacher_contact", "Contact"], ["monthly_salary", "Monthly salary"]],
    fields: [["teacher_name", "Teacher name", "text"], ["teacher_contact", "Contact", "tel"], ["teacher_subject_specialisation", "Subject specialisation", "text"], ["teacher_joining_date", "Joining date", "date"], ["class_teacher_of", "Class teacher of", "text"], ["monthly_salary", "Monthly salary", "number"]],
  },
  classes: {
    title: "Classes", description: "Manage class sections, capacity, rooms, and class teachers.", idKey: "class_id", searchKeys: ["class_id", "class_name", "class_section", "class_teacher_name"],
    columns: [["class_id", "Class ID"], ["class_name", "Class"], ["class_section", "Section"], ["numberOfstudents", "Students"], ["class_teacher_name", "Class teacher"], ["room", "Room"]],
    fields: [["class_name", "Class", "text"], ["class_section", "Section", "text"], ["numberOfstudents", "Student count", "number"], ["class_teacher_name", "Class teacher", "text"], ["room", "Room", "text"]],
  },
  subjects: {
    title: "Subjects", description: "Manage the curriculum and teacher/class assignments.", idKey: "subject_id", searchKeys: ["subject_id", "subject_name", "class_id", "teacher_name"],
    columns: [["subject_id", "Subject ID"], ["subject_name", "Subject"], ["class_id", "Class"], ["teacher_name", "Teacher"]],
    fields: [["subject_name", "Subject name", "text"], ["class_id", "Class ID", "number"], ["teacher_name", "Assigned teacher", "text"]],
  },
  attendences: {
    title: "Attendance", description: "Review daily attendance records and correct entries.", idKey: "attendence_id", searchKeys: ["attendence_id", "student_id", "class_id", "teacher_id", "attendence_status"], filterKey: "attendence_status", filterLabel: "All statuses",
    columns: [["attendence_id", "Record ID"], ["date", "Date"], ["class_id", "Class"], ["student_id", "Student ID"], ["teacher_id", "Teacher ID"], ["attendence_status", "Status"]],
    fields: [["class_id", "Class ID", "number"], ["student_id", "Student ID", "number"], ["teacher_id", "Teacher ID", "text"], ["date", "Date", "date"], ["attendence_status", "Status", "select", ["present", "absent", "leave"]]],
  },
  fees: {
    title: "Fees", description: "Track fee totals, payments, and outstanding balances.", idKey: "fees_id", searchKeys: ["fees_id", "student_id", "class_id"], filterKey: "balance_due", filterLabel: "All fee records",
    columns: [["fees_id", "Fee ID"], ["student_id", "Student ID"], ["class_id", "Class"], ["total_fees", "Total fees"], ["date_of_payment", "Payment date"], ["balance_due", "Balance due"]],
    fields: [["student_id", "Student ID", "number"], ["class_id", "Class ID", "number"], ["total_fees", "Total fees", "number"], ["date_of_payment", "Payment date", "date"], ["balance_due", "Balance due", "number"]],
  },
  exams: {
    title: "Exams", description: "Manage exam schedules, class assignments, and marks records.", idKey: "exam_id", searchKeys: ["exam_id", "exam_type", "class_id", "student_id", "subject_id"], filterKey: "exam_type", filterLabel: "All exam types",
    columns: [["exam_id", "Exam ID"], ["exam_type", "Exam type"], ["class_id", "Class"], ["student_id", "Student ID"], ["subject_id", "Subject ID"], ["marks", "Marks"], ["max_marks", "Max marks"], ["exam_date", "Exam date"]],
    fields: [["exam_type", "Exam type", "select", ["PT 1", "PT 2", "Mid Term", "Final Exam"]], ["class_id", "Class ID", "number"], ["student_id", "Student ID", "number"], ["subject_id", "Subject ID", "number"], ["marks", "Marks", "number"], ["max_marks", "Maximum marks", "number"], ["exam_date", "Exam date", "date"]],
  },
};

function formatCell(key, value) {
  if (value === null || value === undefined || value === "") return "—";
  if (["monthly_salary", "total_fees", "balance_due"].includes(key)) return `₹${Number(value).toLocaleString("en-IN")}`;
  if (/date/.test(key) && /^\d{4}-\d{2}-\d{2}/.test(String(value))) {
    return new Date(`${String(value).slice(0, 10)}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }
  if (key === "attendence_status") return String(value).charAt(0).toUpperCase() + String(value).slice(1);
  return String(value);
}

function getNextId(records, key) {
  const numeric = records.map((record) => Number(record[key])).filter(Number.isFinite);
  if (numeric.length) return Math.max(...numeric) + 1;
  const prefix = key === "teacher_id" ? "T" : "REC-";
  const largest = records.map((record) => Number(String(record[key]).replace(/\D/g, ""))).filter(Number.isFinite);
  return `${prefix}${String((largest.length ? Math.max(...largest) : 0) + 1).padStart(3, "0")}`;
}

function AdminRecordsPage({ collection }) {
  const config = modules[collection] || modules.students;
  const [records, setRecords] = useState(() => readAdminCollection(collection));
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [message, setMessage] = useState("");

  const filterOptions = useMemo(() => config.filterKey
    ? ["All", ...new Set(records.map((record) => record[config.filterKey]).filter((value) => value !== undefined).map(String))]
    : [], [config, records]);

  const visibleRecords = records.filter((record) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || config.searchKeys.some((key) => String(record[key] ?? "").toLowerCase().includes(query));
    let matchesFilter = true;
    if (config.filterKey && filter !== "All") {
      matchesFilter = collection === "fees"
        ? filter === "Due" ? Number(record.balance_due) > 0 : Number(record.balance_due) === 0
        : String(record[config.filterKey]) === filter;
    }
    return matchesSearch && matchesFilter;
  });

  const openCreate = () => {
    setEditing(null);
    setForm(Object.fromEntries(config.fields.map(([key]) => [key, ""])));
    setMessage("");
    setFormOpen(true);
  };

  const openEdit = (record) => {
    setEditing(record);
    setForm(Object.fromEntries(config.fields.map(([key]) => [key, record[key] ?? ""])));
    setMessage("");
    setFormOpen(true);
  };

  const saveRecord = (event) => {
    event.preventDefault();
    const normalized = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value === "" ? "" : ["class_id", "student_id", "subject_id", "marks", "max_marks", "numberOfstudents", "fees_id", "balance_due", "total_fees", "monthly_salary"].includes(key) ? Number(value) : value]));
    const nextRecords = editing
      ? records.map((record) => record[config.idKey] === editing[config.idKey] ? { ...record, ...normalized } : record)
      : [{ ...normalized, [config.idKey]: getNextId(records, config.idKey) }, ...records];
    if (!writeAdminCollection(collection, nextRecords)) {
      setMessage("Could not save this demo record in browser storage.");
      return;
    }
    setRecords(nextRecords);
    setEditing(null);
    setFormOpen(false);
    setMessage(editing ? "Record updated." : "Record added.");
  };

  const confirmDelete = () => {
    const nextRecords = records.filter((record) => record[config.idKey] !== deleteTarget[config.idKey]);
    if (!writeAdminCollection(collection, nextRecords)) {
      setMessage("Could not delete this demo record in browser storage.");
      setDeleteTarget(null);
      return;
    }
    setRecords(nextRecords);
    setDeleteTarget(null);
    setMessage("Record deleted.");
  };

  const updateField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <main className="admin-records-page">
      <header className="admin-records-header">
        <div><p className="admin-records-eyebrow">School administration</p><h1>{config.title}</h1><p>{config.description}</p></div>
        <span className="admin-demo-chip">Demo workspace · saved in this browser</span>
      </header>

      <section className="admin-records-panel">
        <div className="admin-records-toolbar">
          <div><h2>{config.title} records</h2><p>{visibleRecords.length} of {records.length} records</p></div>
          <div className="admin-records-controls">
            <label className="admin-search"><FaMagnifyingGlass aria-hidden="true" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${config.title.toLowerCase()}`} aria-label={`Search ${config.title}`} /></label>
            {config.filterKey && <select className="admin-filter" value={filter} onChange={(event) => setFilter(event.target.value)} aria-label={config.filterLabel}>{collection === "fees" ? <><option value="All">All fee records</option><option value="Due">Balance due</option><option value="Paid">Fully paid</option></> : filterOptions.map((option) => <option key={option} value={option}>{option === "All" ? config.filterLabel : option}</option>)}</select>}
            <button type="button" className="admin-primary-button" onClick={openCreate}><FaPlus /> Add {collection === "attendences" ? "record" : collection.slice(0, -1)}</button>
          </div>
        </div>

        <div className="admin-table-wrap"><table className="admin-records-table"><thead><tr>{config.columns.map(([key, label]) => <th key={key}>{label}</th>)}<th className="admin-actions-heading">Actions</th></tr></thead><tbody>{visibleRecords.map((record) => <tr key={record[config.idKey]}>{config.columns.map(([key]) => <td key={key}>{key === "attendence_status" ? <span className={`admin-status ${String(record[key]).toLowerCase()}`}>{formatCell(key, record[key])}</span> : formatCell(key, record[key])}</td>)}<td className="admin-row-actions"><button type="button" aria-label={`Edit ${config.title} record ${record[config.idKey]}`} onClick={() => openEdit(record)}><MdEdit /></button><button type="button" className="danger" aria-label={`Delete ${config.title} record ${record[config.idKey]}`} onClick={() => setDeleteTarget(record)}><MdDeleteForever /></button></td></tr>)}</tbody></table>{visibleRecords.length === 0 && <p className="admin-empty">No records match your search.</p>}</div>
        {message && <p className="admin-feedback" role="status">{message}</p>}
      </section>

      {formOpen && <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setFormOpen(false); }}><section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="admin-form-title"><div className="admin-modal-heading"><div><p className="admin-records-eyebrow">{editing ? "Edit record" : "New record"}</p><h2 id="admin-form-title">{editing ? `Edit ${config.title.toLowerCase().slice(0, -1)}` : `Add ${config.title.toLowerCase().slice(0, -1)}`}</h2></div><button type="button" className="admin-modal-close" aria-label="Close form" onClick={() => setFormOpen(false)}><FaXmark /></button></div><form onSubmit={saveRecord}><div className="admin-form-grid">{config.fields.map(([key, label, type, options]) => <label key={key}>{label}{type === "select" ? <select required value={form[key] ?? ""} onChange={(event) => updateField(key, event.target.value)}><option value="">Choose {label.toLowerCase()}</option>{options.map((option) => <option key={option}>{option}</option>)}</select> : <input required type={type} min={type === "number" ? "0" : undefined} value={form[key] ?? ""} onChange={(event) => updateField(key, event.target.value)} />}</label>)}</div><div className="admin-modal-actions"><button type="button" className="admin-secondary-button" onClick={() => setFormOpen(false)}>Cancel</button><button type="submit" className="admin-primary-button">{editing ? "Save changes" : "Add record"}</button></div></form></section></div>}

      {deleteTarget && <div className="admin-modal-backdrop" role="presentation"><section className="admin-modal admin-delete-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-record-title"><div className="admin-modal-heading"><div><p className="admin-records-eyebrow">Confirm action</p><h2 id="delete-record-title">Delete this record?</h2></div><button type="button" className="admin-modal-close" aria-label="Close confirmation" onClick={() => setDeleteTarget(null)}><FaXmark /></button></div><p>This removes the record from this browser's demo data.</p><div className="admin-modal-actions"><button type="button" className="admin-secondary-button" onClick={() => setDeleteTarget(null)}>Cancel</button><button type="button" className="admin-delete-button" onClick={confirmDelete}>Delete record</button></div></section></div>}
    </main>
  );
}

export default AdminRecordsPage;
