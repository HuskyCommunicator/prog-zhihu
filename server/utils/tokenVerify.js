//引入jwt
const JWT = require("./JWT");
//引入响应集中处理
const sendResponse = require("./sendResponse");
const tokenVerify = (req, res, next) => {
  //获取token
  const token = req.headers["authorization"]?.split(" ")[1];
  //验证token是否有效
  const validity = JWT.verify(token);
  if (!validity) {
    console.log("gg");
    return sendResponse(res, 500, "令牌无效 请重新登录");
  }
  const { _id, username } = validity;
  const newToken = JWT.generate({ _id, username }, "1m");
  res.header("authorization", newToken);
  next();
};
module.exports = tokenVerify;
