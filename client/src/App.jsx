import React from "react";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Attendence from "./pages/Attendence";
import Class from "./pages/Class";
import Exam from "./pages/Exam";
import Fees from "./pages/Fees";
import Student from "./pages/Student";
import Subject from "./pages/Subject";
import Teachers from "./pages/Teachers";
import AddStudent from "./components/AddStudent";
import UpdateStudent from "./components/UpdateStudent";
import AddAttendence from "./components/AddAttendence";
import UpdateAttendence from "./components/UpdateAttendence";
import AddClass from "./components/AddClass";
import UpdateClass from "./components/UpdateClass";
import AddExam from "./components/AddExam";
import UpdateExam from "./components/UpdateExam";
import AddFees from "./components/AddFees";
import UpdateFees from "./components/UpdateFees";
import AddSubject from "./components/AddSubject";
import UpdateSubject from "./components/UpdateSubject";
import AddTeacher from "./components/AddTeacher";
import UpdateTeacher from "./components/UpdateTeacher";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import "./App.css";
import StudentDetail from "./components/StudentDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Layout />}>

      {/* Admin routes here */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendences"
          element={
            <ProtectedRoute>
              <Attendence />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classes"
          element={
            <ProtectedRoute>
              <Class />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exams"
          element={
            <ProtectedRoute>
              <Exam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fees"
          element={
            <ProtectedRoute>
              <Fees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Student />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subjects"
          element={
            <ProtectedRoute>
              <Subject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teachers"
          element={
            <ProtectedRoute>
              <Teachers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addstudent"
          element={
            <ProtectedRoute>
              <AddStudent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editstudent"
          element={
            <ProtectedRoute>
              <UpdateStudent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addattendence"
          element={
            <ProtectedRoute>
              <AddAttendence />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editattendence"
          element={
            <ProtectedRoute>
              <UpdateAttendence />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addclass"
          element={
            <ProtectedRoute>
              <AddClass />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editclass"
          element={
            <ProtectedRoute>
              <UpdateClass />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addexam"
          element={
            <ProtectedRoute>
              <AddExam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editexam"
          element={
            <ProtectedRoute>
              <UpdateExam />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addfees"
          element={
            <ProtectedRoute>
              <AddFees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editfees"
          element={
            <ProtectedRoute>
              <UpdateFees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addsubject"
          element={
            <ProtectedRoute>
              <AddSubject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editsubject"
          element={
            <ProtectedRoute>
              <UpdateSubject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addteacher"
          element={
            <ProtectedRoute>
              <AddTeacher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editteacher"
          element={
            <ProtectedRoute>
              <UpdateTeacher />
            </ProtectedRoute>
          }
        />
      <Route path="/student/:id" element={<ProtectedRoute><StudentDetail/></ProtectedRoute>}/>



      {/* Student routes here */}
      <Route path='/student-dashboard' element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
       <Route path='/student-profile' element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />
       <Route path='/student-exams' element={<ProtectedRoute><StudentExams /></ProtectedRoute>} />
       <Route path='/student-fees' element={<ProtectedRoute><StudentFees /></ProtectedRoute>} />
      <Route path='/student-attendance' element={<ProtectedRoute><StudentAttendance /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}
