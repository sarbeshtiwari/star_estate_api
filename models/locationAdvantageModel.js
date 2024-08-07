const mongoose = require('mongoose');

const locationAdvantageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    alt_tag: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: Boolean, default: false },
});

const LocationAdvantage = mongoose.model('location_advantages', locationAdvantageSchema);

module.exports = LocationAdvantage;
