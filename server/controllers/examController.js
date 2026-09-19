const {getDB} = require('./../configs/db');

const getExams = async (req, res) =>{
  try{
    const db = getDB();
    const [exams] = await db.query("SELECT * FROM exams");
    res.json(exams);
  }
  catch(error){
    res.json({message : "failed to fetch the exam details "});
  }
}

const addExams = async (req , res) =>{
  try{
    const db = getDB();
    query = "INSERT INTO exams (exam_type , class_id , student_id , subject_id , marks , max_marks , exam_date ) VALUES (?,?,?,?,?,?,?)";

    const [exams] = await db.query(query , [req.body.exam_type , req.body.class_id , req.body.student_id , req.body.subject_id, req.body.marks , req.body.max_marks , req.body.exam_date]);
    res.json(exams);
  }
  catch(error){
    res.json({message : "failed to add exam details"});
  }
}

const updateExams = async (req, res) =>{
  try{
    const db = getDB();
    query = "UPDATE exams SET exam_type = ? , class_id = ? , student_id = ? subject_id = ? , marks = ? , max_marks = ? , exam_date = ? WHERE exam_id = ? ";
    const [exams]  =  await db.query(query ,  [req.body.exam_type , req.body.class_id , req.body.student_id , req.body.subject_id , req.body.marks , req.body.max_marks , req.body.exam_date , req.params.id]);

    res.json(exams);
  }
  catch(error){
    res.json({message : "failed to update the exam details"});
  }
}


const deleteExams = async (req, res) =>{
  try{
    const db = getDB();
    query = "DELETE FROM exams WHERE exam_id = ?";
    const [exams] = await db.query(query , [req.params.id]);
    res.json(exams);
  }
  catch(error){
    res.json({message : "failed to delete the exam details"});
  }
}

module.exports = {
  getExams , addExams , updateExams , deleteExams
}