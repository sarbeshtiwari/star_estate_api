// routes/bankRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/bankList_uploadMiddlewares');
const bankController = require('../controllers/bankListController');

// Add new bank list
router.post('/addBankList', upload.array('image', 10), bankController.addBankList);

// Fetch all bank lists
router.get('/getBankList', bankController.getBankList);

// Fetch a bank list by ID
router.get('/getBankListByID/:id', bankController.getBankListByID);

// Update bank list status
router.put('/updateBankListStatus/:id', bankController.updateBankListStatus);

// Delete a bank list entry
router.delete('/deleteBankList/:id', bankController.deleteBankList);

// Update bank list entry
router.put('/updateBankList/:id', upload.array('image', 10), bankController.updateBankList);

module.exports = router;
