const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');

// Import Routes
const categoryRoutes = require('./routes/categoryRoutes');
const jobRoutes = require('./routes/jobRoutes');
const amenitiesRoutes = require('./routes/amenitiesRoutes');
const subAmenitiesRoutes = require('./routes/subamenitiesRoutes');
const bankRoutes = require('./routes/bankRoutes');
const blogRoutes = require('./routes/blogRoutes');
const developerRoutes = require('./routes/developerRoutes');
const eventRoutes = require('./routes/eventRoutes');
const imageRoutes = require('./routes/imageRoutes');
const faqRoutes = require('./routes/faqRoutes');
const subCityFaqRoutes = require('./routes/subCityFaqRoutes');
const locationAdvantageRoutes = require('./routes/locationAdvantageRoutes');
const newsRoutes = require('./routes/newsRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const addProjectRoutes = require('./routes/dashboard/addProjectRoutes');
const quickDetailsRoutes = require('./routes/dashboard/projectQuickDetailsRoutes');
const projectSpecificationsRoutes = require('./routes/dashboard/projectSpecificationsRoutes');
const projectReraRoutes = require('./routes/dashboard/projectReraRoutes');
const projectGalleryRoutes = require('./routes/dashboard/projectGalleryRoutes');
const projectBanksRoutes = require('./routes/dashboard/projectBanksRoutes');
const projectAmenitiesRoutes = require('./routes/dashboard/projectAmenitiesRoutes');
const projectLocationAdvantagesRoutes = require('./routes/dashboard/projectLocationAdvantagesRoutes');
const projectFloorPlanRoutes = require('./routes/dashboard/projectFloorFlanRoutes');
const projectFaqRoutes = require('./routes/dashboard/projectFaqRoutes');
const projectContentSEORoutes = require('./routes/dashboard/projectContentSEORoutes');
const projectBrochureWalkthroughRoutes = require('./routes/dashboard/projectBrochureWalkthroughRoutes');
const cityRoutes = require('./routes/cityRoutes');
const subCityRoutes = require('./routes/subCityRoutes');
const userQueryRoutes = require('./routes/queryRoutes');
const contactUSRoutes = require('./routes/contactUSRoutes');
const NRIQueryRoutes = require('./routes/NriQueryRoutes');
const careerQueryRoutes = require('./routes/careerRoutes');
const cityConfigurationRoutes = require('./routes/projectConfigurationRoutes');
const bannerImageRoutes = require('./routes/bannerImage');
const starReraRoutes = require('./routes/starRera');
const advertisementRoutes = require('./routes/advertisements');
const awardsRoutes = require('./routes/awards');
const clientSpeakRoutes = require('./routes/clientSpeakRoutes');
const configurationFAQRoutes = require('./routes/projectConfigurationFAQ');
const projectBannerImagesRoutes = require('./routes/projectBannerImagesRoutes');
const channelPartnerRoutes = require('./routes/channelPartnerRoutes');
const propertyEvaluationRoutes = require('./routes/propertyEvaluationReportRoutes');

// Authentication Routes
const authRoutes = require('./routes/auth/authRoutes');
const protectedRoutes = require('./routes/auth/protectedRoutes');

// Initialize Express App
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// CORS Setup
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, origin); 
  },
  credentials: true,
};
app.use(cors(corsOptions));
// const corsOptions = {
//   origin: 'https://ecis.in', // directly specify the allowed origin
//   credentials: true,
// };

// Static File Serving
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
const dbConfig = require('./config/db');
dbConfig.connect();

// Register Routes
app.use('/categories', categoryRoutes);
app.use('/jobs', jobRoutes);
// app.use('/amenities', amenitiesRoutes); // Disabled for now
app.use('/subAmenities', subAmenitiesRoutes);
app.use('/banks', bankRoutes);
app.use('/blogs', blogRoutes);
app.use('/developers', developerRoutes);
app.use('/events', eventRoutes);
app.use('/images', imageRoutes);
app.use('/city', cityRoutes);
app.use('/cityConfiguration', cityConfigurationRoutes);
app.use('/configurationFAQ', configurationFAQRoutes);
app.use('/faqs', faqRoutes);
app.use('/subCity', subCityRoutes);
app.use('/subCityFaqs', subCityFaqRoutes);
app.use('/locationAdvantages', locationAdvantageRoutes);
app.use('/news', newsRoutes);

// Dashboard Routes
app.use('/addProjects', addProjectRoutes);
app.use('/quickDetails', quickDetailsRoutes);
app.use('/projectSpecifications', projectSpecificationsRoutes);
app.use('/projectRera', projectReraRoutes);
app.use('/projectGallery', projectGalleryRoutes);
app.use('/projectBanks', projectBanksRoutes);
app.use('/projectAmenities', projectAmenitiesRoutes);
app.use('/projectLocationAdvantages', projectLocationAdvantagesRoutes);
app.use('/projectFloorPlan', projectFloorPlanRoutes);
app.use('/projectFaq', projectFaqRoutes);
app.use('/projectContentSEO', projectContentSEORoutes);
app.use('/projectBrochureWalkthrough', projectBrochureWalkthroughRoutes);

// Additional Project Routes
app.use('/projectBannerImages', projectBannerImagesRoutes);
app.use('/bannerImages', bannerImageRoutes);
app.use('/starRera', starReraRoutes);
app.use('/advertisement', advertisementRoutes);
app.use('/award', awardsRoutes);
app.use('/clientSpeak', clientSpeakRoutes);

// Enquiry Routes
app.use('/userQuery', userQueryRoutes);
app.use('/contactUS', contactUSRoutes);
app.use('/NRIQuery', NRIQueryRoutes);
app.use('/careerQuery', careerQueryRoutes);
app.use('/channelPartner', channelPartnerRoutes);
app.use('/propertyEvaluation', propertyEvaluationRoutes);

// Authentication Routes
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

// Error Handler Middleware
app.use(errorHandler);

// Start Server
const server = app.listen(port, () => {
  const address = server.address();
  const host = address.address === '::' ? 'localhost' : address.address;
  const url = `http://${host}:${address.port}`;
  console.log(`Server running at ${url}`);
});

module.exports = app;
