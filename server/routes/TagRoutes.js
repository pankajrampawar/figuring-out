const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/getTags', authMiddleware,  tagController.getTags);


module.exports = router;