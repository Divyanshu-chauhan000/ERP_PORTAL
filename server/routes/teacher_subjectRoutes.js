const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/authMiddleware');
const teacher_subjectController = require('../controllers/teacher_subjectController');


router.get('/' ,verifyToken, teacher_subjectController.getTeacher_subject);
router.post('/' ,verifyToken, teacher_subjectController.addTeacher_subject);
router.put('/:id' ,verifyToken, teacher_subjectController.updateTeacher_subject);
router.delete('/:id' ,verifyToken, teacher_subjectController.deleteTeacher_subject);

module.exports = router;