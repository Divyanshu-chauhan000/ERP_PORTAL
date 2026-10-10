import React, { useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import StatsCard from "../components/StatsCard";
import {
  FaCalendarCheck,
  FaChartBar,
  FaBullhorn,
  FaBookOpen,
} from "react-icons/fa6";
import { MdOutlineAttachMoney, MdPerson3 } from "react-icons/md";
import { IoIosPaper } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CiWarning } from "react-icons/ci";
import "../style/StudentDashboard.css";

const latestNotices = [];

const fallbackExams = [];

const toArray = (value) => (Array.isArray(value) ? value : []);

function StudentDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const studentId = token ? jwtDecode(token).student_id : null;
  const [stats, setStats] = useState({
    totalExams: 0,
    averageMarks: 0,
    feePending: 0,
    attendencePercentage: 0,
  });
  const [profile, setProfile] = useState({});
  const [exams, setExams] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isActive = true;

    const fetchDashboard = async () => {
      if (!studentId) {
        setDashboardError(
          "Student account information is missing. Please sign in again.",
        );
        setDashboardLoading(false);
        return;
      }

      const results = await Promise.allSettled([
        api.get(`/exam/myExams/${studentId}`),
        api.get(`/fees?student_id=${studentId}`),
        api.get("/attendence/me"),
        api.get(`/students/profile/${studentId}`),
      ]);
      if (!isActive) return;

      const requestNames = ["exams", "fees", "attendance", "profile"];
      const failedRequests = results.flatMap((result, index) =>
        result.status === "rejected" ? [requestNames[index]] : [],
      );
      const examData =
        results[0].status === "fulfilled" ? toArray(results[0].value.data) : [];
      const feeData =
        results[1].status === "fulfilled" ? toArray(results[1].value.data) : [];
      const attendanceData =
        results[2].status === "fulfilled" ? toArray(results[2].value.data) : [];
      const profileData =
        results[3].status === "fulfilled"
          ? toArray(results[3].value.data)[0] || {}
          : {};

      const totalMarks = examData.reduce(
        (sum, exam) => sum + (Number(exam.marks) || 0),
        0,
      );
      const maxMarks = examData.reduce(
        (sum, exam) => sum + (Number(exam.max_marks) || 0),
        0,
      );
      const presentCount = attendanceData.filter(
        (record) =>
          String(
            record.attendence_status ?? record.attendance_status ?? "",
          ).toLowerCase() === "present",
      ).length;
      const countedAttendance = attendanceData.filter((record) =>
        ["present", "absent", "leave"].includes(
          String(
            record.attendence_status ?? record.attendance_status ?? "",
          ).toLowerCase(),
        ),
      ).length;

      setExams(examData);
      setProfile(profileData);
      setStats({
        totalExams: examData.length,
        averageMarks: maxMarks ? ((totalMarks / maxMarks) * 100).toFixed(1) : 0,
        feePending: Number(feeData[0]?.balance_due) || 0,
        attendencePercentage: countedAttendance
          ? (presentCount / countedAttendance) * 100
          : 0,
      });
      setDashboardError(
        failedRequests.length
          ? `Some dashboard information could not be loaded (${failedRequests.join(", ")}).`
          : "",
      );
      setDashboardLoading(false);
    };

    fetchDashboard().catch(() => {
      if (isActive) {
        setDashboardError(
          "Dashboard information could not be loaded. Please try again.",
        );
        setDashboardLoading(false);
      }
    });

    return () => {
      isActive = false;
    };
  }, [studentId, retryCount]);

  const upcomingExams = useMemo(
    () =>
      exams
        .filter(
          (exam) =>
            exam.exam_date &&
            new Date(exam.exam_date) >=
              new Date(new Date().setHours(0, 0, 0, 0)),
        )
        .sort(
          (first, second) =>
            new Date(first.exam_date) - new Date(second.exam_date),
        )
        .slice(0, 4),
    [exams],
  );
  const examsToDisplay = upcomingExams.length ? upcomingExams : fallbackExams;

  const quickLinks = [
    {
      icon: <CgProfile size={28} />,
      label: "My Profile",
      path: "/student-profile",
      color: "#eff6ff",
      border: "#3b82f6",
    },
    {
      icon: <IoIosPaper size={28} />,
      label: "My Exams",
      path: "/student-exams",
      color: "#f0fdf4",
      border: "#22c55e",
    },
    {
      icon: <MdOutlineAttachMoney size={28} />,
      label: "My Fees",
      path: "/student-fees",
      color: "#fefce8",
      border: "#eab308",
    },
    {
      icon: <FaCalendarCheck size={28} />,
      label: "Attendance",
      path: "/student-attendance",
      color: "#fdf4ff",
      border: "#a855f7",
    },
    {
      icon: <FaBookOpen size={28} />,
      label: "Assignments",
      path: "/student-assignments",
      color: "#ecfdf5",
      border: "#0f766e",
    },
  ];

  const retryDashboard = () => {
    setDashboardLoading(true);
    setRetryCount((count) => count + 1);
  };

  return (
    <div className="student-dashboard">
      <div className="welcome-banner">
        <img
          src="https://img.magnific.com/premium-photo/cute-indian-little-school-boy-standing-school_130568-376.jpg"
          alt=""
        />
        <div>
          <h1>Welcome back, {profile.student_name || "Student"}</h1>
          <p>
            {profile.class_name || "Class not available"} -{" "}
            <span>{profile.class_section || "Section not available"}</span>
          </p>
        </div>
      </div>

      {dashboardLoading && (
        <div className="dashboard-state" role="status">
          Loading your dashboard…
        </div>
      )}
      {!dashboardLoading && dashboardError && (
        <div className="dashboard-state error" role="alert">
          <span>{dashboardError}</span>
          <button type="button" onClick={retryDashboard}>
            Retry
          </button>
        </div>
      )}

      <div className="stats-grid">
        <StatsCard
          title="Total Exams"
          value={dashboardLoading ? "…" : stats.totalExams}
          color="#3b82f6"
          icon={<IoIosPaper />}
        />
        <StatsCard
          title="Average Marks"
          value={dashboardLoading ? "…" : `${stats.averageMarks}%`}
          color="#22c55e"
          icon={<FaChartBar />}
        />
        <StatsCard
          title="Fees Pending"
          value={dashboardLoading ? "…" : `₹${stats.feePending}`}
          color="#f59e0b"
          icon={<MdOutlineAttachMoney />}
        />
        <StatsCard
          title="Attendance"
          value={
            dashboardLoading
              ? "…"
              : `${Number(stats.attendencePercentage).toFixed(1)}%`
          }
          color="#8b5cf6"
          icon={<FaCalendarCheck />}
        />
      </div>

      <div className="dashboard-content">
        <div className="content-left">
          <section className="upcoming-exams">
            <div className="section-header">
              <div className="title-with-icon">
                <FaCalendarCheck className="header-icon blue-icon" />
                <h3>Upcoming Exams</h3>
              </div>
              <button
                type="button"
                className="view-all"
                onClick={() => navigate("/student-exams")}
              >
                View All
              </button>
            </div>
            <div className="exam-list">
              {dashboardLoading ? (
                <p className="dashboard-empty">Loading exam schedule…</p>
              ) : (
                examsToDisplay.map((exam) => {
                  const examDate = new Date(exam.exam_date || exam.date);
                  return (
                    <div
                      key={
                        exam.exam_id ||
                        exam.id ||
                        `${exam.exam_date || exam.date}-${exam.exam_type || exam.subject}`
                      }
                      className="exam-item"
                    >
                      <div className="exam-date">
                        <span className={`${exam.color || "blue"}-text day`}>
                          {String(examDate.getDate()).padStart(2, "0")}
                        </span>
                        <span className="month">
                          {examDate
                            .toLocaleString("en", { month: "short" })
                            .toUpperCase()}
                        </span>
                      </div>
                      <div className="exam-info">
                        <div className="subject-name">
                          <MdPerson3
                            className={`subject-icon ${exam.color || "blue"}-icon`}
                          />
                          <h4>
                            {exam.subject_name ||
                              exam.subject ||
                              "Scheduled Exam"}
                          </h4>
                        </div>
                        <p>{exam.exam_type || exam.category || "Exam"}</p>
                      </div>
                      <div className="exam-time">
                        {exam.time ||
                          examDate.toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                          })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          <section className="notices-panel">
            <div className="section-header">
              <div className="title-with-icon">
                <FaBullhorn className="header-icon notice-icon" />
                <h3>Latest Notices</h3>
              </div>
              <button
                type="button"
                className="view-all"
                onClick={() => navigate("/student-notices")}
              >
                View All
              </button>
            </div>
            <div className="notice-list">
              {latestNotices.map((notice) => (
                <article className="notice-item" key={notice.id}>
                  <div className="notice-date">
                    <span>
                      {new Date(`${notice.date}T00:00:00`).toLocaleDateString(
                        "en-IN",
                        { day: "2-digit", month: "short" },
                      )}
                    </span>
                  </div>
                  <div className="notice-copy">
                    <div className="notice-title-row">
                      <h4>{notice.title}</h4>
                      <span
                        className={`notice-category ${notice.category.toLowerCase()}`}
                      >
                        {notice.category}
                      </span>
                    </div>
                    <p>{notice.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="content-right">
          <section className="fee-overView">
            <div className="section-header">
              <div className="title-with-icon">
                <MdOutlineAttachMoney className="header-icon orange-icon" />
                <h3>Fee Overview</h3>
              </div>
            </div>
            <div className="fee-content">
              <p className="fee-subtitle">Paid vs Pending</p>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: "87.5%" }}>
                  Rs. 17500 Paid
                </div>
              </div>
              <div className="fee-details">
                <div className="fee-stat">
                  <span className="dot green-dot" />
                  <div>
                    <p>Paid</p>
                    <h4>Rs. 17500</h4>
                  </div>
                </div>
                <div className="fee-stat text-right">
                  <div>
                    <p>
                      <span className="dot orange-dot" /> Pending
                    </p>
                    <h4>
                      {dashboardLoading
                        ? "…"
                        : `₹${Number(stats.feePending).toLocaleString("en-IN")}`}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="fee-warning">
                <CiWarning size={20} />
                <p>Please clear pending fees to avoid any late fee.</p>
              </div>
            </div>
          </section>

          <section className="quick-actions-container">
            <h3 className="quick-title">Quick Links</h3>
            <div className="quick-links">
              {quickLinks.map((link) => (
                <button
                  key={link.path}
                  type="button"
                  className="quickLinksstyle"
                  style={{
                    backgroundColor: link.color,
                    borderLeft: `4px solid ${link.border}`,
                  }}
                  onClick={() => navigate(link.path)}
                >
                  <span style={{ color: link.border }}>{link.icon}</span>
                  <span style={{ color: link.border }}>{link.label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
