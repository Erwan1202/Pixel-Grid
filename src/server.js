require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectMongo = require("./config/db.mongo");
const setupSwagger = require("./config/swagger");
const limiter = require("./middlewares/rate-limiter");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const pixelRoutes = require("./routes/pixel.routes");
const moveRoutes = require("./routes/move.routes");
const canvasRoutes = require("./routes/canvas.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(limiter);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pixels", pixelRoutes);
app.use("/api/moves", moveRoutes);
app.use("/api/canvases", canvasRoutes);
app.use("/api/admin", adminRoutes);

// Database & Documentation
connectMongo();
setupSwagger(app);

// Health
app.get("/api/status", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
});

// 404
app.use((req, res) => res.status(404).json({ error: "Unknown route" }));

// Error handler
app.use((err, req, res, next) => {
    console.log(`Server error: ${err.message}`);
    res.status(500).json({ error: "Internal server error" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
