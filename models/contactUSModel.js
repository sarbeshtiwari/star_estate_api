const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    user_query: { type: String, required: true },
    created_at: { type: Date, required: true },
    note: { type: String, required: false },
    utm_source: { type: String, required: false },
    utm_medium: { type: String, required: false },
    utm_campaign: { type: String, required: false },
    utm_term: { type: String, required: false },
    utm_content: { type: String, required: false }
});

const ContactUSModel = mongoose.model("contact_us", QuerySchema);

module.exports = ContactUSModel;
