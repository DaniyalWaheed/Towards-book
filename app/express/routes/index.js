const router = require("express").Router();
var bodyParser = require("body-parser");

const testRoutes = require("./test");
const userRoutes = require("./users");

const setupRoutes = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  router.use("/", testRoutes);
  router.use("/", userRoutes);

  app.use("/v1/", router);
};

module.exports = {
  setupRoutes,
};
