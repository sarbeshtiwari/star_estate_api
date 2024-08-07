const express = require('express');
const router = express.Router();
const subAmenityController = require('../controllers/subamenitiesController');
const upload = require('../middlewares/amenities_uploadMiddlewares');

// Routes for sub-amenities
router.post('/addSubAmenities', upload.array('image', 10), subAmenityController.addSubAmenity);
router.get('/getAmenitiyDataByCategory/:category', subAmenityController.getSubAmenityByCategory);
router.get('/getSubAmenityByID/:id', subAmenityController.getSubAmenityById);
router.get('/getAllTheAmenities', subAmenityController.getAllSubAmenities);
router.put('/updateSubAmenitiyCategoryStatus/:id', subAmenityController.updateSubAmenityStatus);
router.delete('/deleteSubAmenitiyCategory/:id', subAmenityController.deleteSubAmenity);
router.put('/updateSubAmenities/:id', upload.array('image', 10), subAmenityController.updateSubAmenity);

module.exports = router;
