const mongoose = require('mongoose');

const ProjectReraSchema = new mongoose.Schema({
    title: { type: String, required: true },
    reraNO: { type: String, required: true },
    reraWebsite: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: Boolean, default: false },
});

const ProjectsRera = mongoose.model('star_rera', ProjectReraSchema);

module.exports = ProjectsRera;
