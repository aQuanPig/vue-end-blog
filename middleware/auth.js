const jwt = require('jsonwebtoken')
const AdminUser = require('../models/AdminUser')
const assert = require('http-assert')
module.exports = (options)=> async (req,res,next)=>{
    //校验用户是否登录
    const auth =  req.headers.authorization
    const token = auth ? String(auth).split(' ')[1] :''
    assert(token,401,'请先登录')
    const {id} = jwt.verify(token, options.get('secret'))
    assert(id,401,'请先登录')
    req.user = await AdminUser.findById(id)
    assert(req.user,401,'请先登录')
    next()
}
