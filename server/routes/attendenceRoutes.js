const express = require('express');
const router = express.Router();
const attendenceController = require('../controllers/attendenceController');
const {verifyToken} = require('../middlewares/authMiddleware');

router.get('/' ,verifyToken, attendenceController.getattendence);
router.post('/' ,verifyToken, attendenceController.addattendence);
router.put('/:id' ,verifyToken, attendenceController.updateattendence);
router.delete('/:id' ,verifyToken, attendenceController.deleteattendence);

router.get('/overAllAttendence' , verifyToken ,attendenceController.getOverallattendence)

router.get('/me' , verifyToken , attendenceController.getMyAttendence);
  
module.exports = router;