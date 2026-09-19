const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const {verifyToken} = require('../middlewares/authMiddleware');

router.get('/' ,verifyToken, teacherController.getAllteachers);
router.post('/' ,verifyToken, teacherController.addTeacher);
router.put('/:id' ,verifyToken, teacherController.updateTeacher);
router.delete('/:id' ,verifyToken, teacherController.deleteteacher);

module.exports = router;