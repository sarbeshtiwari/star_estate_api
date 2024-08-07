const mongoose = require('mongoose');

const ProjectGallerySchema = new mongoose.Schema({
    title: { type: String, required: true },
    alt: { type: String, required: true },
    image: { type: String, required: true },
    projectname: { type: String, required: true },
    displayHome: { type: Boolean, default: false },
    status: { type: Boolean, default: false },
});

const ProjectsGallery = mongoose.model('project_gallery', ProjectGallerySchema);

module.exports = ProjectsGallery;
