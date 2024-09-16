const express = require('express');
const router = express.Router();
const channelPartnerController = require('../controllers/channelPartnerController');

// Routes
router.post('/addChannelPartner', channelPartnerController.createChannelPartner);
router.get('/getChannelPartner', channelPartnerController.getChannelPartner);
router.delete('/deleteChannelPartner/:id', channelPartnerController.deleteChannelPartner);
// router.put('/updateChannelPartner/:id', channelPartnerController.updateChannelPartner);


module.exports = router;