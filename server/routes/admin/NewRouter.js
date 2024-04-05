// 引入所需的模块
const express = require("express");
const NewRouter = express.Router();
const NewController = require("../../controller/admin/NewController");
//文件上传
const multer = require("multer");
const upload = multer({ dest: "public/newUploads/" });
//引入token验证
const { tokenVerify, roleVerify } = require("../../utils/tokenVerify");
// NewRouter.use(tokenVerify);
//添加新闻
NewRouter.post(
  "/adminapi/new/add",
  upload.single("file"),
  NewController.addNew
);
//获取新闻列表
NewRouter.get("/adminapi/new/getList", NewController.getNewList);
//获取新闻
NewRouter.get("/adminapi/new/get/:id", NewController.getNew);
//更新新闻
NewRouter.put(
  "/adminapi/new/update",
  upload.single("file"),
  NewController.updateNew
);
//删除新闻
NewRouter.delete("/adminapi/new/del", NewController.delNew);
module.exports = NewRouter;
