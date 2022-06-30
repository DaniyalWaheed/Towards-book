const BusinessError = require("../../errors/business-error");
const { FORBIDDEN } = require("../../errors/error-types");
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
    console.log({ userInfo });
  }

  static async fetchUsers() {
    return UsersRepo.findAll();
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
