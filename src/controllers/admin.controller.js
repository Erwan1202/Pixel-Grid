const adminService = require("../services/admin.service");

exports.resetGrid = async (req, res) => {
    try {
        const result = await adminService.resetGrid();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
