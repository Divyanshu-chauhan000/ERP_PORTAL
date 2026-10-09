import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import "../style/studentAttendance.css";

const today = new Date();
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const formatISODate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const normalizeRecord = (record) => {
  const rawDate = record.date;
  const date =
    typeof rawDate === "string" && /^\d{4}-\d{2}-\d{2}/.test(rawDate)
      ? rawDate.slice(0, 10)
      : rawDate instanceof Date && !Number.isNaN(rawDate.getTime())
        ? formatISODate(rawDate)
        : null;

  if (!date) return null;

  const rawStatus = String(
    record.attendence_status ?? record.attendance_status ?? "",
  ).toLowerCase();
  const status =
    rawStatus === "present"
      ? "Present"
      : rawStatus === "absent"
        ? "Absent"
        : rawStatus === "leave"
          ? "Leave"
          : rawStatus === "holiday"
            ? "Holiday"
            : "Unknown";

  return { ...record, date, status };
};

function StudentAttendence() {
  const academicYearStart =
    today.getMonth() < 3 ? today.getFullYear() - 1 : today.getFullYear();
  const sessionStartDate = `${academicYearStart}-04-01`;
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [currentMonthView, setCurrentMonthView] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(formatISODate(today));
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveInfo, setLeaveInfo] = useState("");
  const [leaveForm, setLeaveForm] = useState({ from: "", to: "", reason: "" });

  useEffect(() => {
    let isActive = true;

    api
      .get("/attendence/me")
      .then(({ data }) => {
        if (!Array.isArray(data))
          throw new Error("Attendance response was not a list.");
        if (isActive) {
          setAttendanceRecords(data.map(normalizeRecord).filter(Boolean));
          setLoadError("");
        }
      })
      .catch(() => {
        if (isActive)
          setLoadError(
            "Attendance records could not be loaded. Please try again later.",
          );
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [reloadKey]);

  const sessionRecords = useMemo(
    () =>
      attendanceRecords.filter(
        (record) =>
          record.date >= sessionStartDate &&
          record.date <= formatISODate(today),
      ),
    [attendanceRecords, sessionStartDate],
  );

  const recordsByDate = useMemo(() => {
    const map = new Map();
    sessionRecords.forEach((record) => map.set(record.date, record));
    return map;
  }, [sessionRecords]);

  const monthlyAttendance = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => {
        const monthDate = new Date(academicYearStart, 3 + index, 1);
        const monthKey = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, "0")}`;
        const isUpcoming =
          monthDate > new Date(today.getFullYear(), today.getMonth(), 1);
        const records = isUpcoming
          ? []
          : sessionRecords.filter((record) => record.date.startsWith(monthKey));
        const present = records.filter(
          (record) => record.status === "Present",
        ).length;
        const absent = records.filter(
          (record) => record.status === "Absent",
        ).length;
        const leave = records.filter(
          (record) => record.status === "Leave",
        ).length;
        const workingDays = present + absent + leave;

        return {
          month: monthDate.toLocaleDateString("en-US", { month: "long" }),
          workingDays,
          present,
          absent,
          leave,
          percentage: workingDays
            ? Math.round((present / workingDays) * 100)
            : null,
          upcoming: isUpcoming,
        };
      }),
    [academicYearStart, sessionRecords],
  );

  const summary = useMemo(() => {
    const present = sessionRecords.filter(
      (record) => record.status === "Present",
    ).length;
    const absent = sessionRecords.filter(
      (record) => record.status === "Absent",
    ).length;
    const leave = sessionRecords.filter(
      (record) => record.status === "Leave",
    ).length;
    const workingDays = present + absent + leave;
    return {
      present,
      absent,
      leave,
      workingDays,
      percentage: workingDays ? Math.round((present / workingDays) * 100) : 0,
    };
  }, [sessionRecords]);

  const calendarDays = useMemo(() => {
    const year = currentMonthView.getFullYear();
    const monthIndex = currentMonthView.getMonth();
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();
    const days = Array.from({ length: firstDay }, (_, index) => ({
      empty: true,
      key: `empty-${index}`,
    }));

    for (let day = 1; day <= totalDays; day += 1) {
      const date = formatISODate(new Date(year, monthIndex, day));
      const dateObject = new Date(year, monthIndex, day);
      const record = recordsByDate.get(date);
      const isFuture = date > formatISODate(today);
      days.push({
        date,
        dayNumber: day,
        isWeekend: dateObject.getDay() === 0 || dateObject.getDay() === 6,
        disabled: isFuture,
        status: isFuture ? "Upcoming" : (record?.status ?? "No record"),
        note: isFuture
          ? "Attendance is not available for a future date."
          : record?.reason ||
            record?.remarks ||
            (record
              ? "Attendance record from school."
              : "No attendance record is available for this date."),
      });
    }

    return days;
  }, [currentMonthView, recordsByDate]);

  const selectedDay = calendarDays.find((day) => day.date === selectedDate);
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const sessionMonthStart = new Date(academicYearStart, 3, 1);
  const attendanceStatus =
    summary.workingDays === 0
      ? "neutral"
      : summary.percentage >= 75
        ? "success"
        : summary.percentage >= 60
          ? "warning"
          : "danger";

  const changeMonth = (direction) => {
    const nextMonth = new Date(
      currentMonthView.getFullYear(),
      currentMonthView.getMonth() + direction,
      1,
    );
    if (nextMonth < sessionMonthStart || nextMonth > currentMonthStart) return;
    setCurrentMonthView(nextMonth);
    setSelectedDate(formatISODate(nextMonth));
  };

  const retryLoading = () => {
    setLoading(true);
    setLoadError("");
    setReloadKey((current) => current + 1);
  };

  const handleLeaveSubmit = (event) => {
    event.preventDefault();
    setLeaveInfo(
      "Online leave applications are not connected yet. Please contact your class teacher.",
    );
  };

  return (
    <div className="attendance-page">
      <header className="attendance-header">
        <div>
          <p className="eyebrow">
            Academic Session: {academicYearStart}-
            {String(academicYearStart + 1).slice(-2)}
          </p>
          <h1>My Attendance</h1>
        </div>
      </header>

      {loading && (
        <div className="attendance-state" role="status">
          Loading attendance records…
        </div>
      )}
      {loadError && (
        <div className="attendance-state error" role="alert">
          <p>{loadError}</p>
          <button type="button" className="primary-btn" onClick={retryLoading}>
            Try again
          </button>
        </div>
      )}
      {!loading && !loadError && attendanceRecords.length === 0 && (
        <div className="attendance-state" role="status">
          No attendance records are available yet. The calendar and session
          summary are ready when records are added.
        </div>
      )}
      <section className="summary-row">
        <div className="summary-card progress-card">
          <label>Overall Attendance</label>
          <strong>{summary.percentage}%</strong>
          <div className="attendance-progress">
            <span style={{ width: `${summary.percentage}%` }} />
          </div>
          <small>{summary.present} days present</small>
        </div>
        <div className="summary-card">
          <label>Present Days</label>
          <strong>{summary.present}</strong>
          <small>Of {summary.workingDays} recorded days</small>
        </div>
        <div className="summary-card">
          <label>Absent Days</label>
          <strong>{summary.absent}</strong>
          <small>Recorded absences</small>
        </div>
        <div className="summary-card">
          <label>Leave Days</label>
          <strong>{summary.leave}</strong>
          <small>Recorded leave days</small>
        </div>
      </section>

      <div className={`status-banner ${attendanceStatus}`}>
        {summary.workingDays
          ? `Your attendance is ${summary.percentage}%. Minimum required: 75%. ${summary.percentage >= 75 ? "You are on track." : "Attendance is low, please be regular."}`
          : "No attendance has been recorded for this academic session yet."}
      </div>

      <section className="panel">
        <div className="panel-header">
          <h3>Monthly Attendance</h3>
          <span>Academic session</span>
        </div>
        <div className="monthly-table-wrap">
          <table className="monthly-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Recorded Days</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Leave</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {monthlyAttendance.map((month) => {
                const statusClass = month.upcoming
                  ? "upcoming"
                  : month.percentage === null
                    ? "upcoming"
                    : month.percentage >= 75
                      ? "good"
                      : month.percentage >= 60
                        ? "medium"
                        : "low";
                return (
                  <tr key={month.month}>
                    <td>{month.month}</td>
                    <td>
                      {month.upcoming ? "Upcoming" : month.workingDays || "—"}
                    </td>
                    <td>{month.upcoming ? "—" : month.present}</td>
                    <td>{month.upcoming ? "—" : month.absent}</td>
                    <td>{month.upcoming ? "—" : month.leave}</td>
                    <td>
                      {month.upcoming ? (
                        <span className="month-pill upcoming">Upcoming</span>
                      ) : month.percentage === null ? (
                        <span className="month-pill upcoming">No records</span>
                      ) : (
                        <span className={`month-pill ${statusClass}`}>
                          {month.percentage}%
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3>Attendance Calendar</h3>
          <div className="calendar-nav">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              disabled={currentMonthView <= sessionMonthStart}
              aria-label="Previous month"
            >
              ‹
            </button>
            <span>
              {currentMonthView.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              disabled={currentMonthView >= currentMonthStart}
              aria-label="Next month"
            >
              ›
            </button>
          </div>
        </div>
        <div className="calendar-layout">
          <div className="calendar-box">
            <div className="calendar-grid">
              {dayNames.map((day) => (
                <div key={day} className="day-name">
                  {day}
                </div>
              ))}
              {calendarDays.map((day) =>
                day.empty ? (
                  <div key={day.key} className="day-cell empty" />
                ) : (
                  <button
                    key={day.date}
                    type="button"
                    disabled={day.disabled}
                    aria-label={`${day.date}: ${day.status}`}
                    aria-pressed={selectedDate === day.date}
                    className={`day-cell ${day.isWeekend ? "weekend" : ""} ${day.status === "Holiday" ? "holiday" : ""} ${selectedDate === day.date ? "selected" : ""} ${day.disabled ? "future" : ""}`}
                    onClick={() => setSelectedDate(day.date)}
                  >
                    <span className="date-number">{day.dayNumber}</span>
                    {day.status !== "No record" &&
                      day.status !== "Upcoming" && (
                        <span
                          className={`day-dot dot-${day.status.toLowerCase()}`}
                        />
                      )}
                  </button>
                ),
              )}
            </div>
            <div className="attendance-legend">
              <span>
                <i className="dot-present" />
                Present
              </span>
              <span>
                <i className="dot-absent" />
                Absent
              </span>
              <span>
                <i className="dot-leave" />
                Leave
              </span>
              <span>
                <i className="dot-neutral" />
                No record
              </span>
            </div>
          </div>
          <aside className="status-sidebox">
            <h4>Selected Date</h4>
            {selectedDay && (
              <>
                <div
                  className={`detail-card status-${selectedDay.status.toLowerCase().replace(" ", "-")}`}
                >
                  <p className="label">Attendance</p>
                  <strong>{selectedDay.status}</strong>
                  <span>
                    {new Date(
                      `${selectedDay.date}T00:00:00`,
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="selected-note">
                  <p>{selectedDay.note}</p>
                </div>
              </>
            )}
          </aside>
        </div>
      </section>

      <section className="panel">
        <div className="leave-header">
          <h3>Absence and Leave</h3>
          <button
            type="button"
            className="primary-btn"
            onClick={() => setShowLeaveForm((visible) => !visible)}
          >
            Apply for Leave
          </button>
        </div>
        {showLeaveForm && (
          <form className="leave-form" onSubmit={handleLeaveSubmit}>
            <div className="form-row">
              <input
                type="date"
                required
                value={leaveForm.from}
                onChange={(event) =>
                  setLeaveForm({ ...leaveForm, from: event.target.value })
                }
                aria-label="Leave start date"
              />
              <input
                type="date"
                required
                value={leaveForm.to}
                onChange={(event) =>
                  setLeaveForm({ ...leaveForm, to: event.target.value })
                }
                aria-label="Leave end date"
              />
            </div>
            <textarea
              required
              value={leaveForm.reason}
              onChange={(event) =>
                setLeaveForm({ ...leaveForm, reason: event.target.value })
              }
              placeholder="Reason for leave"
              aria-label="Reason for leave"
            />
            <button type="submit" className="primary-btn">
              Check request availability
            </button>
          </form>
        )}
        {leaveInfo && (
          <p className="leave-unavailable" role="status">
            {leaveInfo}
          </p>
        )}
        <div className="leave-list">
          {sessionRecords.filter((record) =>
            ["Absent", "Leave"].includes(record.status),
          ).length === 0 ? (
            <p className="attendance-empty-records">
              No absence or leave records for this session.
            </p>
          ) : (
            sessionRecords
              .filter((record) => ["Absent", "Leave"].includes(record.status))
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((record) => (
                <div
                  key={record.date}
                  className={`leave-item ${record.status.toLowerCase()}`}
                >
                  <div className="leave-top-row">
                    <strong>
                      {new Date(`${record.date}T00:00:00`).toLocaleDateString(
                        "en-GB",
                        { day: "2-digit", month: "short", year: "numeric" },
                      )}
                    </strong>
                    <span
                      className={`status-badge ${record.status.toLowerCase()}`}
                    >
                      {record.status}
                    </span>
                  </div>
                  <span>
                    {record.reason ||
                      record.remarks ||
                      "No additional details provided."}
                  </span>
                </div>
              ))
          )}
        </div>
      </section>
      <div className="footer-note">
        For attendance corrections, contact your class teacher.
      </div>
    </div>
  );
}

export default StudentAttendence;
