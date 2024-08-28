const QueryModel = require('../models/queryModel');
const path = require('path');
const fs = require('fs');

// Create and Save a New Query
exports.createQuery = async (req, res) => {
    const {
        Name, 
        Email, 
        phoneNumber, 
        projectName, 
        user_query,
        created_at, 
        note, 
    } = req.body;

    if (!Name || !phoneNumber || !user_query) {
        return res.status(400).json({ success: false, message: "Name, Phone Number and User Query are required" });
    }

    try {
        const newQuery = new QueryModel({
            Name, 
            Email, 
            phoneNumber, 
            projectName, 
            user_query,
            created_at, 
            note, 
        });

        await newQuery.save();
        res.json({ success: true, message: "Query added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch all Query
exports.getQuery = async (req, res) => {
    try {
        const Query = await QueryModel.find({});
        res.json(Query);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Update a Query by ID
exports.updateQuery = async (req, res) => {
    const Id = req.params.id;
    const { note } = req.body;

    try {
        const updatedQuery = await QueryModel.findByIdAndUpdate(Id, note, { new: true });
        if (!updatedQuery) {
            return res.status(404).json({ success: false, message: "Query not found" });
        }
        res.json({ success: true, message: "Query updated successfully", updatedQuery });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// Delete a Query
exports.deleteQuery = async (req, res) => {
    const { id } = req.params;

    try {
        const Query = await QueryModel.findById(id);
        if (!Query) {
            return res.status(404).json({ success: false, message: "Query not found" });
        }

        await QueryModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Query deleted successfully" });
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).send("Internal Server Error");
    }
};
