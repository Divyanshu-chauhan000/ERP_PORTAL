const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const {verifyToken} = require('../middlewares/authMiddleware');
const authorize = require('./../middlewares/roleMiddleware')
const {addStudentValidations} = require('./../validators/studentValidator');


router.get('/' , studentController.getAllstudents);
router.post('/' ,verifyToken,addStudentValidations, studentController.addAllstudents);
router.put('/:id' ,verifyToken, studentController.updateStudent);
router.delete('/:id' ,verifyToken,authorize(['admin']), studentController.deleteStudent);
router.get('/count-by-class' , verifyToken , studentController.getStudentclasswise);


router.get('/with-class', studentController.getStudentwithClass);
router.get('/total-students' , studentController.getTotalStudents);

module.exports = router;

