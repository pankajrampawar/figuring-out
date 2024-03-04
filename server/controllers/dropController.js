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

exports.addDrop = async (req, res) => {
    try {

        const { dropToAdd, branch, year } = req.body;

        if (!dropToAdd) {
            res.status(400).json({ message: "drop is required" });
            return;
        }

        const newDrop = new DropModel({
            content: dropToAdd, 
            branch: branch,
            year: year,
        })
        
        await newDrop.save();

        res.status(200).json({ message: "Drop updated successfully", drop: newDrop})
    } catch (error) {
        res.status(500).json({ message: "Some database error occured", error });
    }
}