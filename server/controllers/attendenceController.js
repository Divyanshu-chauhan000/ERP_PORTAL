const {getDB} = require('./../configs/db');

const getattendence = async (req, res , next) =>{
  try{
    const db = getDB();
    query = "SELECT * FROM attendences";
    const [attendences] = await db.query(query);
    res.json(attendences);
  }
  catch(error){
   next(error);
  }
}

const addattendence = async (req, res , next) =>{
  try{
    const db = getDB();
    query = "INSERT INTO attendences (class_id , student_id , teacher_id , date , attendence_status) VALUES (?,?,?,?,?)";
    const [attendences ] = await db.query(query , [req.body.class_id , req.body.student_id , req.body.teacher_id , req.body.date , req.body.attendence_status]);
    res.json(attendences);
  }
 catch(error){
   next(error);
  }
}


const updateattendence = async (req, res , next) =>{
  try{
    const db = getDB();
    query = " UPDATE attendences SET class_id = ? , student_id = ? , teacher_id = ? , date = ? , attendence_status = ? WHERE attendence_id = ? ";
    const [attendences] =  await db.query(query , [req.body.class_id , req.body.student_id , req.body.teacher_id , req.body.date , req.body.attendence_status , req.params.id]);
    
    res.json(attendences);
  }
 catch(error){
   next(error);
  }
}

const deleteattendence = async (req, res , next) =>{
  try{
    const db = getDB();
    query = "DELETE FROM attendences WHERE attendence_id = ? ";
    const [attendences] = await db.query(query , [req.params.id]);
    res.json(attendences);
  }
  catch(error){
   next(error);
  }
}

//individual attendence

const getMyAttendence = async (req , res , next) =>{
  try{
    const db =  getDB();
    query = "SELECT * FROM attendence WHERE student_id = ?"
    const [myattendence] = await db.query(query , [req.user.student_id]);
    res.json(myattendence)
  }
  catch(error){
    next(error);
  }
}

module.exports = {getattendence , addattendence , updateattendence , deleteattendence ,getMyAttendence};