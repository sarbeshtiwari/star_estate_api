const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');

// Routes
router.post('/addQuery', queryController.createQuery);
router.get('/getQuery', queryController.getQuery);
router.delete('/deleteQuery/:id', queryController.deleteQuery);
// router.put('/updateQuery/:id', queryController.updateQuery);


module.exports = router;