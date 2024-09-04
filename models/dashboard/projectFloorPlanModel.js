const mongoose = require('mongoose');

const FloorPlanSchema = new mongoose.Schema({
    title: { type: String, required: true },
    area: { type: String, required: true },
    image: { type: String, required: true },
    projectname: { type: String, required: true },
    status: { type: Boolean, default: false }
});

const contentSchema = new mongoose.Schema({
    floorPlanContent: { type: String, default: '' },
});

const FloorPlanContent = new mongoose.Schema({
    projectname: { type: String, required: true },
    data: [contentSchema]
});

const FloorPlanModel = mongoose.model('FloorPlan', FloorPlanSchema);

const FloorPlanContentModel = mongoose.model('FloorPlan_content', FloorPlanContent);

module.exports = FloorPlanModel;
module.exports = FloorPlanContentModel;
