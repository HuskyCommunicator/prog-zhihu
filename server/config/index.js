module.exports = {
  //服务端口配置
  app: {
    port: process.env.POST || 3010,
  },
  //数据库配置
  db: {
    url: process.env.MONGODB_UR || "mongodb://127.0.0.1:27017/test",
  },
};
