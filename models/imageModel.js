const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    eventId: { type: String, required: true },
    imagePath: { type: String, required: true },
    status: { type: Boolean, default: false }
});

const ImageModel = mongoose.model('images', ImageSchema);

module.exports = ImageModel;
