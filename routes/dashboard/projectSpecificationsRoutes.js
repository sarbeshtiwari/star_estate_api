const express = require('express');
const router = express.Router();
const projectSpecificationsController = require('../../controllers/dashboard/projectSpecificationsController');

// Add Project Specifications
router.post('/AddProjectSpecificationsByProjectName', projectSpecificationsController.addProjectSpecificationsByProjectName);

// Fetch all details by projectName
router.get('/getProjectSpecificationsByProjectName/:id', projectSpecificationsController.getProjectSpecificationsByProjectName);

// Fetch detail by ID
router.get('/fetchDetailbyId/:id', projectSpecificationsController.fetchDetailById);

// Update status of a detail
router.put('/updateDetailStatus/:id', projectSpecificationsController.updateDetailStatus);

// Delete a detail
router.delete('/deleteDetail/:id', projectSpecificationsController.deleteDetail);

// Update detail details
router.put('/updateDetail/:id', projectSpecificationsController.updateDetail);

module.exports = router;
