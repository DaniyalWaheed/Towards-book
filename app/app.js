const express = require("express");

const app = express();
const cors = require("cors");
// const userRoutes = require("./express/routes");
const routesManager = require("./express/routes");

routesManager.setupRoutes(app);

// parse application/json
app.use(express.json);

app.use(cors());

module.exports = app;
