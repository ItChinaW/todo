const yaml = require("../utils/handleYaml")
const userTodo = require("../config/mongoConn").getCollection(yaml.mongo.col_user);
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

exports.login = async (data) => {
    let bcryptTF
    try {
        const col = await userTodo();
        if (data.username === "" || data.username.trim() === "" || data.password === "" || data.password.trim() === "") {
            throw "用户或密码不能为空"
        }

        const str = await col.find({username: data.username}).project({token: 0}).toArray();
        if (str.length === 0) {
            throw "用户名或密码错误"
        }

        bcryptTF = await bcrypt.compare(data.password, str[0].password)
        if (!bcryptTF) {
            throw "用户名或密码错误"
        }

        const token = jwt.sign({username:str[0].username,token:str[0].token,_id:str[0]._id}, yaml.token.secret, {
            expiresIn: yaml.token.expiresIn
        })
        await col.updateOne({_id: str[0]._id}, {$set: {token: token}})
        const str1 = await col.find({_id: str[0]._id}).project({password: 0}).toArray();
        return str1[0]

    } catch (error) {
        throw "登录失败 " + error;
    }
}
exports.register = async (data) => {
    try {
        const col = await userTodo();
        if (data.username === "" || data.username.trim() === "" || data.password === "" || data.password.trim() === "") {
            throw "用户名或密码不能为空"
        }

        const isExist = await col.find({username: data.username}).toArray()
        if (isExist.length !== 0) {
            throw "用户名已经存在"
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(data.password, salt);
        const str = await col.insertOne({username: data.username, password: hash});
        const ops = str.ops[0]

        const token = jwt.sign({id: ops._id, username: ops.username}, yaml.token.secret, {
            expiresIn: yaml.token.expiresIn
        })

        await col.updateOne({_id: ops._id}, {$set: {token: token}})
        const str1 = await col.find({_id: ops._id}).project({password: 0}).toArray();
        return str1[0]
    } catch (error) {
        throw "注册失败 " + error;
    }
}
