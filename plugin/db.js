module.exports = app =>{
  // 引入第三方模块mongodb并创建一个客户端
  const mongoose = require('mongoose')
  //连接数据库
  const url = "mongodb://127.0.0.1:27017/douban";
  //检测是否连接成功
  mongoose.connect(url,{useUnifiedTopology: true,useNewUrlParser: true }).then(()=>console.log('数据库连接成功'))
    .catch(err=>{console.log('数据库连接失败',err)})
}
