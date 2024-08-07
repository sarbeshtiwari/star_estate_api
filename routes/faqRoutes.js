const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

router.post('/addFaqByCity', faqController.addFaqByCity);
router.get('/getFAQByCityAndType/:city/:faqType', faqController.getFAQByCityAndType);
router.get('/fetchFAQbyId/:id', faqController.fetchFAQById);
router.put('/updateFaqStatus/:id', faqController.updateFaqStatus);
router.delete('/deleteFAQ/:id', faqController.deleteFAQ);
router.put('/updateFaq/:id', faqController.updateFaqDetails);

module.exports = router;
