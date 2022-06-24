const app = require("./app/app");
require("./app/databases/mongoose");

const port = 4100;

app.listen(port, () => {
  console.log("server listen.", port);
  //   app.use();
});
