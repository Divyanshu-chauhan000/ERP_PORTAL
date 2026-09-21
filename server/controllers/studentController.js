const {getDB} = require('../configs/db');
const {validationResult} = require('express-validator');

const getAllstudents = async (req, res , next) =>{
 try{
  const db = getDB();
  const [students] = await db.query("SELECT * FROM students");
  res.json(students);
 }
catch(error){
   next(error);
  }
}

const addAllstudents = async (req, res , next) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
  return res.status(400).json({errors : errors.array()});
  }
  try{
   const db = getDB();
   query = "INSERT INTO students (student_name , student_dob , student_gender , student_address , student_contact , student_admission_date , class_id) VALUES (?,?,?,?,?,?,?) "
   const [students] = await db.query(query ,[req.body.student_name , req.body.student_dob , req.body.student_gender , req.body.student_address , req.body.student_contact , req.body.student_admission_date, req.body.class_id]);
   res.json(students);
  }
  catch(error){
   next(error);
  }
}

const updateStudent = async ( req, res , next )=>{
try{
    const db = getDB();
    query = "UPDATE students SET student_name=? , student_dob=? , student_gender=? , student_address=? , student_contact=? , student_admission_date=? , class_id=? WHERE student_id=?"

    const [student] = await db.query(query , [req.body.student_name , req.body.student_dob , req.body.student_gender , req.body.student_address , req.body.student_contact , req.body.student_admission_date , req.body.class_id , req.params.id]);

    res.json(student);
}
catch(error){
   next(error);
  }
}


const deleteStudent = async (req, res , next) =>{
  try{
    const db = getDB();
    query = "DELETE FROM students WHERE student_id = ?"
    const [student] = await db.query(query , [req.params.id]);
    res.json(student);
  }
 catch(error){
   next(error);
  }
}


// Students with class details

const getStudentwithClass = async (req, res , next) =>{
  try{
    const db =  getDB();
    query = "SELECT  students.student_name , classes.class_name , classes.class_section  FROM students JOIN classes ON students.class_id = classes.class_id"
    const [studentWithClass] = await db.query(query);
    res.json(studentWithClass);
  }
  catch(error){
   next(error);
  }
}

module.exports = {
  getAllstudents , addAllstudents , updateStudent , deleteStudent , getStudentwithClass
}