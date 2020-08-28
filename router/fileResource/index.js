//处理文件资源
const multer = require('multer')
const MAO = require('multer-aliyun-oss');
module.exports = (app, path, person) => {
  const upload = multer({
    // dest:path
    storage: MAO({
      config: {
        region: 'oss-cn-shenzhen',
        accessKeyId: 'LTAI4G8XiQwhDckLpyM9yx9Y',
        accessKeySecret: 't6br32uJcwe1PUSx3KOCi6BxZ8guV5',
        bucket: 'zz-vue-blog'
      }
    })
  })
  return app.post(`/${person}/api/uploads`, upload.single('file'), (req, res, next) => {
    // req.file 是 `file` 文件的信息
    const file = req.file
    let fileName = ''
    if (person === 'web') {
      fileName = 'webuploads'
    } else {
      fileName = 'uploads'
    }
    // 修改URL，改成线上的
    // file.url = `http://localhost:3000/${fileName}/${file.filename}`
    // file.url = `http://47.107.149.243/${fileName}/${file.filename}`
    res.send(file)
  })
}
