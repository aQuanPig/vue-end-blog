const express = require('express')
const path = require('path')
const app = express()
app.set('secret','ddasdjaiojd1231')
//解决跨域
const cors = require('cors')
app.use(cors())
// 处理post请求中的json
app.use(express.json())
//处理静态资源的访问，表示/uploads下面的文件都是静态文件
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
app.use('/webuploads',express.static(path.join(__dirname,'/webuploads')))

//后台管理系统接口
require('./router/admin/admin')(app)
// 前台展示接口
require('./router/web/web')(app)
require('./plugin/db')(app)



app.listen(3000,()=>{
  console.log('http://localhost:3000;启动服务成功')
})
