const mongoose = require('mongoose')
//创建集合实例
const categorySchema = new mongoose.Schema({
  name:{type:String},
  children:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"Article"
  }]
})
//创建集合并应用规则
const Category = mongoose.model('Category',categorySchema)

module.exports = Category

