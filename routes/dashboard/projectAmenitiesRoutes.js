const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/dashboard/projectAmenitiesController');

// Route to handle POST request for project amenities
router.post('/projectAmenities/:id', projectController.postProjectAmenities);

// Route to get project amenities
router.get('/getprojectAmenities/:projectname', projectController.getProjectAmenities);

module.exports = router;
