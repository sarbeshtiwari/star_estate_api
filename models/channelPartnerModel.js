const mongoose = require('mongoose');

const ChannelPartnerSchema = new mongoose.Schema({
    broker_name: { type: String, required: true },
    company_name: { type: String, required: true },
    registration_no: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    created_at: { type: Date, default: Date.now, required: false },
    // note: { type: String, required: false },
});

const ChannelPartnerModel = mongoose.model("channel_partner", ChannelPartnerSchema);

module.exports = ChannelPartnerModel;
