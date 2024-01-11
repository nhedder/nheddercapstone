const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
let dbConnect = require("./dbConnect");

const http = require("http");
const socketIo = require("./libraries/socket"); // Import the Socket.IO setup function

const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

const server = http.createServer(app);
const io = socketIo(server); // Initialize Socket.IO using the imported function

// parse requests of content-type -application/json
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to mySQL-db application." });
});

let userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

let chatRoutes = require("./routes/chatRoutes");
app.use("/api/chat", chatRoutes);

let postRoutes = require("./routes/postRoutes");
app.use("/api/posts", postRoutes);

let reviewRoutes = require("./routes/reviewRoutes");
app.use("/api/reviews", reviewRoutes);

let skillRoutes = require("./routes/skillRoutes");
app.use("/api/skills", skillRoutes);

let tradeRoutes = require("./routes/tradeRoutes");
app.use("/api/trades", tradeRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

io.listen(3005, () => {
  console.log("Socket.IO server is running on port 3001");
});
