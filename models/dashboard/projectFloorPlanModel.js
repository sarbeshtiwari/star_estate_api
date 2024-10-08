const mongoose = require('mongoose');

// Floor Plan Schema
const FloorPlanSchema = new mongoose.Schema({
    title: { type: String, required: true },
    areaRangeSqft: { type: String, required: true },
    areaRangeSqm: { type: String, required: true },
    image: { type: String, required: false },
    projectname: { type: String, required: true },
    status: { type: Boolean, default: true }
});

// Content Schema for FloorPlanContent
const contentSchema = new mongoose.Schema({
    floorPlanContent: { type: String, default: '' },
});

// Floor Plan Content Schema
const FloorPlanContent = new mongoose.Schema({
    projectname: { type: String, required: true },
    data: [contentSchema]
});

// Create Models
const FloorPlanModel = mongoose.model('FloorPlan', FloorPlanSchema);
const FloorPlanContentModel = mongoose.model('FloorPlan_content', FloorPlanContent);

// Export the models separately
module.exports = {
    FloorPlanModel,
    FloorPlanContentModel
};
