const express = require("express");
const app = express();

require("dotenv").config();
let dbConnect = require("./dbConnect");

// parse requests of content-type -application/json
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to mySQL-db application." });
});

let userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

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
