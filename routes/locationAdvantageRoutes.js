const express = require('express');
const router = express.Router();
const locationAdvantageController = require('../controllers/locationAdvantagesController');
const upload = require('../middlewares/locationAdvantages_Middlewares');

// Define routes
router.post('/addLocationAdvantages', upload.array('image', 10), locationAdvantageController.addLocationAdvantages);
router.get('/getLocationAdvantages', locationAdvantageController.getAllLocationAdvantages);
router.get('/getLocationAdvantagesByID/:id', locationAdvantageController.getLocationAdvantageById);
router.put('/updateLocationAdvantagesStatus/:id', locationAdvantageController.updateLocationAdvantageStatus);
router.delete('/deleteLocationAdvantages/:id', locationAdvantageController.deleteLocationAdvantage);
router.put('/updateLocationAdvantages/:id', upload.array('image', 10), locationAdvantageController.updateLocationAdvantage);

module.exports = router;
