const NewModel = require("../../models/admin/NewModel");

const NewService = {
  //添加用户
  add: async ({ title, author, content, category, cover, isPublish }) => {
    return NewModel.create({
      title,
      author,
      content,
      category,
      cover,
      isPublish,
    });
  },
  //
  getNewList: async () => {
    return NewModel.find({});
  },
};

module.exports = NewService;
