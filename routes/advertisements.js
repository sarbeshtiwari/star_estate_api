const express = require('express');
const router = express.Router();
const advertisementController = require('../controllers/advertisementController');
const upload = require('../middlewares/advertisements_uploadMiddlewares');

router.post('/addAdvertisements', upload.single('advertisementImage'), advertisementController.createAdvertisements);
router.get('/getAdvertisements', advertisementController.getAdvertisements);
router.get('/getAdvertisementsById/:id', advertisementController.getAdvertisementsById);
// router.get('/getAdvertisementsBySlugURL/:slugURL', advertisementController.getAdvertisementsBySlugURL);
router.put('/updateAdvertisements/:id', upload.single('advertisementImage'), advertisementController.updateAdvertisements);
router.put('/updateAdvertisementstatus/:id', advertisementController.updateAdvertisementstatus);
router.delete('/deleteAdvertisements/:id', advertisementController.deleteAdvertisements);

module.exports = router;
