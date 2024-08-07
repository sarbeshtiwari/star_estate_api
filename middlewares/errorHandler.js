module.exports = (err, req, res, next) => {
    console.error(err.stack);
    if (err.message === 'Only image files are allowed.') {
        return res.status(400).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: 'Internal Server Error' });
};
