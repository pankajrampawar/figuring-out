const DropModel = require('../models/DropModel')
const TagModel = require('../models/TagModel')
const NotificationModel = require('../models/NotificationModel')
const UserModel = require('../models/UserModel')

exports.getAllDrops = async (req, res) => {
    try {
        const drops = await DropModel.find({});
        
        res.status(200).json({ message: "found the drop successfully.", drops });
    } catch (error) {
        res.status(500).json({ message: "unable to get the the drop, please try again later. (controller error)", error });
    }
}

exports.getDrop = async (req, res) => {
    try {
        const { dropId } = req.query;
        
        if (!dropId) {
            res.status(400).json({ message: "drop id not found" });
            return;
        }

        const drop = await DropModel.findById(dropId);

        res.status(200).json({ message: "drop found successfully", drop });
    } catch(error) {
        res.status(500).json({ message: "unable to get the the Drop, please try again later. (controller error)", error });
    }
}

exports.addDirectDrop = async (req, res) => {
    try {

        const { content, branch, year, userName, tags } = req.body;

        if (!content && !branch && !year && !userName) {
            res.status(400).json({ message: "drop is required" });
            return;
        }

        const dropData = {
            content,
            branch,
            year,
            userName,
            userId: req.userId
        }

        if (tags && Array.isArray(tags) && tags.length > 0) {
            dropData.hashtags = tags
        }

        const newDrop = new DropModel(dropData);
        
        await newDrop.save();

        await UserModel.findByIdAndUpdate(req.userId, { $push: { drops: newDrop._id } });


        if (tags && Array.isArray(tags) && tags.length > 0) {
            tags.forEach(async (tag) => {
                const tagExists = await TagModel.findOne({ name: tag });
                if (tagExists) {
                    tagExists.drops.push(newDrop._id);
                    await tagExists.save();

                } else {
                    const newTag = new TagModel({ name: tag, drops: [newDrop._id] });
                    await newTag.save();
                }
            });
        }
        
        const usersWithConcerns = await UserModel.find({ wordsOfConcern: { $in: content.split(' ') } });

        if (usersWithConcerns.length > 0) {
            for (const user of usersWithConcerns) {
                const existingNotification = await NotificationModel.findOne({
                    user: user._id,
                    'unread.number': newDrop._id.toString()    
                });

                if (existingNotification) {
                    existingNotification.unread.push({
                        content: `Urgent! drop containing words of concern added: ${content}`,
                        number: newDrop._id.toString()
                    });

                    await existingNotification.save();
                } else {
                    await NotificationModel.create({
                        user: user._id,
                        unread: [{
                            content: `Drop containing words of concern added: ${content}`,
                            number: newDrop._id.toString()
                        }]
                    });
                    await UserModel.findByIdAndUpdate(req.userId,{Notification: newnotification._id });
                }
            }
        }

        res.status(200).json({ message: "Drop updated successfully", drop: newDrop})
    } catch (error) {
        res.status(500).json({ message: "Some database error occured", error });
    }
}

exports.addAnonymousDrop = async (req, res) => {
    try {
        const { content, branch, year, tags } = req.body;

        if ( !content && !branch && !year ) {
            res.status(404).json({ message: "content not found!", error });
            return;
        }

        const newDropData = {
            content,
            branch,
            year,
            userId: req.userId,
        }

        if (tags && Array.isArray(tags) && tags.length > 0) {
            newDropData.hashtags = tags;  
        }

        console.log(newDropData)
        const newDrop = new DropModel(newDropData);

        await newDrop.save();

        await UserModel.findByIdAndUpdate(req.userId, { $push: { drops: newDrop._id } });


        if (tags && Array.isArray(tags) && tags.length > 0) {
            tags.forEach(async (tag) => {
                const tagExists = await TagModel.findOne({ name: tag });
                if (tagExists) {
                    tagExists.drops.push(newDrop._id);
                    await tagExists.save();
                } else {
                    const newTag = new TagModel({ name: tag, drops: [newDrop._id] });
                    await newTag.save();
                }
            });
        }
        
        const usersWithConcerns = await UserModel.find({ wordsOfConcern: { $in: content.split(' ') } });

        if (usersWithConcerns.length > 0) {
            for (const user of usersWithConcerns) {
                const existingNotification = await NotificationModel.findOne({
                    user: user._id,
                    'unread.number': newDrop._id.toString()    
                });

                if (existingNotification) {
                    existingNotification.unread.push({
                        content: `Urgent! drop containing words of concern added: ${content}`,
                        number: newDrop._id.toString()
                    });

                    await existingNotification.save();
                } else {
                    const newnotification=await NotificationModel.create({
                        user: user._id,
                        unread: [{
                            content: `Drop containing words of concern added: ${content}`,
                            number: newDrop._id.toString()
                        }]
                    });
                    await UserModel.findByIdAndUpdate(req.userId,{Notification: newnotification._id });
                }
            }
        }

        return res.status(200).json({ message: 'drop added successfully', drop: newDrop });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error", error})
    }
}

exports.getDropForUser = async (req, res) => {
    try {
        const { userId } = req.userId;

        if (!userId) {
            res.status(400).json({ message: "userId not found" });
            return;
        }

        const user = await UserModel.findById(userId).populate('drops');

        if (!user) {
            res.status(400).json({ message: "user not found" });
            return;
        }

        res.status(200).json({ message: "drops found successfully", drops: user.drops });
    } catch (error) {
        res.status(500).json({ message: "unable to get the Drop, please try again later. (controller error)", error });
    }
}

exports.likeDrop = async (req, res) => {
    try {
        const { dropId, direct } = req.body;

        if (!dropId) {
            res.status(400).json({ message: "drop id not found" });
            return;
        }

        const drop = await DropModel.findById(dropId);

        if (!drop) {
            res.status(400).json({ message: "drop not found" });
            return;
        }

        if (drop.likes.includes(req.userId)) {
            res.status(400).json({ message: "drop already liked" });
            return;
        }

        drop.likes.push(req.userId);   // adds userId to likes array

        await drop.save(); // saves like

        res.status(200).json({ message: "drop liked successfully", drop });

        const existingNotification = await NotificationModel.findOne({
            user: drop.userId,
        });

        if (!direct) {  // returns if drop is indirect i.e. anonymous
            return;
        }

        content = "Hey! Someone liked your drop"; // message

        if (existingNotification) {
            existingNotification.unread.push({ content });

            await existingNotification.save();
        } else {
            const newNotification = await NotificationModel.create({
                user: drop.userId,
                unread: [{ content }]
            });

            await UserModel.findByIdAndUpdate(drop.userId, { Notification: newNotification._id });
        } 

        return;
    } catch(error) {
        res.status(500).json({ message: "unable to like the Drop, please try again later. (controller error)", error });
    }
}

exports.removelikeDrop = async (req, res) => {
    try {
        const { dropId } = req.body;

        if (!dropId) {
            res.status(400).json({ message: "drop id not found" });
            return;
        }

        const drop = await DropModel.findById(dropId);

        if (!drop) {
            res.status(400).json({ message: "drop not found" });
            return;
        }

        if (!drop.likes.includes(req.userId)) {
            res.status(400).json({ message: "drop not liked" });
            return;
        }

        drop.likes = drop.likes.filter((like) => like !== req.userId);

        await drop.save();

        res.status(200).json({ message: "drop unliked successfully", drop });
    } catch (error) {
        res.status(500).json({ message: "unable to unlike the Drop, please try again later. (controller error)", error });
    }
}
