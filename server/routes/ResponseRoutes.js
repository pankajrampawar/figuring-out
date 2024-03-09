const express = require('express');
const router = express.Router();
const responseController = require('../controllers/responseController');
const authMiddleware = require('../middleware/authMiddleware')

router.get('/getResponses',authMiddleware, responseController.getAllResponsesForDrop);
router.post('/addResponse',authMiddleware, responseController.addResponse)
/// get responses of user..

module.exports = router;