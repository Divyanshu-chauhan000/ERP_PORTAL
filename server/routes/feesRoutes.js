const express = require('express');
const router = express.Router();
const feesController = require('../controllers/feesController');
const {verifyToken} = require('../middlewares/authMiddleware');

router.get('/' ,verifyToken, feesController.getFees);
router.post('/' ,verifyToken, feesController.addfees);
router.put('/:id' ,verifyToken, feesController.updatefees);
router.delete('/:id' ,verifyToken, feesController.deletefees);

module.exports = router;