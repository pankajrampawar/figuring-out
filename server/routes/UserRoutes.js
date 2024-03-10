const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post("/signup", userController.createNewUser);
router.post('/login', userController.userLogin)
router.get("/checkStatus", authMiddleware, userController.checkStatus);
router.post("/friendRequest", authMiddleware, userController.sendFriendRequest);
router.post("/acceptRequest", authMiddleware, userController.acceptFriendRequest);
router.post("/rejectRequest", authMiddleware, userController.rejectFriendRequest);
router.get("/getUser", authMiddleware, userController.getUserProfile)
router.post('/updateProfilePic', authMiddleware, userController.updateUserProfilePic);
router.post('/updateProfile', authMiddleware, userController.updateProfile)

module.exports = router
