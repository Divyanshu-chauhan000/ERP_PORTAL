const {getDB} = require('../configs/db');
const {validationResult} = require('express-validator');

const getAllstudents = async (req, res , next) =>{
 try{
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  console.log(page , limit);
  const offset =  (page - 1 ) * limit;
  console.log("Page : " , page , "Limit : " , limit , "OffSet : " , offset);


  const db = getDB();
  const [students] = await db.query("SELECT * FROM students LIMIT ? OFFSET ?" , [Number(limit) , Number(offset)]);
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

//student  total count  class wise 

const getStudentclasswise = async ( req , res , next )=>{
try{
    const db = getDB();
  query = "SELECT class_id , COUNT(*) as total_students FROM students GROUP BY class_id"
  const [studentclasswise] = await db.query(query);
  res.json(studentclasswise);
}
catch(error){
  next(error);
}
}



//Total count of students 

const getTotalStudents = async (req ,res , next) =>{
  try{
    const db = getDB();
  query = "SELECT COUNT(*) as total_students FROM students"
  const [TotalStudents] = await db.query(query);
  res.json(TotalStudents)
  }
  catch(error){
    next(error);
  }
}

//get students complete info 



module.exports = {
  getAllstudents , addAllstudents , updateStudent , deleteStudent , getStudentwithClass , getStudentclasswise, getTotalStudents
}