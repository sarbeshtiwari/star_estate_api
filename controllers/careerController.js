const CareerModel = require('../models/careerModel');
const path = require('path');
const fs = require('fs');
const { sendCareerEmail } = require('../middlewares/nodeMailer');

// Create and Save a New Career
exports.createCareer = async (req, res) => {
    const {
        Name, 
        Email, 
        phoneNumber, 
      
        category,
        location,
        job_type,
     
        created_at, 
        // note, 
        // utm_source,
        // utm_medium,
        // utm_campaign,
        // utm_term,
        // utm_content
    } = req.body;

    if (!Name || !phoneNumber || !req.file) {
        return res.status(400).json({ success: false, message: "Name, Phone Number and Resume are required" });
    }

    try {
        const newCareer = new CareerModel({
            Name, 
            Email, 
            phoneNumber, 
            
            category,
            location,
            job_type,
            resume: `star_estate/career_query/${req.file.filename}`,
            created_at, 
            // note, 
            // utm_source,
            // utm_medium,
            // utm_campaign,
            // utm_term,
            // utm_content
        });
        console.log('send')

        await sendCareerEmail(Name, Email, phoneNumber,  category, location, 
            // utm_source, utm_medium, utm_campaign, utm_term, utm_content
        );
        console.log('done')

        await newCareer.save();
        res.json({ success: true, message: "Career added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch all Career
exports.getCareer = async (req, res) => {
    try {
        const Career = await CareerModel.find({});
        res.json(Career);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Update a Career by ID
exports.updateCareer = async (req, res) => {
    const Id = req.params.id;
    const { note } = req.body;

    try {
        // Use findByIdAndUpdate with upsert option to create a new document if it does not exist
        const updatedCareer = await CareerModel.findByIdAndUpdate(
            Id,
            { $set: { note } }, // $set operator ensures only 'note' field is updated
            { new: true, upsert: true } // upsert creates a new document if one doesn't exist
        );

        res.json({ success: true, message: "Career updated successfully", updatedCareer });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



// Delete a Career
exports.deleteCareer = async (req, res) => {
    const { id } = req.params;

    try {
        const Career = await CareerModel.findById(id);
        if (!Career) {
            return res.status(404).json({ success: false, message: "Career not found" });
        }

        await CareerModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Career deleted successfully" });
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).send("Internal Server Error");
    }
};
