const express = require('express');
const router = express.Router();
const dropController = require('../controllers/dropController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/getDrops', authMiddleware,  dropController.getAllDrops);
router.get('/getDrop', authMiddleware , dropController.getDrop)
router.post('/addDrop', authMiddleware, dropController.addDrop)

module.exports = router;