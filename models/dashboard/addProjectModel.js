const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    metaTitle: { type: String },
    metaKeyword: { type: String },
    metaDescription: { type: String },
    projectName: { type: String, required: true },
    projectAddress: { type: String, required: true },
    state: { type: String, requied: true},
    cityLocation: { type: String, required: true },
    projectLocality: { type: String, required: true },
    projectConfiguration: { type: String, required: true },
    projectBy: { type: String, required: true },
    // projectType: { type: String, required: true },
    projectPrice: { type: String, required: true },
    ivr_no: { type: String },
    locationMap: { type: String },
    rera_no: { type: String, required: true },
    rera_qr: {type: String, required: true},
    reraWebsite: {type: String, required: true},
    city_priority: { type: Number },
    luxury_priority: { type: Number },
    newLaunch_priority: { type: Number },
    featured_priority: { type: Number },
    recent_priority: { type: Number },
    residential_priority: { type: Number },
    commercial_priority: { type: Number },
    project_status: { type: [String], required: true },
    status: { type: Boolean, default: false },
    project_logo: { type: String },
    project_thumbnail: { type: String },
    property_type: { type: String, required: true },
    slugURL: {type: String, required: true}
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
