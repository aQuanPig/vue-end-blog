//处理文件资源
const multer = require('multer')
const MAO = require('multer-aliyun-oss');
module.exports = (app, path, person) => {
  const upload = multer({
    // dest:path
    storage: MAO({
      config: {
        region: '',
        accessKeyId: '',
        accessKeySecret: '',
        bucket: 'zz-vue-blog'
      }
    })
  })
  return app.post(`/${person}/api/uploads`, upload.single('file'), (req, res, next) => {
    // req.file 是 `file` 文件的信息
    const file = req.file
    // 修改URL，改成线上的
    // file.url = `http://localhost:3000/${fileName}/${file.filename}`
    // file.url = `http://47.107.149.243/${fileName}/${file.filename}`
    res.send(file)
  })
}
