// 引入joi模块进行数据验证
const Joi = require("joi");
// 引入joi-objectid模块进行ObjectId验证
Joi.objectId = require("joi-objectid")(Joi);
// 假设你有一个外部定义的验证函数 validateInput
const validateInput = (body) => {
  // 在这里进行你的验证逻辑
  const schema = Joi.object({
    username: Joi.string()
      .required()
      .messages({ "any.required": "缺少必选的参数username" }),
    password: Joi.string().required().messages({
      "any.required": "缺少必选的参数password",
    }),
    role: Joi.number().valid(1, 2).messages({
      "any.required": "缺少必选的参数role",
    }),
  });
  return schema.validate(body);
};

const validator = () => {
  return (req, res, next) => {
    const { error, value } = validateInput(req.body);

    if (error) {
      //数据校验未通过
      console.log(error);
      return res.status(400).json({
        code: 400,
        msg: error.details[0].message,
      });
    }
    //数据校验通过
    req.validValue = value;
    next();
  };
};

module.exports = validator;
