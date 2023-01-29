const express = require("express");
const port = 8080;
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());

//DEPRECATION WARNING
mongoose.set("strictQuery", false);

//BODYPARSER
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
const favoriteRoutes = require("./routes/recipes.routes");
const userRoutes = require("./routes/users.routes");

// API Endpoints
app.use("/api/recipes", favoriteRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
