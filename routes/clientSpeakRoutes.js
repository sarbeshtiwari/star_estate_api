const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientSpeakController');

router.post('/addClientWords', clientController.createClientWords);
router.get('/getClientWords', clientController.getClientWords);
router.get('/getClientWordsById/:id', clientController.getClientWordsById);
// router.get('/getClientWordsBySlugURL/:slugURL', clientController.getClientWordsBySlugURL);
router.put('/updateClientWords/:id', clientController.updateClientWords);
router.put('/updateClientWordstatus/:id', clientController.updateClientWordstatus);
router.delete('/deleteClientWords/:id', clientController.deleteClientWords);

module.exports = router;
