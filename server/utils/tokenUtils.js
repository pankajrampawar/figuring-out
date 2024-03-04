const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(userId) {
    return jwt.sign({ userId: userId}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
}

function generateRefreshToken(user) {
    return jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET);
}

function verifyToken(token, secret) {
    try {
        const decoded = jwt.verify(token, secret);
        
        return decoded;
    } catch (error) {
        console.log("token verification failded", error);
        return null;
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken
};
