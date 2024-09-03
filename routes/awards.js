const express = require('express');
const router = express.Router();
const awardController = require('../controllers/awardsController');
const upload = require('../middlewares/awards_middlewares');

router.post('/addAwards', upload.single('awardImage'), awardController.createAwards);
router.get('/getAwards', awardController.getAwards);
router.get('/getAwardsById/:id', awardController.getAwardsById);
// router.get('/getawardsBySlugURL/:slugURL', awardController.getawardsBySlugURL);
router.put('/updateAwards/:id', upload.single('awardImage'), awardController.updateAwards);
router.put('/updateAwardstatus/:id', awardController.updateAwardstatus);
router.delete('/deleteAwards/:id', awardController.deleteAwards);

module.exports = router;
