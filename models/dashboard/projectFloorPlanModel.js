const mongoose = require('mongoose');

const FloorPlanSchema = new mongoose.Schema({
    title: { type: String, required: true },
    area: { type: String, required: true },
    image: { type: String, required: true },
    projectname: { type: String, required: true },
    status: { type: Boolean, default: false }
});

const FloorPlanModel = mongoose.model('FloorPlan', FloorPlanSchema);

module.exports = FloorPlanModel;
