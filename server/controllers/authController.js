const {getDB} = require('./../configs/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const login = async (req, res , next) =>{

  try{
  const db = getDB();
  query = "SELECT * FROM users WHERE username = ?";
  const [users] = await db.query(query , [req.body.username]);
  const user = users[0];

  if(!user){
    res.status(404).json({message : "User Not Found"});
  } 
  else{
    const isMatched = await bcrypt.compare(req.body.password , user.password);
    if(isMatched){
      const token =  jwt.sign(
        {
        id : user.user_id ,
        role : user.role
        },
        process.env.JWT_SECRET , 
        {
          expiresIn : '7d'
        }
      )
      res.status(200).json({message : "Login Successfull" , token : token});
    }
    else{
      res.status(401).json({message : "Invalid Credentials"})
    }
    
  }
  }
 catch(error){
   next(error);
  }



}

module.exports = { login };