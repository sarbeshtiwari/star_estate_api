const mongoose = require('mongoose');

const DeveloperSchema = new mongoose.Schema({
    metaTitle: { type: String, required: false },
    metaKeyword: { type: String, required: false },
    metaDescription: { type: String, required: false },
    developerName: { type: String, required: true },
    no_of_projects: { type: Number, required: false },
    establishYear: { type: Number, required: false },
    ongoingProjects: { type: Number, required: false },
    experience: { type: Number, required: false },
    developerPriority: { type: Number, required: false },
    description: { type: String, required: false },
    developerLogo: { type: String, required: false },
    slugURL: { type: String, required: true },
    status: { type: Boolean, required: false, default: false }
});

const DeveloperModel = mongoose.model("developers", DeveloperSchema);

module.exports = DeveloperModel;
