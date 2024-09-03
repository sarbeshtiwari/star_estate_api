const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    metaTitle: { type: String, required: false },
    metaKeyword: { type: String, required: false },
    metaDescription: { type: String, required: false },
    eventName: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventImage: { type: String, required: true },
    slugURL: { type: String, required: true },
    status: { type: Boolean, default: false }
});

const EventModel = mongoose.model('events', EventSchema);

module.exports = EventModel;
