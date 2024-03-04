const ResponseModel = require('../models/Responses');
const CraftModel = require('../models/CraftModel');

exports.getAllResponsesForCraft = async (req, res) => {
    try {
        const { craftId } = req.query;
        const responses = await ResponseModel.find({
            replyOf: craftId
        })

        res.status(200).json({ message: "responses sent!", responses });
    } catch (error) {
        res.status(500).json({ message: "unable to get responses mongoose error", error })
    }
}

exports.addResponse = async (req, res) => {
    try {
        const { craftId, response } = req.body;

        const craftToBeResponded = await CraftModel.findById(craftId);
        
        if (!craftId || !response) {
            res.status(400).json({ message: "craftId or response content not found." })
        };

        if (!craftToBeResponded) {
            res.status(400).json({ message: "Craft not found!", craftId });
            return;
        };

        const responseToAdd = new ResponseModel({ 
            replyOf: craftId,
            content: response
        });
        
        const newResponse = await responseToAdd.save();

        const updatedCraft = await CraftModel.findByIdAndUpdate(
            craftId, 
            { $push: { responses: newResponse._id } },
            { new: true }
        )

        res.status(200).json({ message: "response added successfully", updatedCraft })

    } catch (error) {
        
        res.status(500).json({ message: "Error adding the resposne, mongoose error", error });
    }
}