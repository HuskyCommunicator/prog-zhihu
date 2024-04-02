//引入配置文件
const config = require("../config");
const mongoose = require("mongoose");
const db = mongoose.connection;
mongoose.connect(config.db.url);
db.on("error", (err) => {
  console.log("数据库连接失败", err);
});
db.on("open", () => {});
