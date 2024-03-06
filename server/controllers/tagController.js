const TagModel = require("../models/TagModel")

exports.getTags = async (req, res) => {
    try {
        const tags = await TagModel.aggregate([
            {
                $project: {
                    name: 1,
                    dropsCount: { $size: "$drops" }
                }
            },
            {
                $sort: { dropsCount: -1 }
            },
            {
                $limit: 10
            }
        ]);
        
        res.status(200).json({ message: "Top 10 tags with most drops.", tags });
    } catch (error) {
        res.status(500).json({ message: "Unable to get the top tags, please try again later. (controller error)", error });
    }
}
