const monoogse = require('mongoose')
const Category = require('../models/Category')
const AdminUser = require('../models/AdminUser')
const Comment = require('../models/Comment')
const articleSchema = monoogse.Schema({
  categories:[{
    type:monoogse.SchemaTypes.ObjectId,
    ref:Category
  }],
  title:{
    type:String,
    require:true
  },
  image:{
    type:String,
    require:true
  },
  account:{
    type:String
  },
  date:{
    type:String
  },
  authorinfo:{
    type:monoogse.SchemaTypes.ObjectId,
    ref:AdminUser
  },
  detail:{
    type:String,
    require:true
  },
  comments:[{
    type:monoogse.SchemaTypes.ObjectId,
    ref:'Comment'
  }],
  praise:[{
    type:monoogse.SchemaTypes.ObjectId,
    ref:'User'
  }]
})
const Article = monoogse.model('Article',articleSchema)
module.exports = Article
