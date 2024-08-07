const mongoose = require('mongoose');

const AmenitySchema = new mongoose.Schema({
    category: { type: String, required: true },
    added_on: { type: Date, default: Date.now },
    status: { type: Boolean, default: false }
});

const AmenityModel = mongoose.model("Amenity", AmenitySchema);

module.exports = AmenityModel;
