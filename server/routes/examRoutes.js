const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const {verifyToken} = require('../middlewares/authMiddleware');

router.get('/' ,verifyToken, examController.getExams);
router.post('/' ,verifyToken, examController.addExams);
router.put('/:id' ,verifyToken, examController.updateExams);
router.delete('/:id' ,verifyToken, examController.deleteExams);

module.exports = router;