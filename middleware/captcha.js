//获取验证码
const svgCaptcha = require('svg-captcha');
module.exports = ()=> {
  return (req, res, next) => {
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
    // 保存到session,忽略大小写
    req.session = captcha.text.toLowerCase();
    console.log(req.session); //0xtg 生成的验证码
    // //保存到cookie 方便前端调用验证
    // res.cookie('captcha', req.session);
    res.setHeader('Content-Type', 'image/svg+xml');
    console.log(captcha.data)
    res.end(captcha.data);
  }
}
