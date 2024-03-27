const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//user模型===>user集合
const UserType = {
  username: String,
  password: String,
  avatar: String, //头像
  role: Number, //权限 管理员1 编辑2
};
const UserModel = mongoose.model("admin", new Schema(UserType));
module.exports = UserModel;
