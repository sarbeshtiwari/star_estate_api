const City = require('../models/cityModel');

exports.addCity = async (req, res) => {
    const { location, state, priority, status, data } = req.body;
    const file = req.file;

    console.log(req.body);
    console.log(req.file);

    const parsedData = JSON.parse(data);

    if (!location || !state || !Array.isArray(parsedData)) {
        return res.status(400).json({ success: false, message: "Location, State, and data are required" });
    }

    try {
        const imagePath = file ? file.path : null;

        const updatedData = parsedData.map(item => ({
            ...item,
            image: imagePath || item.image
        }));

        const newCity = new City({
            location,
            state,
            priority,
            status,
            data: updatedData
        });

        await newCity.save();
        res.json({ success: true, message: "City added successfully" });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getCities = async (req, res) => {
    try {
        const cities = await City.find({});
        res.json(cities);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getCityByCityAndProjectType = async (req, res) => {
    const { location, location_type } = req.params;

    try {
        const city = await City.find({
            location: location,
            'data.location_type': location_type
        });

        if (!city.length) {
            return res.status(404).json({ error: 'City or type not found' });
        }

        res.json(city);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getCityByID = async (req, res) => {
    const { id } = req.params;

    try {
        const city = await City.findById(id);
        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }
        res.json(city);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateCityStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedCity = await City.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedCity) {
            return res.status(404).json({ success: false, message: "City not found" });
        }

        res.json({ success: true, message: "City status updated successfully", updatedCity });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteCity = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCity = await City.findByIdAndDelete(id);

        if (!deletedCity) {
            return res.status(404).json({ success: false, message: "City not found" });
        }

        res.json({ success: true, message: "City deleted successfully", deletedCity });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateCity = async (req, res) => {
    const { cityId, location_type } = req.params;
    const { location, state, priority, status, data } = req.body;
    const file = req.file;

    let parsedData;

    try {
        console.log('tried');
        parsedData = JSON.parse(data);

        if (!Array.isArray(parsedData)) {
            return res.status(400).json({ success: false, message: "Data must be an array" });
        }

        const imagePath = file ? file.path : null;
        const updatedData = parsedData.map(item => ({
            ...item,
            image: imagePath || item.image
        }));
        console.log(updatedData);

        const existingCity = await City.findOne({ location: cityId });

        if (!existingCity) {
            return res.status(404).json({ success: false, message: "City not found" });
        }

        const existingTypeIndex = existingCity.data.findIndex(item => item.location_type === location_type);
        console.log(existingTypeIndex);

        if (existingTypeIndex !== -1) {
            const newData = updatedData.find(item => item.location_type === location_type);
            console.log(newData)
            if (newData) {
                console.log('newData')
                existingCity.data[existingTypeIndex] = { ...existingCity.data[existingTypeIndex], ...newData };
            }
        } else {
            console.log('ExistingData')
            existingCity.data.push(...updatedData);
        }

        await existingCity.save();
        res.json({ success: true, message: "City updated successfully" });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send("Internal Server Error");
    }
};
