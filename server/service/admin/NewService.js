const NewModel = require("../../models/admin/NewModel");

const NewService = {
  //添加新闻
  addNew: async ({
    title,
    author,
    content,
    category,
    cover,
    isPublish,
    editTime,
  }) => {
    return NewModel.create({
      title,
      author,
      content,
      category,
      cover,
      isPublish,
      editTime,
    });
  },
  //获取新闻列表
  getNewList: async () => {
    return NewModel.find({});
  },
  //获取新闻
  getNew: async ({ title, _id }) => {
    if (title) {
      return NewModel.findOne({ title });
    } else if (_id) {
      return NewModel.findOne({ _id });
    }
  },

  //更新新闻
  updatedNew: async ({
    _id,
    cover,
    title,
    content,
    category,
    isPublish,
    author,
    editTime,
  }) => {
    if (cover) {
      return NewModel.updateOne(
        { _id },
        { title, content, category, cover, isPublish, author, editTime }
      );
    } else {
      return NewModel.updateOne(
        { _id },
        { title, content, category, isPublish, author, editTime }
      );
    }
  },
  //删除新闻
  delNew: async ({ title }) => {
    return NewModel.deleteOne({ title });
  },
};

module.exports = NewService;
