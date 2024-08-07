const UserModel = require('../models/categoryModel');

// Add a category
const addCategory = async (req, res) => {
    const { metaTitle, metaKeyword, metaDescription, category, content, status } = req.body;

    if (!category) {
        return res.status(400).json({ success: false, message: "Category is required" });
    }

    try {
        const match = await UserModel.findOne({ category: category });

        if (match) {
            return res.json({ success: false, message: "Category already found" });
        }

        const newCategory = new UserModel({ metaTitle, metaKeyword, metaDescription, category, content, status });
        await newCategory.save();
        res.json({ success: true, message: "Category added successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch all categories
const getCategories = async (req, res) => {
    try {
        const categories = await UserModel.find({});
        res.json(categories);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch a category by ID
const getCategoryByID = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await UserModel.findById(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Update status of a category
const updateCategoryStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedCategory = await UserModel.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        res.json({ success: true, message: "Category status updated successfully", updatedCategory });
    } catch (err) {
        console.error(err);
        if (err instanceof mongoose.Error) {
            const { errors } = err;
            const formattedErrors = Object.values(errors).map(error => error.message);
            return res.status(400).json({ success: false, message: formattedErrors });
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCategory = await UserModel.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        res.json({ success: true, message: "Category deleted successfully", deletedCategory });
    } catch (err) {
        console.error(err);
        if (err instanceof mongoose.Error) {
            const { errors } = err;
            const formattedErrors = Object.values(errors).map(error => error.message);
            return res.status(400).json({ success: false, message: formattedErrors });
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
};

// Update category details
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { metaTitle, metaKeyword, metaDescription, category, content } = req.body;

    if (!category) {
        return res.status(400).json({ success: false, message: "Category is required" });
    }

    try {
        const updatedCategory = await UserModel.findByIdAndUpdate(id, { metaTitle, metaKeyword, metaDescription, category, content }, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        res.json({ success: true, message: "Category updated successfully", updatedCategory });
    } catch (err) {
        console.error(err);
        if (err instanceof mongoose.Error) {
            const { errors } = err;
            const formattedErrors = Object.values(errors).map(error => error.message);
            return res.status(400).json({ success: false, message: formattedErrors });
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
};

module.exports = {
    addCategory,
    getCategories,
    getCategoryByID,
    updateCategoryStatus,
    deleteCategory,
    updateCategory
};
