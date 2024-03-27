module.exports = {
    //服务端口配置
    app: {
      port: process.env.POST || 3010,
    },
    //数据库配置
    db: {
      url: process.env.MONGODB_UR || "mongodb://127.0.0.1:27017/test",
    },
    //jwt密钥
  //  secret: "759ae42e-cf99-4742-8678-56ed772170a4",
  };
  