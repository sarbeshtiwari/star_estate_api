const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    metaTitle: { type: String, required: false },
    metaKeyword: { type: String, required: false },
    metaDescription: { type: String, required: false },
    clientName: { type: String, required: true },
    clientSubHeading: { type: String, required: false },
    clientWords: { type: String, required: true },
    status: { type: Boolean, default: false }
});

const ClientModel = mongoose.model('clientsWords', ClientSchema);

module.exports = ClientModel;
