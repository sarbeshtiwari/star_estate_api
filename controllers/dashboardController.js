// controllers/bankController.js
const Dashboard = require('../models/dashboardModel');

// Add new bank list
exports.getData = async (req, res) => {
    UserModel.find({ status: true }) // Filter categories where status is true
        .then(categories => {
            res.json(categories);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
};
