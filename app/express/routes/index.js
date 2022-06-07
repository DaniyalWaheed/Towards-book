const router = require("express").Router();

const testRoutes = require("./test");

const setupRoutes = (app) => {
  router.use("/", testRoutes);

  app.use("/", router);
};

module.exports = {
  setupRoutes,
};
