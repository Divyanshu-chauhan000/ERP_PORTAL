const {getDB} = require('./../configs/db');

const getAllteachers =  async (req , res) =>{
  try{
    const db = getDB();
    query = "SELECT * FROM teachers";
    const [teachers] = await db.query(query);
    res.json(teachers);
  }
  catch(error){
    res.json({message :"Failed to gett all the teachers"});
  }
}

const addTeacher = async (req , res) =>{
  try{
  const db = getDB();
  query = "INSERT INTO teachers (teacher_name , teacher_contact , teacher_subject_specialisation , teacher_joining_date) VALUES (?,?,?,?)";
  const [teacher] = await db.query(query , [ req.body.teacher_name , req.body.teacher_contact , req.body.teacher_subject_specialisation , req.body.teacher_joining_date ]);

  res.json(teacher);
  }
  catch(error){
    res.json({message : " Failed to add teacher "});
  }
} 

const updateTeacher =  async (req , res) =>{
  try{
    const db =  getDB();
    query = "UPDATE teachers SET teacher_name = ? , teacher_contact = ? , teacher_subject_specialisation = ? , teacher_joining_date = ? WHERE teacher_id = ?  ";

    const [teacher] = await db.query(query , [req.body.teacher_name , req.body.teacher_contact , req.body.teacher_subject_specialisation , req.body.teacher_joining_date , req.params.id]);

    res.json(teacher);
  }
  catch(error){
    res.json({message : "Failed to update teacher"});
  }
}

const deleteteacher = async (req , res) =>{
  try{
    const db = getDB();
    
    query = "DELETE FROM teachers WHERE teacher_id =?";

    const [teacher] = await db.query(query , [req.params.id]);
    res.json(teacher);
  }
  catch(error){
    res.json({message : "Failed to delete teacher "});
  }
}

module.exports = {
  getAllteachers , 
  addTeacher,
  updateTeacher,
  deleteteacher
}