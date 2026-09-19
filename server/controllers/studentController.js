const {getDB} = require('../configs/db');

const getAllstudents = async (req , res) =>{
 try{
  const db = getDB();
  const [students] = await db.query("SELECT * FROM students");
  res.json(students);
 }
 catch(error){
  console.log(error)
 }
}

const addAllstudents = async (req , res) =>{
  try{
   const db = getDB();
   query = "INSERT INTO students (student_name , student_dob , student_gender , student_address , student_contact , student_admission_date , class_id) VALUES (?,?,?,?,?,?,?) "
   const [students] = await db.query(query ,[req.body.student_name , req.body.student_dob , req.body.student_gender , req.body.student_address , req.body.student_contact , req.body.student_admission_date, req.body.class_id]);
   res.json(students);
  }
  catch(error){
   console.log(error)
  }
}

const updateStudent = async ( req , res )=>{
try{
    const db = getDB();
    query = "UPDATE students SET student_name=? , student_dob=? , student_gender=? , student_address=? , student_contact=? , student_admission_date=? , class_id=? WHERE student_id=?"

    const [student] = await db.query(query , [req.body.student_name , req.body.student_dob , req.body.student_gender , req.body.student_address , req.body.student_contact , req.body.student_admission_date , req.body.class_id , req.params.id]);

    res.json(student);
}
catch(error){
    res.json({ message : "Failed to update student"});
}
}


const deleteStudent = async (req , res) =>{
  try{
    const db = getDB();
    query = "DELETE FROM students WHERE student_id = ?"
    const [student] = await db.query(query , [req.params.id]);
    res.json(student);
  }
  catch(error){
    res.json({message : "failed to delete student record"})
  }
}

module.exports = {
  getAllstudents , addAllstudents , updateStudent , deleteStudent
}