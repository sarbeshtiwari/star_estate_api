const ContactUSModel = require('../models/contactUSModel');


// Create and Save a New Query
exports.createContactUS = async (req, res) => {
    const {
        Name, 
        Email, 
        phoneNumber, 
         
        user_query,
        created_at, 
        note, 
    } = req.body;

    if (!Name || !phoneNumber || !user_query) {
        return res.status(400).json({ success: false, message: "Name, Phone Number and User Query are required" });
    }

    try {
        const newQuery = new ContactUSModel({
            Name, 
            Email, 
            phoneNumber, 
            
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
exports.getContactUS = async (req, res) => {
    try {
        const Query = await ContactUSModel.find({});
        res.json(Query);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Update a ContactUS by ID
exports.updateQuery = async (req, res) => {
    const Id = req.params.id;
    const { note } = req.body;

    try {
        // Use findByIdAndUpdate with upsert option to create a new document if it does not exist
        const updatedQuery = await ContactUSModel.findByIdAndUpdate(
            Id,
            { $set: { note } }, // $set operator ensures only 'note' field is updated
            { new: true, upsert: true } // upsert creates a new document if one doesn't exist
        );

        res.json({ success: true, message: "Query updated successfully", updatedQuery });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// Delete a Query
exports.deleteContactUS = async (req, res) => {
    const { id } = req.params;

    try {
        const Query = await ContactUSModel.findById(id);
        if (!Query) {
            return res.status(404).json({ success: false, message: "Query not found" });
        }

        await ContactUSModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Query deleted successfully" });
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).send("Internal Server Error");
    }
};
