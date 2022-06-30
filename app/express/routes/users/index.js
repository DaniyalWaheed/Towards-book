const router = require("express").Router();

const HttpErrorResponseHandler = require("../../../errors/handlers/http-error-response-handler");
const UsersUsecase = require("../../../usecases/users/users-usecase");

router.post("/register", (req, resp) => {
  UsersUsecase.registerUser(req.body)
    .then((user) => {
      resp.status(200).send({ user });
    })
    .catch(HttpErrorResponseHandler.handle(resp));
});

router.get("/signin", (req, resp) => {
  UsersUsecase.loginUser()
    .then((user) => {
      resp.status(200).send({ user });
    })
    .catch(HttpErrorResponseHandler.handle(resp));
});

router.get("/list", (req, resp) => {
  UsersUsecase.fetchUsers()
    .then((user) => {
      resp.status(200).send({ user });
    })
    .catch(HttpErrorResponseHandler.handle(resp));
});

module.exports = router;
