const router = require("express").Router();

const testRoutes = require("./test");

const setupRoutes = (app) => {
  router.use("/", testRoutes);

  app.use("/v1/", router);
};

module.exports = {
  setupRoutes,
};
