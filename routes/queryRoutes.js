const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');

// Routes
router.post('/addQuery', queryController.createQuery);
router.get('/getQuery', queryController.getQuery);
router.get('deleteQuery', queryController.deleteQuery);
router.get('/updateQuery/:id', queryController.updateQuery);


module.exports = router;