// 引入所需模块
const Joi = require("joi");

// 引入joi-objectid模块进行ObjectId验证
Joi.objectId = require("joi-objectid")(Joi);

// 引入自定义的响应发送函数
const sendResponse = require("../utils/sendResponse");

// 定义一个异步中间件函数进行数据验证
const valid = async (req, res, next) => {
  try {
    // 进行数据验证
    const { error, value } = validate(req.body);
    if (error) {
      // 如果数据校验未通过，返回错误信息
      return res.status(400).json({
        code: 400,
        msg: error.details[0].message,
      });
    }
    // 如果数据校验通过，将验证后的值添加到请求对象中
    req.validValue = value;
    // 调用next函数以继续处理请求
    next();
  } catch (err) {
    // 如果发生错误，返回服务器错误信息
    res.status(500).json({
      code: 500,
      msg: "服务器错误",
    });
  }
};

// 定义一个函数进行数据验证
const validate = (body) => {
  // 定义验证规则
  const schema = Joi.object({
    username: Joi.string()
      .required()
      .messages({ "any.required": "缺少必选的参数username" }),
    password: Joi.string().required().messages({
      "any.required": "缺少必选的参数password",
    }),
    avatar: Joi.string().allow("").messages({
      "any.required": "缺少必选的参数avatar",
    }),
    role: Joi.number().valid(1, 2).messages({
      "any.required": "缺少必选的参数role",
    }),
    file: Joi.any(), // 允许任何类型的"file"字段
  });
  // 返回验证结果
  return schema.validate(body);
};

// 定义图片验证中间件
const imgValid = async (req, res, next) => {
  const maxSize = 200000; // 定义最大文件大小

  // 检查是否有文件被上传
  if (!req.file) {
    return sendResponse(res, 400, "请选择文件");
  }

  // 获取文件类型
  const fileType = req.file.mimetype;

  // 检查文件类型是否为图片
  if (!["image/jpeg", "image/jpg", "image/png"].includes(fileType)) {
    return sendResponse(res, 400, "上传文件格式错误 请重新选择文件");
  }

  // 检查文件大小
  if (req.file.size > maxSize) {
    return sendResponse(res, 400, "文件过大 请重新选择文件");
  }

  // 如果文件是图片，继续执行后续的路由处理器
  next();
};

// 导出中间件函数
module.exports = { valid, imgValid };
