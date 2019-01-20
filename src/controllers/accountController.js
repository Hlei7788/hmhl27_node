/**
 * 导出的一个方法，该方法获取注册页面
 */

const path = require('path')

const MongoClient = require("mongodb").MongoClient;

const captchapng = require('captchapng')
// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "czqd27";

exports.getRegisterPage = (req, res) => {
    // res.send('我是注册页面')
    res.sendFile(path.join(__dirname, '../public/views/register.html'))
}

exports.register = (req, res) => {
    const result = {
        status: 0,
        message: '注册成功'
    }

    const {
        username
    } = req.body

    MongoClient.connect(
        url, {
            useNewUrlParser: true
        },
        function (err, client) {
            // 拿到db
            const db = client.db(dbName);
            // 拿到集合
            const collection = db.collection('accountInfo')

            // 查询一个
            collection.findOne({
                username
            }, (err, doc) => {
                if (doc) {
                    // 存在
                    result.status = 1
                    result.message = '用户名已经存在'

                    // 关闭数据库
                    client.close()

                    // 返回
                    res.json(result)
                } else {
                    // 如果用户名不存在 插入到数据库中
                    collection.insertOne(req.body, (err, result2) => {
                        if (!result2) {
                            result.status = 2;
                            result.message = "注册失败"
                        }

                        // 关闭数据库
                        client.close()

                        // 返回
                        res.json(result)
                    })
                }
            })
        }
    )
}

// 导入获取登录页面的方法
exports.getLoginPage = (req,res)=>{
    res.sendFile(path.join(__dirname,'../public/views/login.html'))
}

exports.getVcodeImage = (req,res)=>{
    const vcode = parseInt(Math.random() * 9000 + 1000);
  // 把vcode保存到session对象中去，方便将来登录
  req.session.vcode = vcode
  var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
  p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

  var img = p.getBase64();
  var imgbase64 = new Buffer(img, "base64");
  res.writeHead(200, {
    "Content-Type": "image/png"
  });
  res.end(imgbase64);
}