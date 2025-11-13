const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const { connectMongo } = require("./config/database");
const setupSwagger = require("./config/swagger");

const gridRoutes = require("./routes/gridRoutes");
const adminRoutes = require("./routes/admin.routes");
const authRoutes = require("./routes/auth.routes");
const pixelRoutes = require("./routes/pixel.routes");
const userRoutes = require("./routes/user.routes");

require("dotenv").config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.set("io", io);

connectMongo();

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use("/api/grid", gridRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pixel", pixelRoutes);
app.use("/api/auth", authRoutes);

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
