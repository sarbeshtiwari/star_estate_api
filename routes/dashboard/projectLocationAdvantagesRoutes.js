const express = require('express');
const router = express.Router();
const locationAdvantagesController = require('../../controllers/dashboard/projectLocationAdvantagesController');

// Route to handle POST request for location advantages
router.post('/projectLocationAdvantages/:id', locationAdvantagesController.postLocationAdvantages);

// Route to get project location advantages
router.get('/getprojectLocationAdvantages/:projectname', locationAdvantagesController.getLocationAdvantages);

module.exports = router;
