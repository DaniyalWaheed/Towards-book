const mongoose = require("mongoose");

const MONGOOSE_URL =
  process.env.MONGOOSE_URL || "mongodb://localhost:27017/towards-books-db";
mongoose
  .connect(MONGOOSE_URL)
  .then(() => {
    console.log("Successfully connected with MongoDB.");
  })
  .catch((error) => {
    console.log("Some Error.", error);
    process.exit(-1);
  });

module.exports = mongoose;
