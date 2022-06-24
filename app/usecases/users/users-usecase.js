const Users = require("../../mongodb/models/users-modal");
const { validateModel } = require("../../utils");

module.exports = class UserUseCase {
  static async registerUser(body) {
    console.log({ body });
    const modal = new Users(body);
    console.log(modal);
    console.log(await validateModel(modal));

    return modal.save();
  }
};
