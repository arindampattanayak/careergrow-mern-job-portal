import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import resumeRoutes from "./routes/resume.routes.js";
import messageRoutes from "./routes/message.route.js";

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// Allowed origins for CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,   // e.g. https://careergrow-mern-job-portal.vercel.app
  "http://localhost:5173",    // local dev
];

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Serve uploads
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/", resumeRoutes);
app.use("/api/v1/messages", messageRoutes);

// Optional: serve frontend if you deploy frontend + backend together
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Setup Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

// Socket.IO events
io.on("connection", (socket) => {
  console.log("🔌 New user connected:", socket.id);

  socket.on("sendMessage", (data) => {
    socket.to(data.receiverId).emit("receiveMessage", data);
  });

  socket.on("joinRoom", (userId) => {
    socket.join(userId);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Dynamic PORT (Render will inject process.env.PORT)
const PORT = process.env.PORT || 8000;

// Start server only after DB connects
const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`🚀 Server running at port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB", err);
    process.exit(1);
  }
};

startServer();
