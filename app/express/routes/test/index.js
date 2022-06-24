const router = require("express").Router();
// app.use(express.bodyParser());

router.post("/test", (req, resp) => {
  // console.log("Register Req", req.body);
  resp.send("Test Done");
  // return;
});

module.exports = router;
