const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/dashboard/addProjectController');
const upload = require('../../middlewares/addProject_multerMiddlewares');
const Project = require('../../models/dashboard/addProjectModel');

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


module.exports = router;
