const CraftModel = require('../models/CraftModel')

exports.getAllCrafts = async (req, res) => {
    try {
        const crafts = await CraftModel.find({});
        
        res.status(200).json({ message: "found the craft successfully.", crafts });
    } catch (error) {
        res.status(500).json({ message: "unable to get the the Craft, please try again later. (controller error)", error });
    }
}

exports.getCraft = async (req, res) => {
    try {
        const { craftId } = req.query;
        
        if (!craftId) {
            res.status(400).json({ message: "craft id not found" });
            return;
        }

        const craft = await CraftModel.findById(craftId);

        res.status(200).json({ message: "craft found successfully", craft });
    } catch(error) {
        res.status(500).json({ message: "unable to get the the Craft, please try again later. (controller error)", error });
    }
}

exports.addCraft = async (req, res) => {
    try {

        const { craftToAdd, branch, year } = req.body;

        if (!craftToAdd) {
            res.status(400).json({ message: "craft is required" });
            return;
        }

        const newCraft = new CraftModel({
            content: craftToAdd, 
            branch: branch,
            year: year,
        })
        
        await newCraft.save();

        res.status(200).json({ message: "Craft updated successfully", craft: newCraft})
    } catch (error) {
        res.status(500).json({ message: "Some database error occured", error });
    }
}