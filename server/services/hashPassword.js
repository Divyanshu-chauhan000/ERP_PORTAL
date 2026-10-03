const bcrypt = require('bcryptjs')

async function hashPassword(){
  const studentPass = await bcrypt.hash('teststudent123' , 10);
  const teacherPass = await bcrypt.hash('testteacher123' , 10);

  console.log("Student pass : " , studentPass);
  console.log("Teacher pass : ", teacherPass);
}

hashPassword();