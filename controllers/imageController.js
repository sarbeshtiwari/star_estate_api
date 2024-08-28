const ImageModel = require('../models/imageModel');
const path = require('path');
const fs = require('fs');
const deleteFromCloudinary = require('../middlewares/delete_cloudinery_image');

exports.uploadEventImages = async (req, res) => {
    const { id } = req.params;
    const { files } = req;

    if (!files || files.length === 0) {
        return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    try {
        const imagePaths = files.map(file => file.filename);

        const imageDocuments = imagePaths.map(imagePath => ({
            eventId: id,
            imagePath,
        }));

        const result = await ImageModel.insertMany(imageDocuments);
        res.status(200).json({ success: true, images: result });
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.getEventImages = async (req, res) => {
    const { eventId } = req.params;

    try {
        const images = await ImageModel.find({ eventId });
        res.status(200).json({ success: true, images });
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.updateImageStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedImage = await ImageModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedImage) {
            return res.status(404).json({ success: false, message: "Image not found" });
        }
        res.json({ success: true, message: "Image status updated successfully", updatedImage });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteImage = async (req, res) => {
    const { id } = req.params;

    try {
        const image = await ImageModel.findById(id);
        if (!image) {
            return res.status(404).json({ success: false, message: "Image not found" });
        }

        if (image.imagePath) {
            await deleteFromCloudinary(image.imagePath);
        }

        await ImageModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Image and associated file deleted successfully" });
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).send("Internal Server Error");
    }
};
