const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const {verifyToken} = require('../middlewares/authMiddleware');
const authorize = require('./../middlewares/roleMiddleware')


router.get('/' ,verifyToken, studentController.getAllstudents);
router.post('/' ,verifyToken, studentController.addAllstudents);
router.put('/:id' ,verifyToken, studentController.updateStudent);
router.delete('/:id' ,verifyToken,authorize(['admin']), studentController.deleteStudent);

module.exports = router;

