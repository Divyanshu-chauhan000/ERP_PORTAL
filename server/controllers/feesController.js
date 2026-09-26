const {getDB } = require('./../configs/db');

const getFees  = async (req, res , next) =>{
  try{
    const db = getDB();
    const [fees] = await db.query("SELECT *FROM fees");
    res.json(fees);
  }
  catch(error){
   next(error);
  }
}

const addfees = async (req, res , next) =>{
  try{
    const db = getDB();
    query = "INSERT INTO fees (class_id , student_id , total_fees , date_of_payment , balance_due) VALUES (?,?,?,?,?)";
    const [fees] = await db.query(query , [req.body.class_id , req.body.student_id , req.body.total_fees , req.body.date_of_payment , req.body.balance_due]);

    res.json(fees);
  }
  catch(error){
   next(error);
  }
}


const updatefees = async (req, res , next) =>{
  try{
    const db = getDB();
    query = "UPDATE fees SET class_id = ? , student_id = ? , total_fees = ? , date_of_payment = ? , balance_due = ? WHERE fees_id = ?";
    const [fees] = await db.query(query , [req.body.class_id , req.body.student_id , req.body.total_fees , req.body.date_of_payment , req.body.balance_due , req.params.id]);
    res.json(fees);
  }
  catch(error){
   next(error);
  }
}

const deletefees = async (req, res , next) =>{
  try{
    const db = getDB();
    query = "DELETE FROM fees WHERE fees_id = ?";
    const [fees] = await db.query(query , [req.params.id]);
    res.json(fees);
  }
  catch(error){
   next(error);
  }
}


//get total collected fees record 

const totalFeesCollected = async (req , res , next) =>{
try{
 const db =  getDB();
 query = "SELECT SUM(total_fees - balance_due) as total_collected_fees FROM fees";
 const [totalcollectedFees] = await db.query(query);
 res.json(totalcollectedFees);
}
catch(error){
  next(error);
}
}

// get balance fees 

const balance_due = async (req, res, next) =>{
  try{
    const db = getDB();
    query = "SELECT SUM(balance_due) as balance_fees FROM fees";
    const [balance] = await db.query(query);
    res.json(balance);
  }
  catch(error){
    next(error);
  }
}

module.exports = { getFees , addfees , updatefees , deletefees , totalFeesCollected , balance_due };