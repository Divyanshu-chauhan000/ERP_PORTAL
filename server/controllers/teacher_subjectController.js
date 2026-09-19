const {getDB} = require('./../configs/db');

const getTeacher_subject = async ( req , res) =>{
  try{
    const db = getDB();
    const [teacher_subject] = await db.query("SELECT * FROM teacher_subjects");
    res.json(teacher_subject);
  }
  catch(error){
    res.json({message  :" Failed to get the details"});
  }
}

const addTeacher_subject = async (req, res) =>{
  try{
    const db = getDB();
    query = "INSERT INTO teacher_subjects (teacher_id , subject_id ) VALUES (?,?)";
    const [teacher_subject] = await db.query(query , [req.body.teacher_id , req.body.subject_id]);
    res.json(teacher_subject);
  }
  catch(error){
    res.json({message : "failed to add the teacher_subject"});
  }
}

const updateTeacher_subject = async (req , res) =>{
  try{
    const db = getDB();
    query = "UPDATE teacher_subjects SET teacher_id = ? , subject_id = ? WHERE teacher_subject_id = ?";

    const [teacher_subject] = await db.query(query , [req.body.teacher_id , req.body.subject_id , req.body.params.id]);
    res.json(teacher_subject);
  }
  catch(error){
    res.json({message : "failed to update the teacher_subject details"});
  }
}

const deleteTeacher_subject = async (req , res) =>{
  try{
    const db = getDB();
    query = "DELETE FROM teacher_subjects WHERE teacher_subject_id = ? ";
    const [teacher_subject] = await db.query(query , [req.params.id]);
    res.json(teacher_subject);
  }
  catch(error){
    res.json({message : "failed to delete the teacher_subject details"});
  }
}

module.exports = {
  getTeacher_subject , addTeacher_subject , updateTeacher_subject , deleteTeacher_subject
}