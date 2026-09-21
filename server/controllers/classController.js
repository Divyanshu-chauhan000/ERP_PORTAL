const {getDB} = require('./../configs/db');

const getclass = async (req, res , next) =>{
  try{
    const db = getDB();
    query = "SELECT * FROM classes"

    const [classes] = await db.query(query);
    res.json(classes);
  }
 catch(error){
   next(error);
  }
}

const addclass = async (req, res , next) =>{
  try{
    const db = getDB();
    query = "INSERT INTO classes (class_name , class_section , numberOfstudents) VALUES (?,?,?)";

    const [classes] = await db.query(query , [req.body.class_name , req.body.class_section , req.body.numberOfstudents]);
    res.json(classes);
  }
catch(error){
   next(error);
  }
}

const updateclass = async (req, res , next) =>{
  try{
    const db = getDB();
    query = "UPDATE classes SET class_name = ? , class_section = ? , numberOfstudents = ? WHERE class_id = ? ";
    const [classes] = await db.query(query , [req.body.class_name , req.body.class_section , req.body.numberOfstudents , req.params.class_id] );

    res.json(classes);
  }
catch(error){
   next(error);
  }
}

const deleteclass = async (req, res , next) =>{
  try{
    const db = getDB();
    query = "DELETE FROM classes WHERE class_id = ? ";

    const [classes] = await db.query(query , [req.params.class_id]);
    res.json(classes);
  }
 catch(error){
   next(error);
  }
}

module.exports = {getclass , addclass , updateclass , deleteclass};