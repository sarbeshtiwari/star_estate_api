const mongoose = require('mongoose');

// Project Gallery Schema
const ProjectGallerySchema = new mongoose.Schema({
    // title: { type: String, required: true },
    alt: { type: String, required: true },
    desktopImage: { type: String, required: true },
    mobileImage: {type: String, required: true},
    projectname: { type: String, required: true },
    displayHome: { type: Boolean, default: false },
    amenityImage: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
});

// Content Schema for Gallery Content
const contentSchema = new mongoose.Schema({
    projectGalleryContent: { type: String, default: '' },
});

// Gallery Content Schema
const GalleryContent = new mongoose.Schema({
    projectname: { type: String, required: true },
    data: [contentSchema]
});

// Create Models
const ProjectsGallery = mongoose.model('project_gallery', ProjectGallerySchema);
const GalleryContentModel = mongoose.model('Gallery_content', GalleryContent);

// Export the models separately
module.exports = {
    ProjectsGallery,
    GalleryContentModel
};
