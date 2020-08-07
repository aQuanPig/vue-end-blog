const mongoose = require('mongoose')
const User = require('./User')
const Comment = require('./Comment')
const commentSchema = mongoose.Schema({
  content:{type:String},
  user:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:User
  },
  comment:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:Comment
  },
  date:{type:Date,default:Date.now()}
})
const Answer = mongoose.model('Answer',commentSchema)
module.exports = Answer
