// 引入所需的模块
const express = require("express");
const UserController = require("../../controller/admin/UserController");
//验证中间件
const validator = require("../../middleware/validate");
//引入token验证
const tokenVerify = require("../../utils/tokenVerify");
const UserRouter = express.Router();

//图片上传
const multer = require("multer");
const upload = multer({ dest: "public/avataruploads/" });
//登录接口
UserRouter.post("/adminapi/user/login", validator(), UserController.login);
UserRouter.use(tokenVerify);
//用户管理-添加用户接口
UserRouter.post("/adminapi/user/add", validator(), UserController.add);

//用户管理-用户列表接口
UserRouter.get("/adminapi/user/getlist", UserController.getList);
UserRouter.get("/adminapi/user/getuser", UserController.getUser);

//用户管理-删除用户接口
UserRouter.delete("/adminapi/user/deluser", UserController.delUser);
//用户管理-更新用户接口
UserRouter.put("/adminapi/user/putuser", UserController.putUser);
module.exports = UserRouter;
