// 引入所需的模块和服务
const NewService = require("../../service/admin/NewService");
const sendResponse = require("../../utils/sendResponse");
// const { JWT, tokenVerify } = require("../../utils/tokenVerify");

// 定义 UserController 对象
const NewController = {
  //添加新闻
  addNew: async (req, res) => {
    const { title, content, category, isPublish, author } = req.body;
    const cover = req.file ? `/avataruploads/${req.file.filename}` : "";
    const news = await NewService.getNew({ title });
    if (news) {
      return sendResponse(res, 400, "添加失败 标题名称重复");
    }
    NewService.addNew({ title, content, category, isPublish, author, cover });
    return sendResponse(res, 200, "添加成功");
  },
  //获取新闻列表
  getNewList: async (req, res) => {
    const NewList = await NewService.getNewList();
    return sendResponse(res, 200, "获取成功", NewList);
  },
  //更新新闻
  updateNew: async (req, res) => {},
  //删除新闻
  delNew: async (req, res) => {
    const { title } = req.body;
    console.log(req.body);
    await NewService.delNew({ title });
    return sendResponse(res, 200, "删除成功");
  },
};

// 导出 UserController 对象
module.exports = NewController;
