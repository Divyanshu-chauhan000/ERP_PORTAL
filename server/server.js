const express = require('express');
const dotenv = require('dotenv');
const {connectDB} = require('./configs/db');

dotenv.config();
const app =express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use('/students' , require('./routes/studentRoutes'));
app.use('/teachers' , require('./routes/teacherRoutes'));
app.use('/subjects' , require('./routes/subjectRoutes'));
app.use('/class' , require('./routes/classRoutes'));
app.use('/fees' , require('./routes/feesRoutes'));
app.use('/attendence' , require('./routes/attendenceRoutes'));
app.use('/exam' , require('./routes/examRoutes'));
app.use('/teacher_subject' , require('./routes/teacher_subjectRoutes'));
app.use('/users' , require('./routes/userRoutes'));
app.use('/auth' , require('./routes/authRoutes'));


connectDB().then(() => {
app.listen(process.env.PORT , () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
});


