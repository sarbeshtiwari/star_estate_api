const mongoose = require('mongoose');

const SubAmenitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    alt_tag: { type: String, required: true },
    status: { type: Boolean, default: false },
    image: { type: String, required: false },
});

const SubAmenityModel = mongoose.model("SubAmenity", SubAmenitySchema);

module.exports = SubAmenityModel;
