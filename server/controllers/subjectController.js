const {getDB} = require('./../configs/db');

const getallsubjects = async (req, res) =>{
  try{
    const db = getDB();
    query = "SELECT * FROM subjects ";

    const [subjects] = await db.query(query);
    res.json(subjects);
  }
  catch(error){
    res.json({message : "failed to fetch all subjects"});
  }
}

const addsubject = async (req, res) =>{
  try{
    const db = getDB();
    query = "INSERT INTO subjects (subject_name) VALUES (?)";
    
    const[subjects] = await db.query(query ,[ req.body.subject_name]);
    res.json(subjects);
  }
  catch(error){
    res.json({message : "failed to add subject"});
  }
}

const updatesubject = async (req , res) =>{
  try{
    const db = getDB();
    query = "UPDATE subjects SET subject_name = ? WHERE subject_id = ?";
    
    const [subjects ] = await db.query(query , [req.body.subject_name , req.params.id]);
    res.json(subjects);
  }
  catch(error){
    res.json({message : "failed to update subject"});
  }
}

const deletesubject = async (req, res) =>{
  try{
    const db = getDB();

    query =  "DELETE FROM subjects WHERE subject_id = ?";
    
    const [subjects] = await db.query(query , [req.params.id]);
    res.json(subjects);
  }
  catch(error){
    res.json({message  : "failed to delete the subject"});
  }
}

module.exports = {
  getallsubjects ,
  addsubject,
  updatesubject,
  deletesubject
}