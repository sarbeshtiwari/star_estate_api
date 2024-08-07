// controllers/bankController.js
const BanksList = require('../models/bankListModel');

// Add new bank list
exports.addBankList = async (req, res) => {
    try {
        const BankListArray = JSON.parse(req.body.data);

        if (!Array.isArray(BankListArray)) {
            return res.status(400).json({ success: false, message: "Request body must be an array of BankList" });
        }

        BankListArray.forEach((bank_list, index) => {
            if (req.files[index]) {
                bank_list.image = req.files[index].filename;
            }
        });

        const newReports = BankListArray.map(bank_list => new BanksList(bank_list));
        await BanksList.insertMany(newReports);

        res.json({ success: true, message: "Data added successfully" });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Fetch all bank lists
exports.getBankList = async (req, res) => {
    try {
        const BankList = await BanksList.find({});
        res.json(BankList);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

// Fetch a bank list by ID
exports.getBankListByID = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await BanksList.findById(id);
        if (!data) {
            return res.status(404).json({ error: "Not Found" });
        }
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Update bank list status
exports.updateBankListStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ success: false, message: "Status must be a boolean value (true or false)" });
    }

    try {
        const updatedCategory = await BanksList.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: "Data not found" });
        }

        res.json({ success: true, message: "Data status updated successfully", updatedCategory });
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

// Delete a bank list entry
exports.deleteBankList = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCategory = await BanksList.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ success: false, message: "Data not found" });
        }

        res.json({ success: true, message: "Data deleted successfully", deletedCategory });
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

// Update bank list entry
exports.updateBankList = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = JSON.parse(req.body.data);

        if (!Array.isArray(updates)) {
            return res.status(400).json({ success: false, message: "Request body must be an array of BankList" });
        }

        const existingBankList = await BanksList.findById(id);

        if (!existingBankList) {
            return res.status(404).json({ success: false, message: "BankList not found" });
        }

        updates.forEach((update, index) => {
            if (req.files[index]) {
                update.image = req.files[index].filename;
            }
        });

        for (const update of updates) {
            await BanksList.findByIdAndUpdate(id, update, { new: true, runValidators: true });
        }

        res.json({ success: true, message: "Data updated successfully" });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
