const mongoose = require('mongoose');

const ProjectGallerySchema = new mongoose.Schema({
    title: { type: String, required: true },
    alt: { type: String, required: true },
    image: { type: String, required: true },
    projectname: { type: String, required: true },
    displayHome: { type: Boolean, default: false },
    status: { type: Boolean, default: false },
});

const contentSchema = new mongoose.Schema({
    projectGalleryContent: { type: String, default: '' },
});

const GalleryContent = new mongoose.Schema({
    projectname: { type: String, required: true },
    data: [contentSchema]
});


const ProjectsGallery = mongoose.model('project_gallery', ProjectGallerySchema);

const GalleryContentModel = mongoose.model('Gallery_content', GalleryContent);


module.exports = ProjectsGallery;
module.exports = GalleryContentModel;