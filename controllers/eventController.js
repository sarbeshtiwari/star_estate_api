const EventModel = require('../models/eventModel');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const deleteFromCloudinary = require('../middlewares/delete_cloudinery_image');
const ImageModel = require('../models/imageModel');

const createSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

exports.createEvent = async (req, res) => {
    const {
        metaTitle, 
        metaKeyword, 
        metaDescription, 
        eventName,
        eventDate,
        status
    } = req.body;

    if (!eventName || !eventDate) {
        return res.status(400).json({ success: false, message: "Event name and event date are required" });
    }
    const slugURL = createSlug(eventName);

    const newEvent = new EventModel({
        metaTitle, 
        metaKeyword, 
        metaDescription, 
        eventName,
        eventDate,
        eventImage: req.file ? req.file.filename : null,
        slugURL,
        status      
    });

    try {
        const existingEvent = await EventModel.findOne({ eventName });
        if (existingEvent) {
            return res.json({ success: false, message: "Event already exists" });
        }

        await newEvent.save();
        res.json({ success: true, message: "Event added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await EventModel.find({}).sort({ eventDate: -1 }); // Sort by eventDate in descending order
        const formattedEvents = events.map(event => ({
            ...event.toObject(),
            eventDate: moment(event.eventDate).format('DD MMMM, YYYY')
        }));
        res.json(formattedEvents);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};


exports.getEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await EventModel.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getEventBySlugURL = async (req, res) => {
    try {
        const event = await EventModel.findOne({ slugURL: req.params.slugURL });
        if (!event) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.json(event);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    if (req.file) {
        updateData.eventImage = req.file.filename;
    }

    try {
        const updatedEvent = await EventModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.json({ success: true, message: "Event updated successfully", updatedEvent });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.updateEventStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedEvent = await EventModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.json({ success: true, message: "Event status updated successfully", updatedEvent });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await EventModel.findById(id);
        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }

        const slugURL = event.slugURL;
        console.log(`Deleting event with slug: ${slugURL}`);

        // Delete associated image if it exists
        if (event.eventImage) {
            await deleteFromCloudinary(event.eventImage);
        }

        // Delete all images associated with the event using slugURL
        await ImageModel.deleteMany({ eventId: slugURL });

        // Delete the event document
        await EventModel.findByIdAndDelete(id);
        res.json({ success: true, message: `Event with slug ${slugURL} and associated images deleted successfully` });
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).send("Internal Server Error");
    }
};

