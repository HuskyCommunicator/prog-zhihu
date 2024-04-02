// 引入 jsonwebtoken
const jsonwebtoken = require("jsonwebtoken");
// 引入响应集中处理
const sendResponse = require("./sendResponse");

const secret = "erha";

// 定义 JWT 对象
const JWT = {
  generate(value, expired) {
    return jsonwebtoken.sign(value, secret, { expiresIn: expired });
  },
  verify(token) {
    try {
      return jsonwebtoken.verify(token, secret);
    } catch (err) {
      return false;
    }
  },
};

// 定义 tokenVerify 函数
const tokenVerify = (req, res, next) => {
  // 获取 token
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return sendResponse(res, 500, "令牌不存在 请登录");
  }
  // 验证 token 是否有效
  const validity = JWT.verify(token);
  if (!validity) {
    return sendResponse(res, 500, "令牌无效 请重新登录");
  }
  const { _id, username, role } = validity;
  const newToken = JWT.generate({ _id, username, role }, "1d");
  res.header("authorization", newToken);
  next();
};
//定义roleVerify
const roleVerify = (req, res, next) => {
  // 获取 token
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return sendResponse(res, 500, "令牌无效 请登录");
  }

  // 验证 token 是否有效
  const user = JWT.verify(token);
  if (user.role !== 1) {
    return sendResponse(res, 500, "权限不够 无法访问");
  }

  next();
};
// 导出 JWT 对象和 tokenVerify 函数
module.exports = { JWT, tokenVerify, roleVerify };
