const mongoose = require('mongoose')
const User = require('./User')
const Article = require('./Article')
console.log(Article)
const commentSchema = mongoose.Schema({
  content:{type:String},
  user:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:User
  },
  articles:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Article'
  },
  answer:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Answer'
  }],
  date:{type:Date,default:new Date()}
})
const Comment = mongoose.model('Comment',commentSchema)
module.exports = Comment
