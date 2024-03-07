const bcrypt = require('bcrypt')
const UserModel = require('../models/UserModel');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');

exports.createNewUser = async (req, res) => {
    try {
        const { username, password, college, year, branch } = req.body.user

        const userExist = await UserModel.findOne({ userName : username})

        if(userExist) {
            res.status(409).json({ message: "username already taken" });
            return;
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new UserModel({
            userName: username,
            password: hashedPassword,
            college: college,
            year: year,
            branch: branch,
        })

        await newUser.save();

        const accessToken = generateAccessToken(newUser._id);
        const refreshToken = generateRefreshToken(newUser);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true
        });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true
        })

        return res.status(200).json({ message: `Welcome to Whiseve, ${username}`, user: newUser });

    } catch(error) {
        return res.status(500).json({ message: "unable to create the user, please try again later. (controller error)", error });
    }
}

exports.userLogin = async (req, res) => {
    try {
        const { username, password } = req.body.user;

        // check if user name exists
        const user = await UserModel.findOne({ userName: username })

        if (!user) {
            return res.status(400).json({ message: "username does not exist" });
        }

        // check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(400).json({ message: "invalid password" });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly:  true,
            sameSite: 'None',
            secure: true
        })
        const userCopy = user;

        delete userCopy.password;

        return res.status(200).json({ message: "welcome back to Nexus", user: userCopy });

    } catch (error) {
       return res.status(500).json({ message: "unable to create the user, please try again later. (controller error)", error });
    }
}

exports.checkStatus = async (req, res) => {
    try {
        const userId = req.userId

        const user = await UserModel.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'user does not exist', status: false });
        }

        const userObject  = user.toObject();

        delete userObject.password;

        return res.status(200).json({ message: 'user found', status: true, user: userObject });
    } catch (error) {
        console.log("Error in check status", error);

        return res.status(500).json({ message: "internal server error", status: false });
    }
}

exports.sendFriendRequest = async (req, res) => {
    try {
        const {userId} = req.userId;
        const {friendId} = req.body;

        if (!userId || !friendId) {
            return res.status(400).json({ message: "Both userId and friendId are required" });
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.friends.includes(friendId) || user.friendsRequest.includes(friendId)) {
            return res.status(400).json({ message: "Friend request already sent or user is already a friend" });
        }

        user.friendsRequest.push(friendId);
        await user.save();

        return res.status(200).json({ message: "Friend request sent successfully" });
    } catch (error) {
        console.error("Error sending friend request:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

exports.acceptFriendRequest = async (req, res) => {
    try {
        const {userId} = req.userId;
        const {friendId} = req.body;

        if (!userId || !friendId) {
            return res.status(400).json({ message: "Both userId and friendId are required" });
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.friendsRequest.includes(friendId)) {
            return res.status(400).json({ message: "No friend request found" });
        }

        user.friendsRequest = user.friendsRequest.filter((id) => id !== friendId);
        user.friends.push(friendId);
        await user.save();

        const friend = await UserModel.findById(friendId);

        if (!friend) {
            return res.status(404).json({ message: "Friend not found" });
        }

        friend.friends.push(userId);
        await friend.save();

        return res.status(200).json({ message: "Friend request accepted successfully" });
    } catch (error) {
        console.error("Error accepting friend request:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

exports.rejectFriendRequest = async (req, res) => {

    try {
        const {userId} = req.userId;
        const {friendId} = req.body;

        if (!userId || !friendId) {
            return res.status(400).json({ message: "Both userId and friendId are required" });
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.friendsRequest.includes(friendId)) {
            return res.status(400).json({ message: "No friend request found" });
        }

        user.friendsRequest = user.friendsRequest.filter((id) => id !== friendId);
        await user.save();

        return res.status(200).json({ message: "Friend request rejected successfully" });
    } catch (error) {
        console.error("Error rejecting friend request:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};