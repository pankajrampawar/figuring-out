const DropModel = require('../models/DropModel')

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

        const { content, branch, year, username, tags } = req.body;

        if (!dropToAdd && !branch && !year && !username) {
            res.status(400).json({ message: "drop is required" });
            return;
        }

        const dropData = {
            content,
            branch,
            year,
            username,
        }

        if (tags && Array.isArray(tags) && tags.length > 0) {
            dropData.hashtags = tags
        }

        const newDrop = new DropModel(dropData);
        
        await newDrop.save();

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
        }

        if (tags && Array.isArray(tags) && tags.length > 0) {
            newDropData.hashtags = tags;  
        }

        console.log(newDropData)
        const newDrop = new DropModel(newDropData);

        await newDrop.save();

        return res.status(200).json({ message: 'drop added successfully', drop: newDrop });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error", error})
    }
}