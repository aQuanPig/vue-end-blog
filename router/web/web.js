module.exports = app =>{
  const express = require('express')
  const Article = require('../../models/Article')
  const router = express.Router()
  const assert = require('http-assert')

  //获取全部文章信息
  router.get('/articles',async (req,res)=>{
    let queryOptions = {}
    const pageSize = parseInt(req.query.size)
    const currentPage = parseInt(req.query.page) || 1
    queryOptions.limit = pageSize || 5;
    queryOptions.skip = (currentPage - 1) * pageSize
    queryOptions.populate = 'categories authorinfo'
    const all = await Article.find()
    const total = all.length
    const model = await Article.find().setOptions(queryOptions)
    res.send({total,model})
  })

  //获取留言长度
  router.get('/articles/total',async(req,res)=>{
    const article = await Article.find().countDocuments()
    res.send(article)
  })

  //关键字搜索文章
  router.get('/articles/keyword/:text',async (req,res)=>{
    const {text} = req.params
    // 使用正则表达式查找包含 text 字符串的文章
    const model = await Article.find({title:{$regex:text}}).populate('categories')
    res.send(model)
  })

  //获取某篇文章的信息
  router.get('/articles/detail/:id',async (req,res)=>{
    const model = await Article.findById(req.params.id).sort({'_id':-1}).populate('authorinfo categories').populate({
      path:'comments',
      options:{sort:{'_id':-1}},
      populate:{
        path:'user'
      }
    })
    res.send(model)
  })

  //获取最近的五篇文章
  router.get('/new_articles',async (req,res)=>{
    const model = await Article.find().sort({date:-1}).limit(5)
    res.send(model)
  })


  // 获取管理员信息
  const AdminUser = require('../../models/AdminUser')
  router.get('/admin',async (req,res)=>{
    const model = await AdminUser.findOne()
    res.send(model)
  })

  //获取分类信息
  const Category = require('../../models/Category')

  router.get('/categories',async (req,res)=>{
    const model = await Category.find()
    res.send(model)
  })


  //文件处理
  const path = require('path')
  const uploadPath = path.join(__dirname,"../../webuploads")
  require('../fileResource/index')(app,uploadPath,'web')

  // 用户注册
  const User = require('../../models/User')
  router.post('/user',async (req,res)=>{
    const model = await User.create(req.body.model)
    res.send(model)
  })

  // 登录处理
  require('../signIn/index')(app,'web',User)

  //添加评论处理
  router.post('/comments',async(req,res)=>{
    const Comment = require('../../models/Comment')
    const {content,articles,user} = req.body
    const comment = await Comment.create({content,user,articles})
    res.send(comment)
    // $addToSet：向数组中添加元素，若数组本身含有该元素，则不添加，否则，添加，这样就避免了数组中的元素重复现象；
    // $push：向数组尾部添加元素，但它不管数组中有没有该元素，都会添加。
    await Article.findOneAndUpdate({_id:comment.articles},{$addToSet:{comments:comment._id}},{new:true})
  })


  //获取某些分类中的文章
   router.get('/category/:articles',async (req,res)=>{
     console.log(req.params.articles)
     let pageSize = parseInt(req.query.size) || 5;
     let currentPage = parseInt(req.query.page) || 1;
     const articles = await Article.find({categories:req.params.articles}).limit(pageSize).skip((currentPage - 1)*pageSize).populate('categories authorinfo')
     res.send({articles,total:articles.length})
   })

  //获取全部留言
  const Message = require('../../models/Message')
  router.get('/message',async (req,res)=>{
    let pageSize = 10;
    let currentPage = parseInt(req.query.page) || 1;
    const message = await Message.find().limit(10).skip((currentPage - 1) * pageSize).sort({'_id':-1})
    const total = message.length
    res.send({message,total})
  })
  //添加留言
  router.post('/message',async (req,res)=>{
    const {nickname,avatar,content} = req.body
    const message = await Message.create({nickname,avatar,content})
    res.send(message)
  })
  //获取留言长度
  router.get('/message/total',async(req,res)=>{
    const message = await Message.find().countDocuments()
    res.send(message)
  })
  // 错误处理
  app.use((err,req,res,next)=>{
    res.status(err.statusCode || 500).send({message:err.message})
  })
  app.use('/web/api',router)
}
