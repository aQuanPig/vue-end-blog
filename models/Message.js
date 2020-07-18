const mongoose = require('mongoose')
const MessageSchema = mongoose.Schema({
  nickname:{type:String},
  content:{type:String},
  date:{type:Date,default:new Date()},
  avatar:{type:String}
})
const Message = mongoose.model('Message',MessageSchema)
module.exports = Message
