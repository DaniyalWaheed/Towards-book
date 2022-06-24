const router = require("express").Router();

router.post("/test", (req, resp) => {
  console.log("finalyy structured khara.", req.body);
});

module.exports = router;
