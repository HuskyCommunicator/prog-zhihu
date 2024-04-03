const NewModel = require("../../models/admin/NewModel");

const NewService = {
  //添加新闻
  addNew: async ({ title, author, content, category, cover, isPublish }) => {
    return NewModel.create({
      title,
      author,
      content,
      category,
      cover,
      isPublish,
    });
  },
  //获取新闻列表
  getNewList: async () => {
    return NewModel.find({});
  },
  //获取新闻
  getNew: async ({ title }) => {
    return NewModel.findOne({ title });
  },

  //更新新闻
  updatedNew: async () => {
    return 1;
  },
  //删除新闻
  delNew: async ({ title }) => {
    return NewModel.deleteOne({ title });
  },
};

module.exports = NewService;
