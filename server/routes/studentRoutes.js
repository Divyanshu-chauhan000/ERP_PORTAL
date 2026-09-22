const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const {verifyToken} = require('../middlewares/authMiddleware');
const authorize = require('./../middlewares/roleMiddleware')
const {addStudentValidations} = require('./../validators/studentValidator');


router.get('/' , studentController.getAllstudents);
router.post('/' ,addStudentValidations, studentController.addAllstudents);
router.put('/:id' , studentController.updateStudent);
router.delete('/:id' , studentController.deleteStudent);


router.get('/with-class', studentController.getStudentwithClass);

module.exports = router;

