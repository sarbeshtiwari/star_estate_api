const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    job_type: { type: String, required: true },
    resume: { type: String, required: true },
    created_at: { type: Date, required: true },
    note: { type: String, required: false },
    utm_source: { type: String, required: false },
    utm_medium: { type: String, required: false },
    utm_campaign: { type: String, required: false },
    utm_term: { type: String, required: false },
    utm_content: { type: String, required: false }
});

const CareerModel = mongoose.model("career_query", CareerSchema);

module.exports = CareerModel;
