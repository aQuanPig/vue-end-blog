const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
  username:{type:String,require:true},
  nickname:{type:String,require:true},
  password:{
    type:String,
    require: true,
    select:false,
    set(value){
      return require('bcryptjs').hashSync(value,12)
    }
  },
  avatar:{type:String},
  // captcha:{type:String,require:true}
})
const User = mongoose.model('User',userSchema)
module.exports = User
