const express = require('express');
const router = express.Router();
const upload = require('../middlewares/blog_uploadMiddlewares');
const blogController = require('../controllers/blogController');

router.post('/addBlogs', upload.single('blogsImage'), blogController.createBlog);
router.get('/getBlog', blogController.getBlogs);
router.get('/getBlogById/:id', blogController.getBlogById);
router.get('/getBlogBySlugURL/:slugURL', blogController.getBlogBySlugURL);
router.put('/updateBlog/:id', upload.single('blogsImage'), blogController.updateBlog);
router.put('/updateBlogStatus/:id', blogController.updateBlogStatus);
router.delete('/deleteBlog/:id', blogController.deleteBlog);

module.exports = router;
