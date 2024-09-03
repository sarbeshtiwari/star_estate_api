const ClientModel = require('../models/clientSpeakModel');


exports.createClientWords = async (req, res) => {
    const {
        metaTitle, 
        metaKeyword, 
        metaDescription, 
        clientName,
        clientSubHeading,
        clientWords,
        status
    } = req.body;
    console.log(req.body)

    if (!clientName || !clientWords) {
        return res.status(400).json({ success: false, message: "Enter the required Data" });
    }


    const newAward = new ClientModel({
        metaTitle, 
        metaKeyword, 
        metaDescription, 
        clientName,
        clientSubHeading,
        clientWords,
        status      
    });

    try {
        // const existingEvent = await ClientModel.findOne({ eventName });
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

exports.getClientWords = async (req, res) => {
    try {
        const events = await ClientModel.find({});
        
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getClientWordsById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await ClientModel.findById(id);
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
//         const event = await ClientModel.findOne({ slugURL: req.params.slugURL });
//         if (!event) {
//             return res.status(404).json({ message: "Data not found" });
//         }
//         res.json(event);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Internal Server Error");
//     }
// };

exports.updateClientWords = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedEvent = await ClientModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.json({ success: true, message: "Event updated successfully", updatedEvent });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.updateClientWordstatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedEvent = await ClientModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.json({ success: true, message: "Event status updated successfully", updatedEvent });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteClientWords = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await ClientModel.findById(id);
        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }

        await ClientModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Event and associated image deleted successfully" });
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).send("Internal Server Error");
    }
};
