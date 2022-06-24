const router = require("express").Router();

const UsersUsecase = require("../../../usecases/users/users-usecase");

router.post("/register", (req, resp) => {
  //   console.log("Register Req", req.body);

  UsersUsecase.registerUser(req.body).then((res) => {
    resp.send("repsonse agyaa");
  });
});

module.exports = router;
