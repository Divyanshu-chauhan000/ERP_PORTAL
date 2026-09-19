const mysql2 = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

let database ;

const connectDB = async () =>{
  
  try{
    database = await mysql2.createConnection({
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME
});

  console.log(`Database connected successfully to ${process.env.DB_NAME}`);
  }
  catch(error){
    console.log("Failed to connect with database ", error);
    process.exit(1);
  }
}

const getDB = () => database;

module.exports = {connectDB , getDB};