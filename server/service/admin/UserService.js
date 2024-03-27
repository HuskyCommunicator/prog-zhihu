const UserModel = require("../../models/admin/UserModel");

const UserService = {
  //添加用户
  add: async ({ username, password, role }) => {
    return UserModel.create({
      username,
      password,
      role,
    });
  },
  //登录
  login: async ({ username, password }) => {
    return UserModel.findOne({
      username,
      password,
    });
  },
  //获取用户列表
  getList: async () => {
    return UserModel.find({}, { _id: 1, username: 1, password: 1, role: 1 });
  },
  //获取指定用户
  getUser: async ({ _id, username }) => {
    if (_id) {
      return UserModel.findOne({ _id });
    }
    if (username) {
      return UserModel.findOne(
        { username: username },
        { _id: 1, username: 1, password: 1, role: 1 }
      );
    }
  },
  //删除指定用户
  delUser: async ({ username }) => {
    return UserModel.deleteOne({ username });
  },
  //更新指定用户
  putUser: async ({ _id, username, password, role }) => {
    return UserModel.updateOne(
      { _id },
      {
        username,
        password,
        role,
      }
    );
  },
};

module.exports = UserService;
