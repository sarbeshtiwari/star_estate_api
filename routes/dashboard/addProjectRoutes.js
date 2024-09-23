const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/dashboard/addProjectController');
const upload = require('../../middlewares/addProject_multerMiddlewares');
const Project = require('../../models/dashboard/addProjectModel');
const ProjectConfiguration = require('../../models/projectConfigurationModel');

// Routes
// router.post('/addProject', upload.single('project_logo'), projectController.addProject);
router.post('/addProject', upload.fields([
    { name: 'project_logo', maxCount: 1 },
    { name: 'project_thumbnail', maxCount: 1 },
    { name : 'rera_qr', maxCount: 1},
    {name: 'locationMap', maxCount: 1}
]),projectController.addProject)
router.get('/getProject', projectController.getProjects);

router.get('/getProjectById/:id', projectController.getProjectById);
router.put('/updateProject/:id', upload.fields([
    { name: 'project_logo', maxCount: 1 },
    { name: 'project_thumbnail', maxCount: 1 },
    { name : 'rera_qr', maxCount: 1},
    {name: 'locationMap', maxCount: 1}
]), projectController.updateProject);

router.get('/getProjectByType/:property_type', projectController.getProjectByType);
router.put('/updateProjectStatus/:id', projectController.updateProjectStatus);
router.delete('/deleteProject/:id', projectController.deleteProject);
router.put('/updateShowSimilarProperties/:id', projectController.updateShowSimilarProp);
router.put('/updateProjectStatusCategory/:id', projectController.updateProjectStatusCategory);

router.get('/getProjectByLocation/:cityLocation', projectController.getProjectByCity);
router.get('/getLuxuryProject', projectController.getLuxuryProject);
router.get('/getNewProject', projectController.getNewProject);

router.get('/getProjectBySlug/:slugURL', projectController.getProjectBySlug);
router.get('/getProjectByDeveloper/:slugURL', projectController.getProjectByDeveloper);

// Fetch projects based on propertyType, propertyLocation, and price bracket
router.get('/projects', async (req, res) => {
    try {
        const { propertyType, propertyLocation, minPrice, maxPrice } = req.query;
        console.log(propertyType);
        console.log(propertyLocation);

        let query = {};

        // Property Type Filter
        if (propertyType) {
            query.property_type = propertyType;
        }

        // Property Location Filter
        if (propertyLocation) {
            query.cityLocation = propertyLocation;
        }

        // Fetch all projects based on property type and location filters
        let projects = await Project.find(query);

        // Helper function to convert price strings (like "2.97 Cr") into numbers
        const parsePrice = (priceStr) => {
            if (!priceStr) return 0;

            // Remove "Cr" or "Lakh" and convert to numbers
            const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));  // Extract the numeric value

            if (priceStr.includes('Cr')) {
                return num * 10000000;  // Convert Cr to actual value (1 Cr = 10 million)
            } else if (priceStr.includes('Lakh')) {
                return num * 100000;  // Convert Lakh to actual value (1 Lakh = 100,000)
            }
            return num;  // Return as is if no suffix
        };

        // Apply Dynamic Price Range Filter
        if (minPrice || maxPrice) {
            projects = projects.filter(project => {
                const parsedPrice = parsePrice(project.projectPrice);

                // If only minPrice is passed, show data with prices greater than or equal to minPrice
                if (minPrice && !maxPrice && parsedPrice < Number(minPrice)) {
                    return false;  // Filter out if price is less than minPrice
                }

                // If only maxPrice is passed, show data with prices less than or equal to maxPrice
                if (maxPrice && !minPrice && parsedPrice > Number(maxPrice)) {
                    return false;  // Filter out if price is greater than maxPrice
                }

                // If both minPrice and maxPrice are passed, filter for the range
                if (minPrice && maxPrice && (parsedPrice < Number(minPrice) || parsedPrice > Number(maxPrice))) {
                    return false;  // Filter out if price is outside the range
                }

                return true;  // Pass the filter
            });
        }

        // Check if any projects were found after filtering
        if (projects.length === 0) {
            return res.status(404).json({ success: false, message: "No projects found for the specified filters" });
        }

        res.json({ success: true, projects });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

//sitemap

router.get('/projectsConfig/:slug', async (req, res) => {
    try {
        const { slug } = req.params;

        // Extract configuration and cityLocation using regex
        const regex = /(\d+)-bhk.*-in-(.*)/i;
        const match = slug.match(regex);

        if (!match) {
            return res.status(400).json({ success: false, message: 'Invalid slug format' });
        }

        const projectConfiguration = match[1]; // Extract the configuration number (e.g., 2 from 2-bhk)
        const cityLocation = match[2]; // Extract the city name (e.g., mumbai)

        // Call the getProjectConfigurationBySlugURL function
        const cityData = await getProjectConfiguration(cityLocation, slug);

        // If no configuration data is found, return empty cityData
        const validCityData = cityData && cityData.length > 0 ? cityData : [];

        // Search for projects with matching cityLocation and projectConfiguration
        const projects = await Project.find({
            cityLocation: new RegExp(cityLocation, 'i'), // case-insensitive search
            projectConfiguration: new RegExp(projectConfiguration, 'i') // flexible search
        });

        // If no projects are found, return an empty array
        const validProjects = projects.length > 0 ? projects : [];

        // Respond with success and either empty or found data
        res.status(200).json({ success: true, cityData: validCityData, projects: validProjects });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

const getProjectConfiguration = async (cityLocation, slugURL) => {
    try {
        console.log(cityLocation, slugURL);
        const projectConfiguration = await ProjectConfiguration.find({
            location: cityLocation,
            slugURL: slugURL
        });

        // If no configuration is found or the status is false, return empty data
        if (!projectConfiguration.length || projectConfiguration[0].status === false) {
            return [];
        }

        return projectConfiguration;
    } catch (err) {
        console.error(err);
        throw new Error("Internal Server Error");
    }
};

router.get('/search', async (req, res) => {
    const { searchTerm } = req.query;

    if (!searchTerm) {
        return res.status(400).json({ message: 'Search term is required' });
    }

    try {
        // Using a case-insensitive regex to match the search term in multiple fields
        const regex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive search
        const projects = await Project.find({
            $or: [
                { projectName: regex },
                { slugURL: regex },
                { projectBy: regex },
                { cityLocation: regex },
            ],
        });

        if (projects.length > 0) {
            const results = projects.map(project => {
                const response = {};

                // Check for matches in the fields and populate the response
                if (project.projectName.match(regex)) {
                    response.projectName = {
                        matchedTerm: searchTerm,
                        value: project.projectName,
                    };
                }
                if (project.projectBy.match(regex)) {
                    response.projectBy = {
                        matchedTerm: searchTerm,
                        value: project.projectBy,
                    };
                }
                if (project.cityLocation.match(regex)) {
                    response.cityLocation = {
                        matchedTerm: searchTerm,
                        value: project.cityLocation,
                    };
                }

                // if(project.projectName.match(regex)){
                //     response.projectName = {
                //         matchedTerm: searchTerm,
                //         value: project.projectName
                //     }
                // }

                // Include the project details as necessary
                return {
                    ...response,
                    slugURL: project.slugURL,
                };
            });

            return res.json(results);
        } else {
            return res.json({ message: 'Data not found' });
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});




module.exports = router;