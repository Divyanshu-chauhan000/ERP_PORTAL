import React from 'react'
import { useEffect } from 'react'
import api from './api/axios';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Attendence from './pages/Attendence';
import Class from './pages/Class';
import Exam from './pages/Exam';
import Fees from './pages/Fees';
import Student from './pages/Student';
import Subject from './pages/Subject';
import Teachers from './pages/Teachers';
import AddStudent from './components/AddStudent';
import UpdateStudent from './components/UpdateStudent';

import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

export default function App() {

  return (
    <Routes>
      <Route path='/*' element={<Login/>} />
      <Route element={<Layout/>}>
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path='/attendences' element={<ProtectedRoute><Attendence/></ProtectedRoute>} />
      <Route path='/classes' element={<ProtectedRoute><Class/></ProtectedRoute>}/>
      <Route path='/exams' element={<ProtectedRoute><Exam/></ProtectedRoute>} />
      <Route path='/fees' element={<ProtectedRoute><Fees/></ProtectedRoute>} />
      <Route path='/students' element={<ProtectedRoute><Student/></ProtectedRoute>} />
      <Route  path='/subjects' element={<ProtectedRoute><Subject/></ProtectedRoute>}/>
      <Route path='/teachers' element={<ProtectedRoute><Teachers/></ProtectedRoute>} />
      <Route path='/addstudent' element={<ProtectedRoute><AddStudent/></ProtectedRoute>} />
      <Route path='/editstudent' element={<ProtectedRoute><UpdateStudent/></ProtectedRoute>} />
      </Route>
    </Routes>
  )
}
