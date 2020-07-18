const assert = require('http-assert')
const jwt = require('jsonwebtoken')
module.exports = (app,port,model) =>{
  return app.post(`/${port}/api/login`,async (req,res)=>{
    console.log(req.body)
    //1.校验用户名
    const {username,password} = req.body
    const user = await model.findOne({username}).select('+password')
    //确保用户存在，如果不存在抛出422状态码并返回错误信息
    assert(user,422,'用户不存在')
    // 2.校验密码：验证比对,返回布尔值表示验证结果 true表示一致，false表示不一致
    const isValid = require('bcryptjs').compareSync(password,user.password)
    assert(isValid,422,'密码错误')
    // 3.返回token
    console.log(user)
    const {nickname,avatar,_id} = user
    const token = jwt.sign({id:user._id},app.get('secret'))
    res.send({token,nickname,avatar,_id})
  })
}
