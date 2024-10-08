const BlogModel = require('../models/blogModel');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const deleteFromCloudinery = require('../middlewares/delete_cloudinery_image');


const createSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

// Create and Save a New Blog
exports.createBlog = async (req, res) => {
    const {
        metaTitle,
        metaKeyword,
        metaDescription,
        blogsName,
        blogsBy,
        blogsDate,
        blogsCategory,
        blogsLink,
        imageTitle,
        content,
        status
    } = req.body;

    if (!blogsName || !blogsBy || !blogsCategory || !req.file) {
        return res.status(400).json({ success: false, message: "Blog name, blog by, blog category, and blog image are required" });
    }

    try {
        const existingBlog = await BlogModel.findOne({ blogsName });
        if (existingBlog) {
            return res.status(400).json({ success: false, message: "Blog Name already exists" });
        }

        const slugURL = createSlug(blogsName);

        const newBlog = new BlogModel({
            metaTitle,
            metaKeyword,
            metaDescription,
            blogsName,
            blogsBy,
            blogsDate,
            blogsCategory,
            blogsLink,
            blogsImage: `star_estate/blogs/${req.file.filename}`,
            imageTitle,
            content,
            slugURL,
            status
        });

        await newBlog.save();
        res.json({ success: true, message: "Blog added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch all blogs
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find({}).sort({ blogsDate: -1 }); // Sort by blogsDate in descending order
        const formattedBlogs = blogs.map(blog => ({
            ...blog.toObject(),
            blogsDate: blog.blogsDate ? moment(blog.blogsDate).format('DD MMMM, YYYY') : null
        }));
        res.json(formattedBlogs);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};


// Get a blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getBlogBySlugURL = async (req, res) => {
    try {
        // Find the blog post by slugURL
        const blog = await BlogModel.findOne({ slugURL: req.params.slugURL });
        
        if (!blog) {
            // If no blog post is found, return a 404 status
            return res.status(404).json({ message: "Blog not found" });
        }
        
        // Return the found blog post
        res.json(blog);
    } catch (err) {
        // Log the error and return a 500 status
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};



// Update a blog by ID
exports.updateBlog = async (req, res) => {
    const updateData = req.body;
    if (req.file) {
        updateData.blogsImage = `star_estate/blogs/${req.file.filename}`;
    }

    try {
        const updatedBlog = await BlogModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.json({ success: true, message: "Blog updated successfully", updatedBlog });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Update status of a blog
exports.updateBlogStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedBlog = await BlogModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.json({ success: true, message: "Blog status updated successfully", updatedBlog });
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

// Delete a blog
exports.deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await BlogModel.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        if (blog.blogsImage) {
            await deleteFromCloudinery(blog.blogsImage);
        }

        await BlogModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Blog and associated image deleted successfully" });
    } catch (err) {
        console.error("Delete Error:", err);
        if (err instanceof mongoose.Error) {
            const { errors } = err;
            const formattedErrors = Object.values(errors).map(error => error.message);
            return res.status(400).json({ success: false, message: formattedErrors });
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
};
