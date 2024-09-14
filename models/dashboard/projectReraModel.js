const mongoose = require('mongoose');

const ProjectReraSchema = new mongoose.Schema({
    title: { type: String, required: true },
    reraHeading: { type: String, required: true },
    reraWebsite: { type: String, required: true },
    image: { type: String, required: true },
    projectname: { type: String, required: true },
    status: { type: Boolean, default: true },
});

const ProjectsRera = mongoose.model('project_rera', ProjectReraSchema);

module.exports = ProjectsRera;
