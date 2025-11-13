const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectMongo = require("./config/db.mongo");
const setupSwagger = require("./config/swagger");

const adminRoutes = require("./routes/admin.routes");
const authRoutes = require("./routes/auth.routes");
const pixelRoutes = require("./routes/pixel.routes");
const userRoutes = require("./routes/user.routes");

const limiter = require("./middlewares/rateLimiter");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Middlewares
app.use(limiter);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/pixels", pixelRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.set("io", io);

// connectMongo();

setupSwagger(app);

io.on("connection", (socket) => {
    console.log("Un client (front-end) est connecté via WebSocket");

    socket.on("disconnect", () => {
        console.log("déconnecté.");
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(
        `Serveur (avec Sockets) démarré et à l'écoute sur le port ${PORT}`
    );
});
