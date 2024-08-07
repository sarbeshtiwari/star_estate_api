const express = require('express');
const router = express.Router();
const quickDetailsController = require('../../controllers/dashboard/quickDetailsController');

// Add Quick Details
router.post('/AddQuickDetailsByProjectName', quickDetailsController.addQuickDetailsByProjectName);

// Fetch all details by projectName
router.get('/getQuickDetailsByProjectName/:id', quickDetailsController.getQuickDetailsByProjectName);

// Fetch detail by ID
router.get('/fetchDetailbyId/:id', quickDetailsController.fetchDetailById);

// Update status of a detail
router.put('/updateDetailStatus/:id', quickDetailsController.updateDetailStatus);

// Delete a detail
router.delete('/deleteDetail/:id', quickDetailsController.deleteDetail);

// Update detail details
router.put('/updateDetail/:id', quickDetailsController.updateDetail);

module.exports = router;
