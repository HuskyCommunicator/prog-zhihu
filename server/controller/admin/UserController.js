// 引入所需的模块和服务
const UserService = require("../../service/admin/UserService");
const sendResponse = require("../../utils/sendResponse");
const { JWT, tokenVerify } = require("../../utils/tokenVerify");
const bcrypt = require("bcrypt");
const encrypt = require("../../middleware/encrypt");
// 定义 UserController 对象
const UserController = {
  // add 函数处理用户注册请求
  add: async (req, res) => {
    // 从请求中获取用户名、密码和角色
    const { username, password, role } = req.body;
    // 如果请求中包含文件，则设置 avatar 为文件的路径，否则设置为空字符串
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";
    // 检查用户名是否已存在
    const user = await UserService.getUser({ username });
    if (user) {
      // 如果用户已存在，返回错误信息
      return sendResponse(res, 400, "添加失败 用户已存在");
    }
    //加密密码
    const bcrPwd = await encrypt(password);
    // 添加新用户
    await UserService.add({ username, password: bcrPwd, role, avatar });

    // 返回成功信息
    return sendResponse(res, 200, "添加成功");
  },

  // login 函数处理用户登录请求
  login: async (req, res) => {
    // 从请求中获取用户名和密码
    const { username, password } = req.body;
    // 验证用户名和密码
    const result = await UserService.login({ username });
    // 如果用户名不存在
    if (!result) {
      return sendResponse(res, 400, "用户名不存在");
    }
    //将请求的密码进行加密 与数据库中的密码进行比较
    let compareResult = bcrypt.compare(password, result.password);
    //密码不正确 返回失败
    if (!compareResult) {
      return res.status(400).json({
        code: 400,
        msg: "用户名和密码不匹配",
      });
    }
    // 获取用户信息
    const user = await UserService.getUser({ username });

    // 生成 JWT 令牌
    const token = JWT.generate(
      {
        _id: user._id.toString(),
        username: user.username,
        role: user.role,
      },
      "1d"
    );

    // 将 JWT 令牌添加到响应头
    res.header("Authorization", token);

    // 返回成功信息和用户数据
    return sendResponse(res, 200, "登陆成功", user);
  },

  // getList 函数获取用户列表
  getList: async (req, res) => {
    // 获取用户列表
    const result = await UserService.getList();

    // 返回成功信息和用户列表
    return sendResponse(res, 200, "获取成功", result);
  },

  // getUser 函数获取指定用户的信息
  getUser: async (req, res) => {
    const result = await UserService.getUser({ _id: req.params.id });
    if (!result) {
      // 如果用户不存在，返回错误信息
      return sendResponse(res, 400, "获取失败 用户不存在");
    }

    return sendResponse(res, 200, "获取用户成功", result);
  },

  // delUser 删除指定用户
  delUser: async (req, res) => {
    // 从请求中获取用户名
    const { username } = req.body;

    // 检查用户是否存在
    const user = await UserService.getUser({ username });
    if (!user) {
      // 如果用户不存在，返回错误信息
      return sendResponse(res, 400, "删除失败 用户不存在");
    }

    // 删除用户
    await UserService.delUser({ username });

    // 返回成功信息
    return sendResponse(res, 200, "删除用户成功");
  },

  // uploadUser 更新指定用户
  uploadUser: async (req, res) => {
    // 从请求头中获取授权令牌，并提取出 JWT 令牌
    const token = req.headers["authorization"]?.split(" ")[1];

    // 验证 JWT 令牌并获取用户 ID
    const { _id } = JWT.verify(token);

    // 如果请求中包含文件，则设置 avatar 为文件的路径，否则设置为空字符串
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";

    // 从请求体中获取用户名、密码和角色
    const { username, password, role } = req.body;
    //加密密码
    const bcrPwd = await encrypt(password);
    // 检查新的用户名是否已经存在
    const newName = await UserService.getUser({ username });

    // 如果新的用户名已经存在，并且不是当前用户的用户名，返回错误信息
    if (newName && newName._id.toString() !== _id) {
      return sendResponse(res, 400, "更新失败 用户名重复");
    }

    // 更新用户信息
    await UserService.uploadUser({
      _id,
      username,
      password: bcrPwd,
      role,
      avatar,
    });

    // 返回成功信息和更新后的用户数据
    let data = { username, password, role };
    if (avatar) {
      data.avatar = avatar;
    }
    sendResponse(res, 200, "更新成功", data);
  },
  putUser: async (req, res) => {
    // 如果请求中包含文件，则设置 avatar 为文件的路径，否则设置为空字符串
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";

    // 从请求体中获取用户名、密码和角色
    const { username, password, role, _id } = req.body;
    //加密密码
    const bcrPwd = await encrypt(password);
    // 检查新的用户名是否已经存在
    const newName = await UserService.getUser({ username });

    // 如果新的用户名已经存在，并且不是当前用户的用户名，返回错误信息
    if (newName && newName._id.toString() !== _id) {
      return sendResponse(res, 400, "更新失败 用户名重复");
    }

    // 更新用户信息
    await UserService.uploadUser({
      _id,
      username,
      password: bcrPwd,
      role,
      avatar,
    });

    // 返回成功信息和更新后的用户数据
    let data = { username, role };
    if (avatar) {
      data.avatar = avatar;
    }
    return sendResponse(res, 200, "更新成功", data);
  },
};

// 导出 UserController 对象
module.exports = UserController;
