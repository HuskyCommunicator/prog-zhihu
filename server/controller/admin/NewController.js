// 引入所需的模块和服务
const NewService = require("../../service/admin/NewService");
const sendResponse = require("../../utils/sendResponse");
// const { JWT, tokenVerify } = require("../../utils/tokenVerify");

// 定义 UserController 对象
const NewController = {
  // add 函数处理用户注册请求
  add: async (req, res) => {
    const { title, author, content, category, cover, isPublish } = req.body;
    NewService.add({ title, author, content, category, cover, isPublish });
    return sendResponse(res, 200, "添加成功");
  },
  //
  getNewList: async (req, res) => {
    const NewList = await NewService.getNewList();
    console.log(NewList);
    return sendResponse(res, 200, "获取成功", NewList);
  },
};

// 导出 UserController 对象
module.exports = NewController;
