const express = require('express');
const router = express.Router();
const subCityController = require('../controllers/subCityController');
const { uploadSubCity } = require('../middlewares/city_subCity_multerMiddlewares');

// Define your routes here
router.post('/addSubCity', uploadSubCity.single('image'), subCityController.addSubCity);
router.get('/getSubCities', subCityController.getSubCities);
router.get('/getSubCityByID/:city/:content_type', subCityController.getSubCityByCityAndType);
router.get('/getSubCityByCity/:id', subCityController.getSubCityByID);
router.put('/updateSubCityStatus/:id', subCityController.updateSubCityStatus);
router.delete('/deleteSubCity/:id', subCityController.deleteSubCity);
router.put('/updateSubCity/:subCityId/:content_type', uploadSubCity.single('image'), subCityController.updateSubCity);

module.exports = router;
