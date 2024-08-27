const SubCity = require('../models/subCityModel');

exports.addSubCity = async (req, res) => {
    const { city, sub_city, priority, status, data } = req.body;
    const file = req.file;

    console.log(req.body);
    console.log(req.file);

    const parsedData = JSON.parse(data);

    if (!city || !sub_city || !Array.isArray(parsedData)) {
        return res.status(400).json({ success: false, message: "City, Sub City, and data are required" });
    }

    try {
        const imagePath = file ? file.path : null;

        const updatedData = parsedData.map(item => ({
            ...item,
            image: imagePath || item.image
        }));

        const newSubCity = new SubCity({
            city,
            sub_city,
            priority,
            status,
            data: updatedData
        });

        await newSubCity.save();
        res.json({ success: true, message: "Sub City added successfully" });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getSubCities = async (req, res) => {
    try {
        const subCities = await SubCity.find({});
        res.json(subCities);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getSubCityByCityAndType = async (req, res) => {
    const { city, content_type } = req.params;

    try {
        const subCity = await SubCity.find({
            city: city,
            'data.content_type': content_type
        });

        if (!subCity.length) {
            return res.status(404).json({ error: 'Sub City or type not found' });
        }

        res.json(subCity);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getSubCityByID = async (req, res) => {
    const { id } = req.params;

    try {
        const subCity = await SubCity.find({city: id}).then(sub_cities => {
            if (sub_cities.length === 0) {
                return res.status(404).json({ success: false, error: 'No sub cities found for this city ID' });
            }
            res.json(sub_cities);
        })
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateSubCityStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedSubCity = await SubCity.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedSubCity) {
            return res.status(404).json({ success: false, message: "Sub City not found" });
        }

        res.json({ success: true, message: "Sub City status updated successfully", updatedSubCity });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteSubCity = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSubCity = await SubCity.findByIdAndDelete(id);

        if (!deletedSubCity) {
            return res.status(404).json({ success: false, message: "Sub City not found" });
        }

        res.json({ success: true, message: "Sub City deleted successfully", deletedSubCity });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateSubCity = async (req, res) => {
    const { subCityId, content_type } = req.params;
    const { city, sub_city, priority, status, data } = req.body;
    const file = req.file;

    let parsedData;

    try {
        parsedData = JSON.parse(data);

        if (!Array.isArray(parsedData)) {
            return res.status(400).json({ success: false, message: "Data must be an array" });
        }

        const imagePath = file ? file.path : null;
        const updatedData = parsedData.map(item => ({
            ...item,
            image: imagePath || item.image
        }));

        const existingSubCity = await SubCity.findOne({ sub_city: subCityId });

        if (!existingSubCity) {
            return res.status(404).json({ success: false, message: "Sub City not found" });
        }

        const existingTypeIndex = existingSubCity.data.findIndex(item => item.content_type === content_type);

        if (existingTypeIndex !== -1) {
            const newData = updatedData.find(item => item.content_type === content_type);
            if (newData) {
                existingSubCity.data[existingTypeIndex] = { ...existingSubCity.data[existingTypeIndex], ...newData };
            }
        } else {
            existingSubCity.data.push(...updatedData);
        }

        await existingSubCity.save();
        res.json({ success: true, message: "Sub City updated successfully" });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send("Internal Server Error");
    }
};
