const express = require("express");
const route = express.Router();
const userModel = require("../model/user");

route.post("/login", async (req, res) => {
    try {
        const data = await userModel.login(req.body);
        if (data == "") {
            res.status(401).send({"mess": "用户名或密码错误"});
            console.error("登录失败")
        } else {
            res.status(200).send(data);
            console.log("登录成功")
        }
    } catch (error) {
        console.error(error)
        res.status(500).send({error: error});
    }
})

route.post("/register", async (req, res) => {
    try {
        const data = await userModel.register(req.body);
        if (data === "") {
            res.status(401).send({"mess": "用户名或密码存在或为空"});
            console.error("注册失败")
        } else {
            res.status(200).send(data);
            console.log("注册成功")
        }
    } catch (error) {
        console.error(error)
        res.status(500).send({error: error});
    }
})

module.exports = route
