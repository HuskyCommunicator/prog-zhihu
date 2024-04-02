// 引入所需的模块
const express = require("express");
const UserController = require("../../controller/admin/UserController");
//验证中间件
const { valid, imgValid } = require("../../middleware/valid");

//引入token验证
const { tokenVerify, roleVerify } = require("../../utils/tokenVerify");
const UserRouter = express.Router();

//文件上传
const multer = require("multer");
const upload = multer({ dest: "public/avatarUploads/" });
//登录接口
UserRouter.post("/adminapi/user/login", UserController.login);
UserRouter.use(tokenVerify);
//个人中心 更新用户接口
UserRouter.put(
  "/adminapi/user/upload",
  upload.single("file"),
  UserController.uploadUser
);
//检查用户权限
UserRouter.use(roleVerify);
//用户管理-添加用户接口
UserRouter.post(
  "/adminapi/user/add",
  upload.single("file"),
  valid,
  imgValid,

  UserController.add
);

//用户管理-用户列表接口
UserRouter.get("/adminapi/user/getlist", UserController.getList);
UserRouter.get("/adminapi/user/getuser/:id", UserController.getUser);

//用户管理-删除用户接口
UserRouter.delete("/adminapi/user/deluser", UserController.delUser);
//用户管理-更新用户接口
UserRouter.put(
  "/adminapi/user/putuser",
  upload.single("file"),
  UserController.putUser
);

module.exports = UserRouter;
