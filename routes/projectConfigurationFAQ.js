const express = require('express');
const router = express.Router();
const faqController = require('../controllers/projectConfigurationFAQ');

router.post('/addFaqByPropertyType', faqController.addFaqByPropertyType);
router.get('/getFAQByCityAndType/:propertyType/:faqType', faqController.getFAQByPropertyTypeAndType);
router.get('/fetchFAQbyId/:id', faqController.fetchFAQById);
router.put('/updateFaqStatus/:id', faqController.updateFaqStatus);
router.delete('/deleteFAQ/:id', faqController.deleteFAQ);
router.put('/updateFaq/:id', faqController.updateFaqDetails);

module.exports = router;
