const UserModel = require("../../models/admin/UserModel");

const UserService = {
  //添加用户
  add: async ({ username, password, role, avatar }) => {
    return UserModel.create({
      username,
      password,
      role,
      avatar,
    });
  },
  //登录
  login: async ({ username }) => {
    return UserModel.findOne({ username }).select("+password");
  },
  //获取用户列表
  getList: async () => {
    return UserModel.find({});
  },
  //获取指定用户
  getUser: async ({ _id, username }) => {
    if (_id) {
      return UserModel.findOne({ _id });
    }
    if (username) {
      return UserModel.findOne({ username: username });
    }
  },
  //删除指定用户
  delUser: async ({ username }) => {
    return UserModel.deleteOne({ username });
  },
  //更新指定用户
  uploadUser: async ({ _id, username, password, role, avatar }) => {
    if (avatar) {
      return UserModel.updateOne(
        { _id },
        {
          username,
          password,
          role,
          avatar,
        }
      );
    } else {
      return UserModel.updateOne(
        { _id },
        {
          username,
          password,
          role,
        }
      );
    }
  },
};

module.exports = UserService;
