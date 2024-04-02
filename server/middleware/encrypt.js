const bcrypt = require("bcrypt");

const encrypt = async (password) => {
  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports = encrypt;
