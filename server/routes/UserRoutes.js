const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post("/signup", userController.createNewUser);
router.post('/login', userController.userLogin)
router.get("/checkStatus", authMiddleware, userController.checkStatus);

module.exports = router
