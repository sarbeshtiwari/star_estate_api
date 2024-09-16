const express = require('express');
const upload = require('../middlewares/bannerImage_Middleware');
const BannerImage = require('../models/bannerImagesModel');
const deleteFromCloudinary = require('../middlewares/delete_cloudinery_image');
const router = express.Router();

// Add a new banner image
router.post('/addImages', upload.fields([
    { name: 'desktop_image', maxCount: 1 },
    { name: 'mobile_image', maxCount: 1 },
    { name: 'tablet_image', maxCount: 1 }
]), async (req, res) => {
    try {
        const { alt_tag_desktop, alt_tag_mobile, alt_tag_tablet } = req.body;

        const newBanner = new BannerImage({
            desktop_image_url: req.files.desktop_image ? req.files.desktop_image[0].path : '',
            mobile_image_url: req.files.mobile_image ? req.files.mobile_image[0].path : '',
            tablet_image_url: req.files.tablet_image ? req.files.tablet_image[0].path : '',
            alt_tag_desktop,
            alt_tag_mobile,
            alt_tag_tablet,
        });

        await newBanner.save();
        res.status(201).json(newBanner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all banner images
router.get('/get', async (req, res) => {
    try {
        const banners = await BannerImage.find();
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a banner image by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const banner = await BannerImage.findById(req.params.id);

        if (!banner) {
            return res.status(404).json({ error: 'Banner not found' });
        }
        if (banner.desktop_image_url) {
            await deleteFromCloudinary(banner.desktop_image_url);
            // await deleteFromCloudinary(banner.tablet_image_url);
            // await deleteFromCloudinary(banner.mobile_image_url);          
        };
        if (banner.tablet_image_url){
            await deleteFromCloudinary(banner.tablet_image_url);
        };
        if (banner.mobile_image_url){await deleteFromCloudinary(banner.mobile_image_url);};

        await BannerImage.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Banner deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/updateStatus/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedBanner = await BannerImage.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedBanner) {
            return res.status(404).json({ success: false, message: "Image not found" });
        }
        res.json({ success: true, message: "Image status updated successfully", updatedBanner });
    } catch (err) {
        console.error(err);
        if (err instanceof mongoose.Error) {
            const { errors } = err;
            const formattedErrors = Object.values(errors).map(error => error.message);
            return res.status(400).json({ success: false, message: formattedErrors });
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
})


module.exports = router;
