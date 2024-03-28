const UserService = require("../../service/admin/UserService");
const sendResponse = require("../../utils/sendResponse");
const JWT = require("../../utils/JWT");
const UserController = {
  // add 函数处理用户注册请求
  add: async (req, res) => {
    const { username, password, role } = req.validValue;
    const user = await UserService.getUser({ username });
    if (user) {
      return sendResponse(res, 400, "添加失败 用户已存在");
    }
    await UserService.add({ username, password, role });
    return sendResponse(res, 200, "注册成功");
  },

  // login 函数处理用户登录请求
  login: async (req, res) => {
    const { username, password } = req.validValue;
    const result = await UserService.login({ username, password });
    if (!result) {
      return sendResponse(res, 400, "用户名密码不匹配");
    }
    const user = await UserService.getUser({ username });
    const token = JWT.generate(
      {
        _id: user._id.toString(),
        username: user.username,
      },
      "1m"
    );
    res.header("Authorization", token);
    return sendResponse(res, 200, "登陆成功", user);
  },

  // getList 函数获取用户列表
  getList: async (req, res) => {
    const result = await UserService.getList();
    return sendResponse(res, 200, "获取成功", result);
  },

  // getUser 函数获取指定用户的信息
  getUser: async (req, res) => {
    const { _id } = req.body;
    const result = await UserService.getUser({ _id });
    if (!result) {
      return sendResponse(res, 400, "获取失败 用户不存在");
    }
    return sendResponse(res, 200, "获取用户成功", result);
  },

  // delUser 删除指定用户
  delUser: async (req, res) => {
    const { username } = req.body;
    const user = await UserService.getUser({ username });
    if (!user) {
      return sendResponse(res, 400, "删除失败 用户不存在");
    }
    await UserService.delUser({ username });
    return sendResponse(res, 200, "删除用户成功");
  },

  // putUser 更新指定用户
  putUser: async (req, res) => {
    const { _id, username, password, role } = req.body;
    // 检查_id是否存在
    if (!_id) {
      return res.status(400).send("更新失败,用户ID不存在");
    }
    // 根据_id获取用户
    const user = await UserService.getUser({ _id });
    // 如果用户不存在，返回错误信息
    if (!user) {
      return res.status(400).send("更新失败,用户不存在");
    }
    // 检查新的用户名是否已经存在
    const newName = await UserService.getUser({ username });
    // 如果新的用户名已经存在，并且不是当前用户的用户名，返回错误信息
    if (newName && newName._id.toString() !== _id) {
      return res.status(400).send("更新失败,用户名重复");
    }
    // 更新用户信息
    await UserService.putUser({ _id, username, password, role });
    // 返回成功信息
    return res.status(200).send("更新用户成功");
  },
};

module.exports = UserController;
