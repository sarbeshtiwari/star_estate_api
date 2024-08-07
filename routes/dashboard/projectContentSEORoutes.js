const express = require('express');
const router = express.Router();
const contentSEOController = require('../../controllers/dashboard/projectContentSEOController');

// Routes
router.post('/addContentSEO', contentSEOController.addContentSEO);
router.get('/getContentSEO/:id', contentSEOController.getContentSEOByProjectName);
router.get('/fetchContentSEObyId/:id', contentSEOController.fetchContentSEObyId);
router.put('/updateContentSEOStatus/:id', contentSEOController.updateContentSEOStatus);
router.delete('/deleteContentSEO/:id', contentSEOController.deleteContentSEO);
router.put('/updateContentSEO/:id', contentSEOController.updateContentSEO);

module.exports = router;
