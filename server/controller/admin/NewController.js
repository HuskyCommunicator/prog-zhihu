// 引入所需的模块和服务
const NewService = require("../../service/admin/NewService");
const sendResponse = require("../../utils/sendResponse");
// 定义 NewController 对象
const NewController = {
  // 添加新闻
  addNew: async (req, res) => {
    // 从请求体中解构出所需的数据
    const { title, content, category, isPublish, author } = req.body;
    // 如果请求中包含文件，则设置封面图片路径，否则封面为空
    const cover = req.file ? `/newUploads/${req.file.filename}` : "";
    // 查询是否已存在同名新闻
    const news = await NewService.getNew({ title });
    if (news) {
      // 如果存在同名新闻，则返回错误信息
      return sendResponse(res, 400, "添加失败 标题名称重复");
    }
    // 添加新闻
    NewService.addNew({
      title,
      content,
      category,
      isPublish,
      author,
      cover,
      editTime: new Date(),
    });
    // 返回成功信息
    return sendResponse(res, 200, "添加成功");
  },
  // 获取新闻列表
  getNewList: async (req, res) => {
    // 获取新闻列表
    const NewList = await NewService.getNewList();
    // 返回新闻列表
    return sendResponse(res, 200, "获取成功", NewList);
  },
  // 获取新闻
  getNew: async (req, res) => {
    // 根据 ID 获取新闻
    const news = await NewService.getNew({ _id: req.params.id });
    if (!news) {
      // 如果新闻不存在，则返回错误信息
      return sendResponse(res, 400, "获取失败 新闻不存在");
    }
    // 返回新闻信息
    return sendResponse(res, 200, "获取新闻成功", news);
  },
  // 更新新闻
  updateNew: async (req, res) => {
    // 从请求体中解构出所需的数据
    const { _id, title, content, category, isPublish, author } = req.body;
    // 根据 ID 获取新闻
    const news = await NewService.getNew({ _id });
    // 如果请求中包含文件，则设置封面图片路径，否则封面为空
    const cover = req.file ? `/newUploads/${req.file.filename}` : "";
    if (!news) {
      // 如果新闻不存在，则返回错误信息
      return sendResponse(res, 400, "更新失败 新闻不存在");
    }
    // 更新新闻
    NewService.updatedNew({
      _id,
      cover,
      title,
      content,
      category,
      isPublish,
      author,
      editTime: new Date(),
    });
    // 返回成功信息
    return sendResponse(res, 200, "更新成功");
  },
  // 删除新闻
  delNew: async (req, res) => {
    // 从请求体中获取要删除的新闻的标题
    const { title } = req.body;
    // 删除新闻
    await NewService.delNew({ title });
    // 返回成功信息
    return sendResponse(res, 200, "删除成功");
  },
};

// 导出 NewController 对象
module.exports = NewController;
