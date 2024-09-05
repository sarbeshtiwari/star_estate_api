const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    location: { type: String, required: true },
    status: {type: Boolean, required: false, default: false},
    projectConfiguration: { type: String, required: false },
    data: [{
        metaTitle: { type: String },
        metaKeyword: { type: String },
        metaDescription: { type: String },
        // projectConfiguration: { type: String, required: true },
        projectType: {type: String, required: true},
        ctcontent: { type: String, required: false },
        schema: { type: String, required: false },
        
        slugURL: {type: String, required: true}
    }]
   


});

const Project = mongoose.model("project_configuration", projectSchema);

module.exports = Project;

