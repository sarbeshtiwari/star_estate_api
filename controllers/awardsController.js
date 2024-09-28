const AwardModel = require('../models/awardsModel');
const moment = require('moment');
const deleteFromCloudinary = require('../middlewares/delete_cloudinery_image');


exports.createAwards = async (req, res) => {
    const {
        metaTitle, 
        metaKeyword, 
        metaDescription, 
        awardName,
        awardDate,
        
        status
    } = req.body;

    if (!awardName || !awardDate) {
        return res.status(400).json({ success: false, message: "Enter the required Data" });
    }


    const newAward = new AwardModel({
        metaTitle, 
        metaKeyword, 
        metaDescription, 
        awardName,
        awardDate,
        awardImage: req.file ? `star_estate/awards/${req.file.filename}` : null,
        status      
    });

    try {
        // const existingEvent = await AwardModel.findOne({ eventName });
        // if (existingEvent) {
        //     return res.json({ success: false, message: "Event already exists" });
        // }

        await newAward.save();
        res.json({ success: true, message: "Event added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getAwards = async (req, res) => {
    try {
        const events = await AwardModel.find({});
        const formattedEvents = events.map(event => ({
            ...event.toObject(),
            awardDate: moment(event.eventDate).format('DD MMMM, YYYY')
        }));
        res.json(formattedEvents);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getAwardsById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await AwardModel.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// exports.getEventBySlugURL = async (req, res) => {
//     try {
//         const event = await AwardModel.findOne({ slugURL: req.params.slugURL });
//         if (!event) {
//             return res.status(404).json({ message: "Data not found" });
//         }
//         res.json(event);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Internal Server Error");
//     }
// };

exports.updateAwards = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    if (req.file) {
        updateData.eventImage = `star_estate/awards/${req.file.filename}`;
    }

    try {
        const updatedEvent = await AwardModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.json({ success: true, message: "Event updated successfully", updatedEvent });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.updateAwardstatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedEvent = await AwardModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.json({ success: true, message: "Award status updated successfully", updatedEvent });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteAwards = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await AwardModel.findById(id);
        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }

        if (event.eventImage) {
            await deleteFromCloudinary(event.eventImage);

        }

        await AwardModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Event and associated image deleted successfully" });
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).send("Internal Server Error");
    }
};
