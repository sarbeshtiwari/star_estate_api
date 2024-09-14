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
const userQueryRoutes = require('./routes/queryRoutes');
const contactUS = require('./routes/contactUSRoutes');
const NRIQuery = require('./routes/NriQueryRoutes');
const careerQuery = require('./routes/careerRoutes');
const cityConfigurationRoutes = require('./routes/projectConfigurationRoutes')
const bannerImageRoutes = require('./routes/bannerImage');
const starRera = require('./routes/starRera');
const advertisement = require('./routes/advertisements')
const awards = require('./routes/awards');
const clientSpeak = require('./routes/clientSpeakRoutes');
const configurationFAQ = require('./routes/projectConfigurationFAQ');
const projectBannerImages = require('./routes/projectBannerImagesRoutes');

const authRoutes = require('./routes/auth/authRoutes');
const protectedRoutes = require('./routes/auth/protectedRoutes');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
const port = process.env.PORT || 4000;
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, origin); 
  },
  credentials: true,
};
// const corsOptions = {
//   origin: 'https://ecis.in', // directly specify the allowed origin
//   credentials: true,
// };


app.use(cors(corsOptions));
app.use('/uploads', express.static('uploads'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
dbConfig.connect();

// Use the routes
app.use('/categories', categoryRoutes);
app.use('/jobs', jobRoutes);
// app.use('/amenities', amenitiesRoutes);    //have to work inside
app.use('/subAmenities', subAmenitiesRoutes);    //have to work inside
app.use('/banks', bankRoutes);
app.use('/blogs', blogRoutes);
app.use('/developers', developerRoutes);
app.use('/events', eventRoutes);
app.use('/images', imageRoutes);
app.use('/city', cityRoutes);
app.use('/cityConfiguration', cityConfigurationRoutes);
app.use('/configurationFAQ', configurationFAQ);
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

app.use('/projectBannerImages', projectBannerImages);
app.use('/bannerImages', bannerImageRoutes);
app.use('/starRera', starRera);

app.use('/advertisement', advertisement);
app.use('/award', awards);
app.use('/clientSpeak', clientSpeak);

//enquiry

app.use('/userQuery', userQueryRoutes);
app.use('/contactUS', contactUS);
app.use('/NRIQuery', NRIQuery);
app.use('/careerQuery', careerQuery);


//auth
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);



app.use(errorHandler);

const server = app.listen(port, () => {
    const address = server.address();
    const host = address.address === '::' ? 'localhost' : address.address;
    const url = `http://${host}:${address.port}`;
    console.log(`Server running at ${url}`);
  });

module.exports = app;
