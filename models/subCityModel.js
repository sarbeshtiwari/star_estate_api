const mongoose = require('mongoose');

const UserSchemaSubCity = new mongoose.Schema({
    metaTitle: { type: String },
    metaKeyword: { type: String },
    metaDescription: { type: String },
    content_type: { type: String },
    briefContent: {type: String, required: true},
    ctcontent: { type: String },
    schema: { type: String },
    content_above_faqs: { type: String },
    image: { type: String }
});

const SubCitySchema = new mongoose.Schema({
    city: { type: String, required: true },
    slugURL : {type: String, required: true},
    sub_city: { type: String, required: true },
    priority: { type: String },
    status: { type: Boolean, default: false },
    data: [UserSchemaSubCity]
});

module.exports = mongoose.model("sub_cities", SubCitySchema);
