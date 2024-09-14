// const { sendNRIQueryEmail } = require('../middlewares/nodeMailer');
const NRIQueryModel = require('../models/NriQueryModel');


// Create and Save a New Query
exports.createNRIQuery = async (req, res) => {
    const {
        Name, 
        Email, 
        phoneNumber, 
      
        user_query,
        created_at, 
        note,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content
    } = req.body;

    if (!Name || !phoneNumber) {
        return res.status(400).json({ success: false, message: "Name, Phone Number are required" });
    }

    try {
        const newQuery = new NRIQueryModel({
            Name, 
            Email, 
            phoneNumber, 
           
            user_query,
            created_at, 
            note, 
            utm_source,
            utm_medium,
            utm_campaign,
            utm_term,
            utm_content
        });

        // await sendNRIQueryEmail(Name, Email, phoneNumber, projectName, user_query,  utm_source,  utm_medium,  utm_campaign, utm_term, utm_content);

        await newQuery.save();
        res.json({ success: true, message: "Data added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch all Query
exports.getNRIQuery = async (req, res) => {
    try {
        const Query = await NRIQueryModel.find({});
        res.json(Query);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Update a NRIQuery by ID
exports.updateNRIQuery = async (req, res) => {
    const Id = req.params.id;
    const { note } = req.body;

    try {
        // Use findByIdAndUpdate with upsert option to create a new document if it does not exist
        const updatedQuery = await NRIQueryModel.findByIdAndUpdate(
            Id,
            { $set: { note } }, // $set operator ensures only 'note' field is updated
            { new: true, upsert: true } // upsert creates a new document if one doesn't exist
        );

        res.json({ success: true, message: "Data updated successfully", updatedQuery });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// Delete a Query
exports.deleteNRIQuery = async (req, res) => {
    const { id } = req.params;

    try {
        const Query = await NRIQueryModel.findById(id);
        if (!Query) {
            return res.status(404).json({ success: false, message: "Query not found" });
        }

        await NRIQueryModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Data deleted successfully" });
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).send("Internal Server Error");
    }
};
