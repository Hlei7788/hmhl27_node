/**
 * 导出的一个方法，该方法获取注册页面
 */

 const path = require('path')

 const MongoClient = require("mongodb").MongoClient;
// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "czqd27";

exports.getRegisterPage = (req,res) => {
    // res.send('我是注册页面')
    res.sendFile(path.join(__dirname,'../public/views/register.html'))
}

exports.register = (req,res) => {
    const result = {
        status :0,
        message:'注册成功'
    }

    const {username}= req.body
    
    MongoClient.connect(
        url,
        {useNewUrlParser : true},
        function(err,client){
            // 拿到db
            const db = client.db(dbName);
            // 拿到集合

        }
    )
    
    res.json(result)
}