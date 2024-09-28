const AdvertisementModel = require('../models/advertisementsModel');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const deleteFromCloudinary = require('../middlewares/delete_cloudinery_image');


exports.createAdvertisements = async (req, res) => {
    const {
        metaTitle, 
        metaKeyword, 
        metaDescription, 
        advertisementType,
        advertisementDate,
        advertisementTitle,
        videoURL,
        status
    } = req.body;

    if (!advertisementType || !advertisementDate) {
        return res.status(400).json({ success: false, message: "Enter the required Data" });
    }


    const newAdvertisement = new AdvertisementModel({
        metaTitle, 
        metaKeyword, 
        metaDescription, 
        advertisementType,
        advertisementDate,
        advertisementTitle,
        videoURL,
        advertisementImage: req.file ? `star_estate/advertisements/${req.file.filename}` : ' ',
        status      
    });

    try {
        // const existingEvent = await AdvertisementModel.findOne({ eventName });
        // if (existingEvent) {
        //     return res.json({ success: false, message: "Event already exists" });
        // }

        await newAdvertisement.save();
        res.json({ success: true, message: "Event added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getAdvertisements = async (req, res) => {
    try {
        const events = await AdvertisementModel.find({});
        const formattedEvents = events.map(event => ({
            ...event.toObject(),
            advertisementDate: moment(event.eventDate).format('DD MMMM, YYYY')
        }));
        res.json(formattedEvents);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getAdvertisementsById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await AdvertisementModel.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// exports.getEventBySlugURL = async (req, res) => {
//     try {
//         const event = await AdvertisementModel.findOne({ slugURL: req.params.slugURL });
//         if (!event) {
//             return res.status(404).json({ message: "Data not found" });
//         }
//         res.json(event);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Internal Server Error");
//     }
// };

exports.updateAdvertisements = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    if (req.file) {
        updateData.eventImage = `star_estate/advertisements/${req.file.filename}`;
    }

    try {
        const updatedEvent = await AdvertisementModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.json({ success: true, message: "Event updated successfully", updatedEvent });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.updateAdvertisementstatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedEvent = await AdvertisementModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.json({ success: true, message: "Event status updated successfully", updatedEvent });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteAdvertisements = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await AdvertisementModel.findById(id);
        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }

        if (event.eventImage) {
            await deleteFromCloudinary(event.eventImage);

        }

        await AdvertisementModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Event and associated image deleted successfully" });
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).send("Internal Server Error");
    }
};
