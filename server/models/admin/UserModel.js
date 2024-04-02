const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//user模型===>user集合
const UserType = {
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  avatar: String, //头像
  role: Number, //权限 管理员1 编辑2
  __v: {
    type: Number,
    select: false, // 不返回__v字段
  },
};
const UserModel = mongoose.model("adminUser", new Schema(UserType));
module.exports = UserModel;
