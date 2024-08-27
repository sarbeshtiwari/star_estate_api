const SubAmenityModel = require('../models/subAmenitiesModel');

exports.addSubAmenity = async (req, res) => {
    try {
        const amenitiesArray = JSON.parse(req.body.data);

        if (!Array.isArray(amenitiesArray)) {
            return res.status(400).json({ success: false, message: "Request body must be an array of Amenities" });
        }

        amenitiesArray.forEach((amenity, index) => {
            if (req.files[index]) {
                amenity.image = req.files[index].filename;
            }
        });

        await SubAmenityModel.insertMany(amenitiesArray);
        res.json({ success: true, message: "Data added successfully" });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.getSubAmenityByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const data = await SubAmenityModel.find({ category });
        if (data.length === 0) {
            return res.status(404).json({ success: false, message: 'No data found for the specified category' });
        }
        res.json({ success: true, data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.getSubAmenityById = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await SubAmenityModel.findById(id);
        if (!data) {
            return res.status(404).json({ error: "Not Found" });
        }
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.getAllSubAmenities = async (req, res) => {
    try {
        const subAmenities = await SubAmenityModel.find({});
        res.json(subAmenities);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateSubAmenityStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedSubAmenity = await SubAmenityModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedSubAmenity) {
            return res.status(404).json({ success: false, message: "Sub-amenity not found" });
        }
        res.json({ success: true, message: "Sub-amenity status updated successfully", updatedSubAmenity });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteSubAmenity = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSubAmenity = await SubAmenityModel.findByIdAndDelete(id);
        if (!deletedSubAmenity) {
            return res.status(404).json({ success: false, message: "Sub-amenity not found" });
        }
        res.json({ success: true, message: "Sub-amenity deleted successfully", deletedSubAmenity });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateSubAmenity = async (req, res) => {
    const { id } = req.params;
    const { amenityArray } = req.body;

    if (!Array.isArray(amenityArray)) {
        return res.status(400).json({ success: false, message: "Request body must be an array" });
    }

    try {
        const results = [];
        for (const amenity of amenityArray) {
            const updatedAmenity = await SubAmenityModel.findByIdAndUpdate(amenity._id, amenity, { new: true });
            if (updatedAmenity) results.push(updatedAmenity);
        }
        if (results.length === 0) return res.status(404).json({ success: false, message: "Amenity not found" });
        res.json({ success: true, message: "Amenity updated successfully", updatedAmenity: results });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};




// exports.updateSubAmenity = async (req, res) => {
//     const { id } = req.params;
//     const updates = JSON.parse(req.body.data);

//     try {
//         const existingSubAmenity = await SubAmenityModel.findById(id);
//         if (!existingSubAmenity) {
//             return res.status(404).json({ success: false, message: "Sub-amenity not found" });
//         }

//         // updates.forEach((update, index) => {
//         //     if (req.files[index]) {
//         //         update.image = req.files[index].filename;
//         //     }
//         // });

//         // await SubAmenityModel.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
//         await SubAmenityModel.findByIdAndUpdate(id, updates, { new: true});
//         res.json({ success: true, message: "Data updated successfully" });
//     } catch (err) {
//         console.error('Error:', err);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };
