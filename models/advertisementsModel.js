const mongoose = require('mongoose');

const AdvertisementSchema = new mongoose.Schema({
    metaTitle: { type: String, required: false },
    metaKeyword: { type: String, required: false },
    metaDescription: { type: String, required: false },
    advertisementType: { type: String, required: true },
    advertisementDate: { type: Date, required: true },
    advertisementLocation: { type: String, required: true },
    advertisementImage: { type: String, required: true },
    status: { type: Boolean, default: false }
});

const AdvertisementModel = mongoose.model('advertisements', AdvertisementSchema);

module.exports = AdvertisementModel;
