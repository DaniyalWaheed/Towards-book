const User = require("../../mongodb/models/users-modal");

module.exports = class UsersRepo {
  static async findByUserName(username) {
    return User.findOne({ username });
  }

  static async findByEmail(email) {
    return User.findOne({ email });
  }

  static saveUser(User) {
    return User.save();
  }

  static findUsers(query, sorter, skip, limit) {
    return User.find(query).sort(sorter).skip(skip).limit(limit);
  }

  static count(query) {
    return User.count(query);
  }
};
