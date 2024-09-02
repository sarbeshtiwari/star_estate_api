const mongoose = require('mongoose');

const bannerImageSchema = new mongoose.Schema({
    desktop_image_url: { type: String, required: false },
    mobile_image_url: { type: String, required: false },
    tablet_image_url: { type: String, required: false },
    alt_tag_desktop: { type: String, required: false },
    alt_tag_mobile: { type: String, required: false },
    alt_tag_tablet: { type: String, required: false },
    status: {type: Boolean, required: false, default: false}
}, { timestamps: true });

module.exports = mongoose.model('BannerImage', bannerImageSchema);
