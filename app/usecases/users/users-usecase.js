const BusinessError = require("../../errors/business-error");
const { FORBIDDEN } = require("../../errors/error-types");
const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
const Users = require("../../mongodb/models/users-modal");
const UsersRepo = require("../../repositories/users");
const { validateModel } = require("../../utils");
const { isEmpty } = require("lodash");
const PaginationHelper = require("../../helpers/pagination-helper");

module.exports = class UserUseCase {
  static async registerUser(user) {
    const modal = new Users(user);

    await validateModel(modal);

    await UserUseCase.#validateUserExistance(user);

    return UsersRepo.saveUser(modal);
  }

  static async loginUser(userInfo) {
    let user = await UsersRepo.findByUserName(userInfo.username);

    if (user) UserUseCase.#generateJwtToken(user);
    else {
      throw new BusinessError(
        FORBIDDEN,
        `User with ${userInfo.username} does not exist`
      );
    }
  }

  static async fetchUsers(page, _filters, sorter = {}, searchStr = "") {
    const filters = _filters || {};

    const skip = (page.pageNo - 1) * page.chunkSize;

    if (!isEmpty(searchStr)) {
      filters["$text"] = {
        $search: searchStr,
      };
    }

    const response = await Promise.all([
      UsersRepo.count(filters),
      UsersRepo.findUsers(filters, sorter, skip, page.chunkSize),
    ]);

    return PaginationHelper.getPaginated(
      response[0],
      response[1],
      "users",
      page.chunkSize,
      page.pageNo
    );
  }

  static async #generateJwtToken(user) {
    let jwtSecretToken = process.env.JWT_SECRET_TOKEN;

    const { password, ...newUser } = user;

    let data = {
      ...user,
    };

    // const jwtToken = jwt.sign(data, "jwtSecretToken");

    // console.log({ jwtToken });
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
