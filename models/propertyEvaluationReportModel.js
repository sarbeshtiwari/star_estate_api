const mongoose = require('mongoose');

const PropertyEvaluationSchema = new mongoose.Schema({
    propertyType: {type: String, required: true},
    buildingType: {type: String, required: true},
    unitType: {type: String, required: true},
    area: {type: String, required: true},
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    propertyAge: {type: Number, required: false},
    floorNo: {type: Number, required: false},
    totalFloors: {type: Number, required: false},
    coveredParkings: {type: Number, required: false},
    facing: {type: String, required: false},
    unitNo: {type: String, required: false},
    message: {type: String, required: false},
    created_at: { type: Date, default: Date.now, required: false },
    // note: { type: String, required: false },
});

const PropertyEvaluationModel = mongoose.model("property_evaluation", PropertyEvaluationSchema);

module.exports = PropertyEvaluationModel;
