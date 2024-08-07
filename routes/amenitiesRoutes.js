const express = require('express');
const router = express.Router();
const amenityController = require('../controllers/amenitiesController');

// Routes for amenities
router.post('/addAmenitiyCategory', amenityController.addAmenity);
router.get('/getAmenitiyCategories', amenityController.getAllAmenities);
router.get('/getAmenitiyCategoriesByID/:id', amenityController.getAmenityById);
router.put('/updateAmenitiyCategoryStatus/:id', amenityController.updateAmenityStatus);
router.delete('/deleteAmenitiyCategory/:id', amenityController.deleteAmenity);
router.put('/updateAmenitiyCategory/:id', amenityController.updateAmenity);

module.exports = router;
