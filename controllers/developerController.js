const DeveloperModel = require('../models/developerModel');
const path = require('path');
const fs = require('fs');
const deleteFromCloudinary = require('../middlewares/delete_cloudinery_image');


const createSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };


// Create and Save a New Developer
exports.createDeveloper = async (req, res) => {
    const {
        metaTitle, 
        metaKeyword, 
        metaDescription, 
        developerName, 
        // no_of_projects,
        // establishYear, 
        // ongoingProjects, 
        // experience, 
        developerPriority, 
        description, 
        status
    } = req.body;

    if (!developerName) {
        return res.status(400).json({ success: false, message: "Developer Name, No of Projects and Establish year are required" });
    }

    try {
        const existingDeveloper = await DeveloperModel.findOne({ developerName });
        if (existingDeveloper) {
            return res.json({ success: false, message: "Developer Name already found" });
        }

        const slugURL = createSlug(developerName);

        const newDeveloper = new DeveloperModel({
            metaTitle, 
            metaKeyword, 
            metaDescription, 
            developerName, 
            // no_of_projects,
            // establishYear, 
            // ongoingProjects, 
            // experience, 
            developerPriority, 
            // developerLogo: req.file ? req.file.filename : null, 
            description, 
            slugURL,
            status
        });

        await newDeveloper.save();
        res.json({ success: true, message: "Developer added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch all developers
exports.getDevelopers = async (req, res) => {
    try {
        const developers = await DeveloperModel.find({});
        res.json(developers);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Get a developer by ID
exports.getDeveloperById = async (req, res) => {
    const developerId = req.params.id;
    
    try {
        const developer = await DeveloperModel.findById(developerId);
        if (!developer) {
            return res.status(404).json({ message: "Developer not found" });
        }
        res.json(developer);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getDeveloperBySlugURL = async (req, res) => {
    try {
        const developer = await DeveloperModel.findOne({ slugURL: req.params.slugURL });
        if (!developer) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.json(developer);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Update a developer by ID
exports.updateDeveloper = async (req, res) => {
    const developerId = req.params.id;
    const updateData = req.body;

    // if (req.file) {
    //     updateData.developerLogo = req.file.filename;
    // }

    try {
        const updatedDeveloper = await DeveloperModel.findByIdAndUpdate(developerId, updateData, { new: true });
        if (!updatedDeveloper) {
            return res.status(404).json({ success: false, message: "Developer not found" });
        }
        res.json({ success: true, message: "Developer updated successfully", updatedDeveloper });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Update status of a developer
exports.updateDeveloperStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedDeveloper = await DeveloperModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedDeveloper) {
            return res.status(404).json({ success: false, message: "Developer not found" });
        }
        res.json({ success: true, message: "Developer status updated successfully", updatedDeveloper });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Delete a developer
exports.deleteDeveloper = async (req, res) => {
    const { id } = req.params;

    try {
        const developer = await DeveloperModel.findById(id);
        if (!developer) {
            return res.status(404).json({ success: false, message: "Developer not found" });
        }

        // if (developer.developerLogo) {
        //    await deleteFromCloudinary(developer.developerLogo);
        // }

        await DeveloperModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Developer and associated image deleted successfully" });
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).send("Internal Server Error");
    }
};
