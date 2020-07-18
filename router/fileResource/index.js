//处理文件资源
const multer = require('multer')
module.exports = (app,path,person) =>{
  const upload = multer({dest:path})
  return app.post(`/${person}/api/uploads`,upload.single('file'),(req,res,next)=>{
    // req.file 是 `file` 文件的信息
    const file = req.file
    let fileName =''
    console.log(person)
    if (person === 'web'){
      fileName  = 'webuploads'
    } else {
      fileName = 'uploads'
    }
    file.url = `http://localhost:3000/${fileName}/${file.filename}`
    res.send(file)
  })
}
