const NewsModel = require('../models/newsModel');
const moment = require('moment');

exports.addNews = async (req, res) => {
    const {
        metaTitle, 
        metaKeyword, 
        metaDesc, 
        heading,
        paperName,
        newsDate,
        newsState,
        imageTitle,
        status
    } = req.body;

    if (!heading || !paperName || !newsState || !imageTitle) {
        return res.status(400).json({ success: false, message: "Heading, paper name, news state and image title are required" });
    }

    if (!req.files || !req.files.newsThumb || !req.files.newsImage) {
        return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    const newReport = new NewsModel({
        metaTitle, 
        metaKeyword, 
        metaDesc, 
        heading,
        paperName,
        newsDate,
        newsState,
        imageTitle,
        newsThumb: req.files.newsThumb[0].filename, // Assuming single file per field
        newsImage: req.files.newsImage[0].filename,
        status        
    });

    try {
        const existingNews = await NewsModel.findOne({ heading: heading });
        if (existingNews) {
            return res.json({ success: false, message: "News Name already found" });
        }

        await newReport.save();
        res.json({ success: true, message: "News added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getAllNews = async (req, res) => {
    try {
        const news = await NewsModel.find({});
        const formattedNews = news.map(newsItem => ({
            ...newsItem.toObject(),
            newsDate: moment(newsItem.newsDate).format('DD MMMM, YYYY')
        }));
        res.json(formattedNews);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.getNewsById = async (req, res) => {
    const newsId = req.params.id;

    try {
        const news = await NewsModel.findById(newsId);
        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
        res.json(news);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateNews = async (req, res) => {
    const newsId = req.params.id;
    const updateData = req.body;

    // if (!req.files || !req.files.newsThumb || !req.files.newsImage) {
    //     return res.status(400).json({ success: false, message: 'No files uploaded' });
    // }

    try {
        const updatedNews = await NewsModel.findByIdAndUpdate(newsId, updateData, { new: true });
        if (!updatedNews) {
            return res.status(404).json({ success: false, message: "News not found" });
        }
        res.json({ success: true, message: "News updated successfully", updatedNews });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.updateNewsStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedNews = await NewsModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedNews) {
            return res.status(404).json({ success: false, message: "News not found" });
        }
        res.json({ success: true, message: "News status updated successfully", updatedNews });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteNews = async (req, res) => {
    const { id } = req.params;

    try {
        const news = await NewsModel.findById(id);
        if (!news) {
            return res.status(404).json({ success: false, message: "News not found" });
        }

        if (news.newsThumb || news.newsImage) {
            const thumbPath = path.join(__dirname, '..', 'uploads', 'news', news.newsThumb);
            const imagePath = path.join(__dirname, '..', 'uploads', 'news', news.newsImage);

            if (fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        const deletedNews = await NewsModel.findByIdAndDelete(id);
        if (!deletedNews) {
            return res.status(404).json({ success: false, message: "News not found" });
        }

        res.json({ success: true, message: "News and associated image deleted successfully", deletedNews });
    } catch (err) {
        console.error("Delete Error:", err);
        res.status(500).send("Internal Server Error");
    }
};
