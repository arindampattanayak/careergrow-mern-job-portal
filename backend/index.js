import express from "express";
import http from "http"; // For creating server
import { Server } from "socket.io"; // Import socket.io
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import resumeRoutes from "./routes/resume.routes.js";
import messageRoutes from "./routes/message.route.js"; // <-- NEW

dotenv.config();

const app = express();
const server = http.createServer(app); // Create server for socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
// ✅ Serve the uploads folder publicly
app.use("/uploads", express.static("uploads"));
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/", resumeRoutes);
app.use("/api/v1/messages", messageRoutes); // <-- NEW

// 🔌 Socket.IO events
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("sendMessage", (data) => {
    // Broadcast to receiver
    socket.to(data.receiverId).emit("receiveMessage", data);
  });

  socket.on("joinRoom", (userId) => {
    socket.join(userId); // Join room with userId
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
// process.env
const PORT = 8000;
server.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
