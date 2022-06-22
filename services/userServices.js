const bcrypt = require('bcrypt');

class userServices {
  constructor(table) {
    this.userTable = table;
  }
  createUser = async (userBody) => {
    const password = await bcrypt.hash(userBody.password, 10);
    const { name, email } = userBody;
    const newUser = {
      name,
      email,
      password,
    };
    const userData = await this.userTable.create(newUser);
    return userData;
  };
  getUser = async (id) => {
    const userData = await this.userTable.findOne({
      where: { id },
    });
    return userData;
  };
  // without password
  getAllUser = async () => {
    const userData = await this.userTable.findAll({
      attributes: {
        exclude: ['password'],
        // without password
      },
    });
    return userData;
  };
  updateUser = async (id, userBody) => {
    const userData = await this.userTable.update(userBody, {
      where: { id },
    });
    return userData;
  };
  deleteUser = async (id) => {
    const userData = await this.userTable.destroy({
      where: { id },
    });
    return userData;
  };
  //
  getUserbyEmail = async (email) => {
    const userData = await this.userTable.findOne({
      where: { email },
    });
    return userData;
  };
}

module.exports = userServices;
