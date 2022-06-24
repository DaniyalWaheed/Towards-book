const router = require("express").Router();

const UsersUsecase = require("../../../usecases/users/users-usecase");

router.post("/register", (req, resp) => {
  UsersUsecase.registerUser(req.body).then((res) => {
    resp.send("repsonse agyaa");
  });
});

module.exports = router;
