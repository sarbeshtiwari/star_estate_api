const express = require('express');
const router = express.Router();
const contactUSController = require('../controllers/contactUSController');

// Routes
router.post('/addContactUS', contactUSController.createContactUS);
router.get('/getContactUS', contactUSController.getContactUS);
router.get('/deleteContactUS', contactUSController.deleteContactUS);
router.get('/updateContactUS/:id', contactUSController.updateContactUS);


module.exports = router;