const mongoose = require('mongoose')
const admin = mongoose.Schema({
  username:{type:String},
  password:{
    type:String,
    select:false,//这个属性不会被查询出来
    set(value) {
      //密码做散列，不明文保存
      // 对密码进行加密
      // 1. 要进行加密的明文
      // 2. 随机字符串
      // 返回值是加密后的密码
      return require('bcryptjs').hashSync(value,12)
    }
  },
  avatar:String,
  nickname:String
})
const AdminUser = mongoose.model('AdminUser',admin)
module.exports = AdminUser
