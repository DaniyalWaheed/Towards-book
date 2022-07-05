const BusinessError = require("../../errors/business-error");
const { FORBIDDEN } = require("../../errors/error-types");
const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
const Users = require("../../mongodb/models/users-modal");
const UsersRepo = require("../../repositories/users");
const { validateModel } = require("../../utils");

module.exports = class UserUseCase {
  static async registerUser(user) {
    console.log({ user });
    const modal = new Users(user);

    await validateModel(modal);
    await UserUseCase.#validateUserExistance(user);
    return UsersRepo.saveUser(modal);
  }

  static async loginUser(userInfo) {
    // console.log({ userInfo });
    // const model = new
    let user = await UsersRepo.findByUserName(userInfo.username);

    // console.log("user;", user);
    if (user) UserUseCase.#generateJwtToken(user);
    else {
      throw new BusinessError(
        FORBIDDEN,
        `User with ${userInfo.username} does not exist`
      );
    }

    // return;
  }

  static async fetchUsers() {
    return UsersRepo.findAll();
  }

  static async #generateJwtToken(user) {
    let jwtSecretToken = process.env.JWT_SECRET_TOKEN;
    // console.log({ jwtSecretToken, user });

    // delete user.password;
    // console.log("After detele", user);

    const newUser = user.toObject();
    delete newUser.password;

    let data = {
      ...newUser,
    };

    // console.log({ data });

    const jwtToken = jwt.sign(data, jwtSecretToken);

    console.log({ jwtToken });
  }

  static async #validateUserExistance(user) {
    const existingUserWithSameName = await UsersRepo.findByUserName(
      user.username
    );

    const existingUserWithSameEmail = await UsersRepo.findByEmail(user.email);

    if (existingUserWithSameName) {
      throw new BusinessError(
        FORBIDDEN,
        `User with username ${user.username} already exists.`
      );
    } else {
      if (existingUserWithSameEmail) {
        throw new BusinessError(
          FORBIDDEN,
          `User with email ${user.email} already exists.`
        );
      }
    }
  }
};
