const {getDB} = require('./../configs/db');
const bcrypt = require('bcryptjs');

const getAllusers = async (req, res , next) =>{
  try{
    const db = getDB();
    const [users] = await db.query("SELECT * FROM users");
    res.json(users);
  }
  catch(error){
   next(error);
  }
}
const addusers = async (req, res , next) =>{
  try{
    const db = getDB();
    const hashpassword = await bcrypt.hash(req.body.password , 10);
    query = "INSERT INTO users (username , password , role , student_id , teacher_id ) VALUES (?,?,?,?,?)";
    const [users] = await db.query(query , [req.body.username , hashpassword , req.body.role , req.body.student_id , req.body.teacher_id]);
    res.json(users);
  }
  catch(error){
   next(error);
  }
}

const updateusers = async (req, res , next) =>{
  try{
    const db = getDB();
    query = "UPDATE users SET username = ? , password = ? , role = ? , student_id = ? , teacher_id = ? WHERE user_id = ?";
    const [users] = await db.query(query , [req.body.username , req.body.password , req.body.role , req.body.student_id , req.body.teacher_id , req.params.id]);
    res.json(users);
  }
  catch(error){
   next(error);
  }
}


const deleteusers = async (req, res , next) =>{
  try{
    const db = getDB();
    query = "DELETE FROM users WHERE user_id = ?";
    const [users] = await db.query(query , [req.params.id]);
    res.json(users);
  }
  catch(error){
   next(error);
  }
}

module.exports = {
  getAllusers , addusers , updateusers , deleteusers
}