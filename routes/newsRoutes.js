const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const upload = require('../middlewares/news_uploadMiddlewares');

// Routes
router.post('/addNews', upload.fields([
    { name: 'newsThumb', maxCount: 1 },
    { name: 'newsImage', maxCount: 1 }
]), newsController.addNews);

router.get('/getNews', newsController.getAllNews);

router.get('/getNewsById/:id', newsController.getNewsById);

router.get('/getNewsByslugURL/:slugURL', newsController.getNewsBySlugURL);

router.put('/updateNews/:id', upload.fields([
    { name: 'newsThumb', maxCount: 1 },
    { name: 'newsImage', maxCount: 1 }
]), newsController.updateNews);

router.put('/updateNewsStatus/:id', newsController.updateNewsStatus);

router.delete('/deleteNews/:id', newsController.deleteNews);

module.exports = router;
