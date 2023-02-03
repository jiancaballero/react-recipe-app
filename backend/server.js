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
const recipeRoutes = require("./routes/recipes.routes");
const userRoutes = require("./routes/users.routes");
// HEADERS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Request-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});
// API Endpoints
app.use("/api/recipes", recipeRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
