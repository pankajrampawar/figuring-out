const express = require('express');
const router = express.Router();
const craftController = require('../controllers/craftController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/getCrafts', authMiddleware,  craftController.getAllCrafts);
router.get('/getCraft', authMiddleware , craftController.getCraft)
router.post('/addCraft', authMiddleware, craftController.addCraft)

module.exports = router;