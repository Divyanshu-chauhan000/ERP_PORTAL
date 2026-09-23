const dotenv = require('dotenv');
dotenv.config();


const errorHandler = (err , req ,res, next) =>{
  console.log(err);
  res.status(500).json({message : err.message || "something went wrong" , stack : process.env.NODE_ENV === "development" ? err.stack :  undefined});
}

module.exports = errorHandler;