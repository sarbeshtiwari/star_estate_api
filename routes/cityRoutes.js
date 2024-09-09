const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');
const { uploadCity } = require('../middlewares/city_subCity_multerMiddlewares');

// Define your routes here
router.post('/addCity', uploadCity.single('image'), cityController.addCity);
router.get('/getCities', cityController.getCities);
router.get('/getCityByCityAndProjectType/:location/:location_type', cityController.getCityByCityAndProjectType);
router.get('/getCitybyId/:id', cityController.getCityByID);
router.get('/getCityBySlugURL/:slugURL', cityController.getCityBySlugURL);
router.put('/updateCityStatus/:id', cityController.updateCityStatus);
router.delete('/deleteCity/:id', cityController.deleteCity);
router.put('/updateCity/:cityId/:location_type', uploadCity.single('image'), cityController.updateCity);

router.get('/getCityByState/:state', cityController.getCityByState);

module.exports = router;
