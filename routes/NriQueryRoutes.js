const express = require('express');
const router = express.Router();
const NRIQueryController = require('../controllers/NriQueryController');

// Routes
router.post('/addNRIQuery', NRIQueryController.createNRIQuery);
router.get('/getNRIQuery', NRIQueryController.getNRIQuery);
router.delete('/deleteNRIQuery/:id', NRIQueryController.deleteNRIQuery);
router.put('/updateNRIQuery/:id', NRIQueryController.updateNRIQuery);


module.exports = router;