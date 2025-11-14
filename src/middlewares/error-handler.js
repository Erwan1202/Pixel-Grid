const errorHandler = (err, req, res, next) => {
    console.log(`Server error: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
};

module.exports = errorHandler;
