const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/authMiddleware');
const subjectController = require('../controllers/subjectController');


router.get('/' ,verifyToken, subjectController.getallsubjects);
router.post('/' ,verifyToken, subjectController.addsubject);
router.put('/:id' ,verifyToken, subjectController.updatesubject);
router.delete('/:id' ,verifyToken, subjectController.deletesubject);

module.exports = router;