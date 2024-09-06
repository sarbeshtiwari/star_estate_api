const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Define routes and attach corresponding controller functions
router.post('/addCategory', categoryController.addCategory);
router.get('/getCategories', categoryController.getCategories);
router.get('/getCategoriesByID/:id', categoryController.getCategoryByID);
router.put('/updateCategoryStatus/:id', categoryController.updateCategoryStatus);
router.delete('/deleteCategory/:id', categoryController.deleteCategory);
router.put('/updateCategory/:id', categoryController.updateCategory);

router.get('/getCategoryDetails/:category', categoryController.getCategoryByType);

module.exports = router;
