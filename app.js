const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
const categoryRoutes = require('./routes/categoryRoutes');
const dbConfig = require('./config/db');
const jobRoutes = require('./routes/jobRoutes');
const amenitiesRoutes = require('./routes/amenitiesRoutes');
const subAmenitiesRoutes = require('./routes/subamenitiesRoutes');
const bankRoutes = require('./routes/bankRoutes');
const blogRoutes = require('./routes/blogRoutes');
const developerRoutes = require('./routes/developerRoutes')
const eventRoutes = require('./routes/eventRoutes');
const imageRoutes = require('./routes/imageRoutes');
const faqRoutes = require('./routes/faqRoutes');
const subCityFaqRoutes = require('./routes/subCityFaqRoutes');
const locationAdvantageRoutes = require('./routes/locationAdvantageRoutes');
const newsRoutes = require('./routes/newsRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const addprojectRoutes = require('./routes/dashboard/addProjectRoutes');
const quickDetailsRoutes = require('./routes/dashboard/projectQuickDetailsRoutes');
const projectSpecificationsRoutes = require('./routes/dashboard/projectSpecificationsRoutes');
const projectReraRoutes = require('./routes/dashboard/projectReraRoutes');
const projectGalleryRoutes = require('./routes/dashboard/projectGalleryRoutes');
const projectBanksRoutes = require('./routes/dashboard/projectBanksRoutes');
const projectAmenitiesRoutes = require('./routes/dashboard/projectAmenitiesRoutes');
const projectLocationAdvantagesRoutes = require('./routes/dashboard/projectLocationAdvantagesRoutes');
const projectFloorPlanRoutes = require('./routes/dashboard/projectFloorFlanRoutes');
const projectfaqRoutes = require('./routes/dashboard/projectFaqRoutes');
const projectContentSEORoutes = require('./routes/dashboard/projectContentSEORoutes');
const projectBrochureWalkthroughRoutes = require('./routes/dashboard/projectBrochureWalkthroughRoutes');
const cityRoutes = require('./routes/cityRoutes');
const subCityRoutes = require('./routes/subCityRoutes');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all routes
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
dbConfig.connect();

// Use the routes
app.use('/categories', categoryRoutes);
app.use('/jobs', jobRoutes);
app.use('/amenities', amenitiesRoutes);    //have to work inside
app.use('/subAmenities', subAmenitiesRoutes);    //have to work inside
app.use('/banks', bankRoutes);
app.use('/blogs', blogRoutes);
app.use('/developers', developerRoutes);
app.use('/events', eventRoutes);
app.use('/images', imageRoutes);
app.use('/city', cityRoutes);
app.use('/faqs', faqRoutes);
app.use('/subCity', subCityRoutes);
app.use('/subCityFaqs', subCityFaqRoutes);
app.use('/locationAdvantages', locationAdvantageRoutes);
app.use('/news', newsRoutes);
//app.use('/dashboard', dashboardRoutes); need to change it 
app.use('/addProjects', addprojectRoutes);
app.use('/quickDetails', quickDetailsRoutes);
app.use('/projectSpecifications', projectSpecificationsRoutes);
app.use('/projectRera', projectReraRoutes);
app.use('/projectGallery', projectGalleryRoutes);
app.use('/projectBanks', projectBanksRoutes);
app.use('/projectAmenities', projectAmenitiesRoutes);
app.use('/projectLocationAdvantages', projectLocationAdvantagesRoutes);
app.use('/projectFloorPlan', projectFloorPlanRoutes);
app.use('/projectFaq', projectfaqRoutes);
app.use('/projectContentSEO', projectContentSEORoutes);
app.use('/projectBrochureWalkthrough', projectBrochureWalkthroughRoutes);

app.use(errorHandler);

app.listen(1000, () => {
    console.log("Server is running on port 1000");
});

module.exports = app;
