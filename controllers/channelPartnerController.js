const { sendChannelPartneremail } = require('../middlewares/nodeMailer');
const ChannelPartnerModel = require('../models/channelPartnerModel');

// Create and Save a New Query
exports.createChannelPartner = async (req, res) => {
    const {
        broker_name,
        company_name,
        registration_no, 
        email, 
        phoneNumber,        
        created_at,         
        
    } = req.body;

    if (!broker_name || !phoneNumber || !company_name || !registration_no || !email) {
        return res.status(400).json({ success: false, message: "broker_name, company_name, registration number, email and Phone Number are required" });
    }

    try {
        const newQuery = new ChannelPartnerModel({
            broker_name, 
            company_name,
            registration_no,
            email, 
            phoneNumber,            
            created_at,             
           
        });

        await sendChannelPartneremail(broker_name, company_name, registration_no, email, phoneNumber);

        await newQuery.save();
        res.json({ success: true, message: "Data added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch all Query
exports.getChannelPartner = async (req, res) => {
    try {
        const Query = await ChannelPartnerModel.find({});
        res.json(Query);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Update a ChannelPartner by ID
// exports.updateChannelPartner = async (req, res) => {
//     const Id = req.params.id;
//     const { registration_no } = req.body;

//     try {
//         // Use findByIdAndUpdate with upsert option to create a new document if it does not exist
//         const updatedQuery = await ChannelPartnerModel.findByIdAndUpdate(
//             Id,
//             { $set: { registration_no } }, // $set operator ensures only 'registration_no' field is updated
//             { new: true, upsert: true } // upsert creates a new document if one doesn't exist
//         );

//         res.json({ success: true, message: "Data updated successfully", updatedQuery });
//     } catch (err) {
//         console.error("Update Error:", err);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };


// Delete a Query
exports.deleteChannelPartner = async (req, res) => {
    const { id } = req.params;

    try {
        const Query = await ChannelPartnerModel.findById(id);
        if (!Query) {
            return res.status(404).json({ success: false, message: "Query not found" });
        }

        await ChannelPartnerModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Data deleted successfully" });
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).send("Internal Server Error");
    }
};
