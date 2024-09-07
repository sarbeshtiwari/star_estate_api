// const mongoose = require('mongoose');

// const UserDataSchema = new mongoose.Schema({
//     BanksId: { type: String, required: true },
//     status: { type: Boolean, required: true }
// });

// const ratingsSchema = new mongoose.Schema({
//     amenities: { type: Number, default: 0 },
//     lifestyle: { type: Number, default: 0 },
//     layout: { type: Number, default: 0 },
//     connectivity: { type: Number, default: 0 },
//     value_for_money: { type: Number, default: 0 },
// });

// const UserSchema = new mongoose.Schema({
//     projectname: { type: String, required: true },
//     data: [UserDataSchema],
//     data1: [ratingsSchema]
// });

// const UserModel = mongoose.model('projects_Banks', UserSchema);

// module.exports = UserModel;

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    projectname: { type: String, required: true },
    accountNumber: { type: Number, required:false },
    IFSCcode: { type: String, required:false },
    CIFno: { type: String, required:false },
    bankName: { type: String, required:false },
    bankAddress: { type: String, required:false },
    otherDetails: {type: String, required: false},
});

const UserModel = mongoose.model('projects_Banks', UserSchema);

module.exports = UserModel;
