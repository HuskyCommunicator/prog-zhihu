const jsonwebtoken = require("jsonwebtoken");
const secret = "erha";
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
module.exports = JWT;
