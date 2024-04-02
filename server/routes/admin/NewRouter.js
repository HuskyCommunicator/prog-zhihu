// 引入所需的模块
const express = require("express");
const NewRouter = express.Router();
const NewController = require("../../controller/admin/NewController");
//文件上传
const multer = require("multer");
const upload = multer({ dest: "public/newUploads/" });
//添加新闻
NewRouter.post("/adminapi/new/add", NewController.add);
//获取新闻列表
NewRouter.get("/adminapi/new/getList", NewController.getNewList);
module.exports = NewRouter;
