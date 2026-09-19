const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const {verifyToken} = require('../middlewares/authMiddleware');

router.get('/' ,verifyToken, classController.getclass);
router.post('/' ,verifyToken, classController.addclass);
router.put('/:class_id' ,verifyToken, classController.updateclass);
router.delete('/:class_id' ,verifyToken, classController.deleteclass);

module.exports = router;