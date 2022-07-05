const User = require("../../mongodb/models/users-modal");

module.exports = class UsersRepo {
  static async findByUserName(username) {
    return User.findOne({ username });
  }

  static async findByEmail(email) {
    return User.findOne({ email });
  }

  static saveUser(user) {
    return user.save();
  }

  static findAll() {
    return User.find();
  }
};
