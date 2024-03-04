const express = require('express');
const router = express.Router();
const responseController = require('../controllers/responseController');
const authMiddleware = require('../middleware/authMiddleware')

router.get('/getResponses',authMiddleware, responseController.getAllResponsesForCraft);
router.post('/addResponse',authMiddleware, responseController.addResponse)

module.exports = router;