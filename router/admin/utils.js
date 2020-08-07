const assert = require('http-assert')
const Category = require("../../models/Category")
module.exports=async (req,res)=>{
  switch (req.Model.modelName) {
    case 'Article':
      const result = await req.Model.findOne({title:req.body.title})
      if(result){
        res.status(201).send("标题已经存在")
      } else {
        const model = await req.Model.create(req.body)
        model.categories.forEach(async item => {
          await Category.findOneAndUpdate("item",{$push:{children:item}})
        })
        // await Category.findOneAndUpdate("")
        res.send(model)
      }
      break;
    case 'Category':
      const result1 = await req.Model.findOne({name:req.body.name})

      if (!result1){
        const model = await req.Model.create(req.body)
        res.send(model)
      } else {
        res.status(201).send('分类已存在')
      }
      break;
    case 'AdminUser':
      const result2 = await req.Model.findOne({username:req.body.username})
      if (!result2){
        const model = await req.Model.create(req.body)
        res.send(model)
      } else {
        res.status(201).send('管理员已存在')
      }
      break;
    case  'User':
      const result3 = await req.Model.findOne({username:req.body.username})
      if (!result3){
        const model = await req.Model.create(req.body)
        res.send(model)
      } else {
        res.status(201).send('用户已存在')
      }
      break;
    case 'Comment':
      const comment = await req.Model.create(req.body)
      res.send(comment)
      const Article = require('../../models/Article')
      // $addToSet：向数组中添加元素，若数组本身含有该元素，则不添加，否则，添加，这样就避免了数组中的元素重复现象；
      // $push：向数组尾部添加元素，但它不管数组中有没有该元素，都会添加。
      const insert = await Article.findOneAndUpdate({_id:comment.articles},{$addToSet:{comments:comment._id}},{new:true})
      break;
    case 'Message':
      const message = await req.Model.create(req.body)
      res.send(message)
      break;
  }
}
