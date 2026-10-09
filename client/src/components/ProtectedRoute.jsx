import React from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate, useLocation } from "react-router-dom";

const studentPaths = new Set([
  "/student-dashboard",
  "/student-profile",
  "/student-exams",
  "/student-fees",
  "/student-attendance",
  "/student-documents",
  "/student-notices",
]);

const staffPaths = new Set([
  "/dashboard",
  "/attendences",
  "/classes",
  "/exams",
  "/students",
  "/addattendence",
  "/editattendence",
  "/addexam",
  "/editexam",
]);

function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

function getAllowedRoles(pathname) {
  if (studentPaths.has(pathname)) return ["student"];
  if (staffPaths.has(pathname) || /^\/student\/[^/]+$/.test(pathname))
    return ["admin", "teacher"];
  return ["admin"];
}

export default function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const decoded = token ? decodeToken(token) : null;

  if (!token) return <Navigate to="/" replace state={{ from: location }} />;

  if (!decoded?.role) return <Navigate to="/" replace />;

  const roles = allowedRoles || getAllowedRoles(location.pathname);
  if (!roles.includes(decoded.role)) {
    return (
      <Navigate
        to={decoded.role === "student" ? "/student-dashboard" : "/dashboard"}
        replace
      />
    );
  }

  return children;
}
