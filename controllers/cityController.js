const City = require('../models/cityModel');


const createSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  exports.addCity = async (req, res) => {
    const { location, state, priority, status, data } = req.body;
    const file = req.file;

    try {
        const parsedData = JSON.parse(data);

        if (!location || !state || !Array.isArray(parsedData)) {
            return res.status(400).json({ success: false, message: "Location, State, and data are required and data should be an array" });
        }

        const slugURL = createSlug(location);

        const imagePath = file ? file.path : null;

        const updatedData = parsedData.map(item => ({
            ...item,
            image: imagePath || item.image
        }));

        const newCity = new City({
            location,
            slugURL,
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
        const cities = await City.find({},
            {
                location: 1,
                slugURL: 1,
                state: 1,
                priority: 1,
                status: 1
            }
        );
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
            slugURL: location,
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
        if (deletedCity.data.image) {
            
            await deleteFromCloudinary(deletedCity.data.image);
           
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
        // Parse and validate data
        parsedData = JSON.parse(data);
        if (!Array.isArray(parsedData)) {
            return res.status(400).json({ success: false, message: "Data must be an array" });
        }

         const existingCity = await City.findOne({ slugURL: cityId });

        if (!existingCity) {
            return res.status(404).json({ success: false, message: "City not found" });
        }
        existingCity.priority = priority || existingCity.priority;

        // Prepare updated data
        const imagePath = file ? file.path : null;
       
        // const updatedData = parsedData.map(item => ({
        //     ...item,
        //     image: imagePath || item.image
        // }));
       

        // Update or add new data
        const updatedDataMap = new Map(parsedData.map(item => [item.location_type, item]));

        existingCity.data = existingCity.data.map(item =>
            updatedDataMap.has(item.location_type)
                ? { ...item, ...updatedDataMap.get(item.location_type),
                  image: imagePath || item.image
                  }
                : item
        );

        // Add new data that was not previously present
        existingCity.data.push(...parsedData.filter(item => !existingCity.data.some(existingItem => existingItem.location_type === item.location_type))
                              .map(item => ({
                                  ...item,
                                  image: imagePath || item.image
                              }))
                              );

        // Save the city
        await existingCity.save();
        res.json({ success: true, message: "City updated successfully" });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getCityBySlugURL = async (req, res) => {
    try {
        const city = await City.findOne({ slugURL: req.params.slugURL });
        if (!city) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.json(city);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getCityImage = async (req, res) => {
    try {
        // Query to find all cities with location_type as 'common'
        const cities = await City.find(
            {
                'data.location_type': 'common' // Filtering for 'common' location_type
            },
            
        );

        // If no cities are found, return 404
        if (!cities.length) {
            return res.status(404).json({ error: 'No cities or types found' });
        }

        // Extract image for each city
        const citiesWithImages = cities.map(city => {
            // Attempt to find the data entry with 'location_type' as 'common'
            const commonData = city.data.find(d => d.location_type === 'common');

            return {
                location: city.location,
                slugURL: city.slugURL,
                state: city.state,
                priority: city.priority,
                status: city.status,
                image: commonData ? commonData.image || null : null // Safely retrieve the image or return null if not found
            };
        });

        // Respond with the cities and their images
        res.json(citiesWithImages);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};




// exports.updateCity = async (req, res) => {
//     const { cityId, location_type } = req.params;
//     const { location, state, priority, status, data } = req.body;
//     const file = req.file;

//     let parsedData;

//     try {
//         console.log('tried');
//         parsedData = JSON.parse(data);

//         if (!Array.isArray(parsedData)) {
//             return res.status(400).json({ success: false, message: "Data must be an array" });
//         }

//         const imagePath = file ? file.path : null;
//         const updatedData = parsedData.map(item => ({
//             ...item,
//             image: imagePath || item.image
//         }));
//         console.log(updatedData);

//         const existingCity = await City.findOne({ location: cityId });

//         if (!existingCity) {
//             return res.status(404).json({ success: false, message: "City not found" });
//         }

//         const existingTypeIndex = existingCity.data.findIndex(item => item.location_type === location_type);
//         console.log(existingTypeIndex);

//         if (existingTypeIndex !== -1) {
//             const newData = updatedData.find(item => item.location_type === location_type);
//             console.log(newData)
//             if (newData) {
//                 console.log('newData')
//                 existingCity.data[existingTypeIndex] = { ...existingCity.data[existingTypeIndex], ...newData };
//             }
//         } else {
//             console.log('ExistingData')
//             existingCity.data.push(...updatedData);
//         }

//         await existingCity.save();
//         res.json({ success: true, message: "City updated successfully" });
//     } catch (err) {
//         console.error('Error:', err);
//         res.status(500).send("Internal Server Error");
//     }
// };


exports.getCityByState = async (req, res) => {
    const { state } = req.params;

    try {
        const city = await City.find({
            state: state,
        });

        if (!city.length) {
            return res.status(404).json({ error: 'City not found' });
        }

        res.json(city);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};
