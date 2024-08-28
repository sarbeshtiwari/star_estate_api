const LocationAdvantage = require('../models/locationAdvantageModel');
const path = require('path');
const fs = require('fs');
const deleteFromCloudinary = require('../middlewares/delete_cloudinery_image')

// Helper function to ensure upload directory exists
const ensureUploadDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Add location advantages
exports.addLocationAdvantages = async (req, res) => {
    try {
        const locationAdvantagesArray = JSON.parse(req.body.data);

        if (!Array.isArray(locationAdvantagesArray)) {
            return res.status(400).json({ success: false, message: "Request body must be an array of LocationAdvantages" });
        }

        // Attach image file names to LocationAdvantagesArray
        locationAdvantagesArray.forEach((locationAdvantage, index) => {
            if (req.files[index]) {
                locationAdvantage.image = req.files[index].filename;
            }
        });

        const newLocationAdvantages = locationAdvantagesArray.map(la => new LocationAdvantage(la));
        await LocationAdvantage.insertMany(newLocationAdvantages);

        res.json({ success: true, message: "Data added successfully" });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all location advantages
exports.getAllLocationAdvantages = async (req, res) => {
    try {
        LocationAdvantage.find({})
        .then(LocationAdvantages => {
            res.json(LocationAdvantages);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Get location advantage by ID
exports.getLocationAdvantageById = async (req, res) => {
    try {
        const locationAdvantage = await LocationAdvantage.findById(req.params.id);
        if (!locationAdvantage) {
            return res.status(404).json({ error: "Not Found" });
        }
        res.json(locationAdvantage);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update status of location advantage
exports.updateLocationAdvantageStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedLocationAdvantage = await LocationAdvantage.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedLocationAdvantage) {
            return res.status(404).json({ success: false, message: "Data not found" });
        }
        res.json({ success: true, message: "Data status updated successfully", updatedLocationAdvantage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Delete location advantage
exports.deleteLocationAdvantage = async (req, res) => {
    try {
        const deletedLocationAdvantage = await LocationAdvantage.findByIdAndDelete(req.params.id);
        if (!deletedLocationAdvantage) {
            return res.status(404).json({ success: false, message: "Data not found" });
        }
        if (deletedLocationAdvantage.image) {
            
            await deleteFromCloudinary(deletedLocationAdvantage.image);
           
        }
        res.json({ success: true, message: "Data deleted successfully", deletedLocationAdvantage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update location advantage
exports.updateLocationAdvantage = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = JSON.parse(req.body.data);

        if (!Array.isArray(updates)) {
            return res.status(400).json({ success: false, message: "Request body must be an array of LocationAdvantages" });
        }

        const existingLocationAdvantage = await LocationAdvantage.findById(id);

        if (!existingLocationAdvantage) {
            return res.status(404).json({ success: false, message: "Location advantage not found" });
        }

        updates.forEach((update, index) => {
            if (req.files[index]) {
                update.image = req.files[index].filename;
            }
        });

        for (const update of updates) {
            await LocationAdvantage.findByIdAndUpdate(id, update, { new: true, runValidators: true });
        }

        res.json({ success: true, message: "Data updated successfully" });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
