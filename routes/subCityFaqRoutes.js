const express = require('express');
const router = express.Router();
const subCityFaqController = require('../controllers/subCityFaqController');

router.post('/addSubCityFaqByCity', subCityFaqController.addSubCityFaqByCity);
router.get('/getSubCityFAQByCityAndType/:sub_city/:faqType', subCityFaqController.getSubCityFAQByCityAndType);
router.get('/fetchSubCityFAQbyId/:id', subCityFaqController.fetchSubCityFAQById);
router.put('/updateSubCityFaqStatus/:id', subCityFaqController.updateSubCityFaqStatus);
router.delete('/deleteSubCityFAQ/:id', subCityFaqController.deleteSubCityFAQ);
router.put('/updateSubCityFaq/:id', subCityFaqController.updateSubCityFaqDetails);

module.exports = router;
