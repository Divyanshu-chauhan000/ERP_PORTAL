const {body } = require('express-validator');

const addStudentValidations = [
  body('student_name').notEmpty().withMessage('Name is required'),
  body('student_dob').notEmpty().withMessage('DOB is required'),
  body('student_gender').notEmpty().withMessage('Gender is required'),
  body('student_address').notEmpty().withMessage('Address is required'),
  body('student_contact').notEmpty().withMessage('Contact is required'),
  body('student_admission_date').notEmpty().withMessage('Admission date  is required'),
  body('class_id').notEmpty().withMessage('class_id  is required'),
  
];;

module.exports = {addStudentValidations};