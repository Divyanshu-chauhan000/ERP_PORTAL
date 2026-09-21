const {getDB} = require('./../configs/db');

const getallsubjects = async (req, res , next) =>{
  try{
    const db = getDB();
    query = "SELECT * FROM subjects ";

    const [subjects] = await db.query(query);
    res.json(subjects);
  }
  catch(error){
   next(error);
  }
}

const addsubject = async (req, res , next) =>{
  try{
    const db = getDB();
    query = "INSERT INTO subjects (subject_name) VALUES (?)";
    
    const[subjects] = await db.query(query ,[ req.body.subject_name]);
    res.json(subjects);
  }
catch(error){
   next(error);
  }
}

const updatesubject = async (req, res , next) =>{
  try{
    const db = getDB();
    query = "UPDATE subjects SET subject_name = ? WHERE subject_id = ?";
    
    const [subjects ] = await db.query(query , [req.body.subject_name , req.params.id]);
    res.json(subjects);
  }
 catch(error){
   next(error);
  }
}

const deletesubject = async (req, res , next) =>{
  try{
    const db = getDB();

    query =  "DELETE FROM subjects WHERE subject_id = ?";
    
    const [subjects] = await db.query(query , [req.params.id]);
    res.json(subjects);
  }
 catch(error){
   next(error);
  }
}

module.exports = {
  getallsubjects ,
  addsubject,
  updatesubject,
  deletesubject
}