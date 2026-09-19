const {getDB} = require('./../configs/db');

const getattendence = async (req, res) =>{
  try{
    const db = getDB();
    query = "SELECT * FROM attendences";
    const [attendences] = await db.query(query);
    res.json(attendences);
  }
  catch(error){
    res.json({message  : "failed to fetch the attendence"});
  }
}

const addattendence = async (req, res) =>{
  try{
    const db = getDB();
    query = "INSERT INTO attendences (class_id , student_id , teacher_id , date , attendence_status) VALUES (?,?,?,?,?)";
    const [attendences ] = await db.query(query , [req.body.class_id , req.body.student_id , req.body.teacher_id , req.body.date , req.body.attendence_status]);
    res.json(attendences);
  }
  catch(error){
    res.json({message  : "failed to add the attendence"});
  }
}


const updateattendence = async (req , res) =>{
  try{
    const db = getDB();
    query = " UPDATE attendences SET class_id = ? , student_id = ? , teacher_id = ? , date = ? , attendence_status = ? WHERE attendence_id = ? ";
    const [attendences] =  await db.query(query , [req.body.class_id , req.body.student_id , req.body.teacher_id , req.body.date , req.body.attendence_status , req.params.id]);
    
    res.json(attendences);
  }
  catch(error){
    res.json({message : "failed to update the attendence "});
  }
}

const deleteattendence = async (req , res) =>{
  try{
    const db = getDB();
    query = "DELETE FROM attendences WHERE attendence_id = ? ";
    const [attendences] = await db.query(query , [req.params.id]);
    res.json(attendences);
  }
  catch(error){
    res.json({message : "failed to delete the attendence"});
  }
}

module.exports = {getattendence , addattendence , updateattendence , deleteattendence};