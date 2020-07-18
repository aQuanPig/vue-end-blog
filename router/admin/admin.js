module.exports = app =>{
  const express = require('express')
  const AdminUser = require('../../models/AdminUser')
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')
  const captchaMiddleware = require('../../middleware/captcha')
  const router = express.Router({
    //合并参数，以获取到resource
    mergeParams:true
  })
  //POST请求
  router.post('/',async (req,res)=>{
    //创建数据 （增）
    //req.body 获取post请求传递过来的参数
    require('./utils')(req,res)
  })
  // GET请求  （查）
  router.get('/',async(req,res)=>{
    let queryOptions = {}
    if (req.Model.modelName === 'Article'){
      let pageSize = parseInt(req.query.size) || 5;
      let currentPage = parseInt(req.query.page) || 1;
      queryOptions.limit = pageSize
      queryOptions.skip = (currentPage - 1) * pageSize
      const model = await req.Model.find().setOptions(queryOptions).populate({
        path:'authorinfo categories comments',
        populate:{
          path:'user'
        }
      })
      //获取总条数
      const all = await req.Model.find()
      const total = all.length
      res.send({total,list:model})
    } else {
      const model = await req.Model.find()
      //获取总条数
      const all = await req.Model.find()
      const total = all.length
      res.send({total,list:model})
    }
    
  })
  //GET请求 （修改数据时提供的数据）
  //如果你有route/user/：name，那么“name”属性可作为req.params.name
  router.get('/:id',async (req,res)=>{
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  //PUT请求 （修改数据）
  router.put('/:id',async (req,res)=>{
    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
  })
  //DELETE请求 （删除数据）
  router.delete('/:id',async (req,res)=>{
    const model = await req.Model.findByIdAndDelete(req.params.id)
    res.send(model)
  })
  app.use('/admin/api/rest/:resource',authMiddleware(app),resourceMiddleware(),router)

  //登录处理
  require('../signIn/index')(app,'admin',AdminUser)

  //文件处理
  const path = require('path')
  const uploadPath = path.join(__dirname,"../../uploads")
  require('../fileResource/index')(app,uploadPath,'admin')
  //获取验证码
  // router.get('/admin/api/captcha',captchaMiddleware())
  const svgCaptcha = require('svg-captcha');
  app.get('/admin/api/captcha',(req, res, next) => {
    console.log('ok')
    const captcha = svgCaptcha.create({
      inverse: false, // 翻转颜色
      fontSize: 48, // 字体大小
      noise: 2, // 噪声线条数
      width: 100, // 宽度
      height: 40, // 高度
      size: 4,// 验证码长度
      ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    });
    console.log(captcha.text)
    res.type('svg')
    res.end(captcha.data);
  })

  //错误处理
  app.use((err,req,res,next)=>{
    // console.log(err)
    res.status(err.statusCode || 500).send({message:err.message})
  })
}
