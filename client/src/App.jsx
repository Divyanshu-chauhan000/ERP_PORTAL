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

export default function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/attendences' element={<Attendence/>} />
      <Route path='/classes' element={<Class/>}/>
      <Route path='/exams' element={<Exam/>} />
      <Route path='/fees' element={<Fees/>} />
      <Route path='/students' element={<Student/>} />
      <Route  path='/subjects' element={<Subject/>}/>
      <Route path='/teachers' element={<Teachers/>} />


      <Route path='/addstudent' element={<AddStudent/>} />
      <Route path='/edistudent' element={<UpdateStudent/>} />
    </Routes>
  )
}
