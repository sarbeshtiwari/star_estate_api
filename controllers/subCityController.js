const SubCity = require('../models/subCityModel');
const deleteFromCloudinary = require('../middlewares/delete_cloudinery_image');

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
        if (deletedSubCity.data.image) {
            
            await deleteFromCloudinary(deletedSubCity.data.image);
           
        }

        res.json({ success: true, message: "Sub City deleted successfully", deletedSubCity });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};



// exports.updateSubCity = async (req, res) => {
//     const { subCityId, content_type } = req.params;
//     const { city, sub_city, priority, status, data } = req.body;
//     const file = req.file;

//     try {
//         // Parse and validate data
//         const parsedData = JSON.parse(data);
//         if (!Array.isArray(parsedData)) {
//             return res.status(400).json({ success: false, message: "Data must be an array" });
//         }

//         // Prepare updated data
//         const imagePath = file ? file.path : null;
//         const updatedData = parsedData.map(item => ({
//             ...item,
//             image: imagePath || item.image
//         }));

//         // Find the existing sub-city
//         const existingSubCity = await SubCity.findOne({ sub_city: subCityId });

//         if (!existingSubCity) {
//             return res.status(404).json({ success: false, message: "Sub City not found" });
//         }

//         // Create a map from the updated data for quick lookup
//         const updatedDataMap = new Map(updatedData.map(item => [item.content_type, item]));

//         // Update existing data or add new data
//         existingSubCity.data = existingSubCity.data.map(item =>
//             updatedDataMap.has(item.content_type)
//                 ? { ...item, ...updatedDataMap.get(item.content_type) }
//                 : item
//         );

//         // Add new data that was not previously present
//         existingSubCity.data.push(...updatedData.filter(item => !existingSubCity.data.some(existingItem => existingItem.content_type === item.content_type)));

//         // Save the sub-city
//         await existingSubCity.save();
//         res.json({ success: true, message: "Sub City updated successfully" });
//     } catch (err) {
//         console.error('Error:', err);
//         res.status(500).send("Internal Server Error");
//     }
// };


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

        // if (req.file) {
        //     imagePath = req.file.filename;
        // }

        const imagePath = file ? file.path : req.file.filename;
        const updatedData = parsedData.map(item => ({
            ...item,
            image: imagePath || item.image
        }));

        console.log(updatedData);

        const existingSubCity = await SubCity.findOne({ sub_city: sub_city });
        console.log(sub_city);
        console.log(existingSubCity);

        if (!existingSubCity) {
            console.log('not found');
            return res.status(404).json({ success: false, message: "Sub City not found" });
        }

        // const existingTypeIndex = existingSubCity.data.findIndex(item => item.content_type === content_type);
        // console.log(existingTypeIndex)

        // if (existingTypeIndex !== -1) {
        //     const newData = updatedData.find(item => item.content_type === content_type);
        //     if (newData) {
        //         console.log(newData);
        //         existingSubCity.data[existingTypeIndex] = { ...existingSubCity.data[existingTypeIndex], ...newData };
        //     }
        // } else {
        //     console.log('existing')
        //     existingSubCity.data.push(...updatedData);
        // }
         // Update or add new data
        const updatedDataMap = new Map(updatedData.map(item => [item.content_type, item]));

        existingSubCity.data = existingSubCity.data.map(item =>
            updatedDataMap.has(item.content_type)
                ? { ...item, ...updatedDataMap.get(item.content_type) }
                : item
        );

        // Add new data that was not previously present
        existingSubCity.data.push(...updatedData.filter(item => !existingSubCity.data.some(existingItem => existingItem.content_type === item.content_type)));

        // Save the city

        await existingSubCity.save();
        res.json({ success: true, message: "Sub City updated successfully" });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send("Internal Server Error");
    }
};


