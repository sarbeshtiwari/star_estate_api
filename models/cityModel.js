const mongoose = require('mongoose');

const CityDataSchema = new mongoose.Schema({
    location_type: { type: String, required: true },
    metaTitle: { type: String },
    metaKeyword: { type: String },
    metaDescription: { type: String },
    ctcontent: { type: String },
    schema: { type: String },
    content_above_faqs: { type: String },
    image: { type: String }
}, { _id: false });

const CitySchema = new mongoose.Schema({
    location: { type: String, required: true },
    state: { type: String, required: true },
    priority: { type: String },
    status: { type: Boolean, default: false },
    data: [CityDataSchema]  // Array of subdocuments
});

module.exports = mongoose.model("City", CitySchema);
