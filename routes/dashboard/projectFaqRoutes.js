const express = require('express');
const router = express.Router();
const faqController = require('../../controllers/dashboard/projectFaqController');

// Routes
router.post('/addFaqByProject', faqController.addFaqByProject);
router.get('/getFAQByProject/:projectname', faqController.getFAQByProject);
router.get('/fetchFAQbyId/:id', faqController.fetchFAQById);
router.put('/updateFaqStatus/:id', faqController.updateFaqStatus);
router.delete('/deleteFAQ/:id', faqController.deleteFAQ);
router.put('/updateFaq/:id', faqController.updateFaq);

module.exports = router;
