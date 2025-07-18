// -------------------- PACKAGE IMPORT FILES -------------------- //
import http from "http";
import { Server } from "socket.io";

// --------------- Importing Other Files --------------- //
import { app } from "./src/app.js";
import { envProvider } from "./src/constants.js";
import { connectDB } from "./src/database/database.js";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("🟢 New socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

const PORT = envProvider.PORT || 3000;
const BASE_URL = envProvider.BASE_URL || `http://localhost:${PORT}`;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server is running at ${BASE_URL}`);
  });
});
