const AmenityModel = require('../models/amenitiesModel');
const moment = require('moment');

exports.addAmenity = async (req, res) => {
    const { category, added_on, status } = req.body;

    if (!category) {
        return res.status(400).json({ success: false, message: "Category is required" });
    }

    const newAmenity = new AmenityModel({ category, added_on, status });

    try {
        const existingAmenity = await AmenityModel.findOne({ category });
        if (existingAmenity) {
            return res.json({ success: false, message: "Category already found" });
        }

        await newAmenity.save();
        res.json({ success: true, message: "Category added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getAllAmenities = async (req, res) => {
    try {
        const amenities = await AmenityModel.find({});
        const formattedAmenities = amenities.map(amenity => ({
            ...amenity.toObject(),
            added_on: moment(amenity.added_on).format('DD MMMM, YYYY')
        }));
        res.json(formattedAmenities);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getAmenityById = async (req, res) => {
    const { id } = req.params;

    try {
        const amenity = await AmenityModel.findById(id);
        if (!amenity) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(amenity);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateAmenityStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedAmenity = await AmenityModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedAmenity) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        res.json({ success: true, message: "Category status updated successfully", updatedAmenity });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteAmenity = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAmenity = await AmenityModel.findByIdAndDelete(id);
        if (!deletedAmenity) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        res.json({ success: true, message: "Category deleted successfully", deletedAmenity });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateAmenity = async (req, res) => {
    const { id } = req.params;
    const { category } = req.body;

    if (!category) {
        return res.status(400).json({ success: false, message: "Category is required" });
    }

    try {
        const updatedAmenity = await AmenityModel.findByIdAndUpdate(id, { category }, { new: true });
        if (!updatedAmenity) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        res.json({ success: true, message: "Category updated successfully", updatedAmenity });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};
