module.exports= options =>{
  return (req,res,next)=>{
    //1.取出资源的名称 inflection转换类名，复数变单数
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../models/${modelName}`)
    // req.Model = require('../../models/Article')
    next()
  }
}
