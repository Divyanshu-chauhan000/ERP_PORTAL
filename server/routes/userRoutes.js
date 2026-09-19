const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');


router.get('/' ,verifyToken, userController.getAllusers);
router.post('/' ,verifyToken, userController.addusers);
router.put('/:id' ,verifyToken, userController.updateusers);
router.delete('/:id' ,verifyToken, userController.deleteusers);

module.exports = router;