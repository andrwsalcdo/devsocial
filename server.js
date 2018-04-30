const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// Routes
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();
// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;
// connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("mongodb connected...fireworks"))
  .catch(err => console.log("oh no! no fireworks...", err));

// Use Routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on ${port}`));
