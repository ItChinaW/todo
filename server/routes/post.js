const express = require("express");
const route = express.Router();
const todoModel = require("../model/todo");

route.get("/", async (req, res) => {
    try {
        const data = await todoModel.getTodo();
        res.status(201).send(data);
        console.log("查询文章数据成功")
    } catch (error) {
        console.error(error)
        res.status(500).send();
    }
})

route.post("/", async (req, res) => {
    try {
        const data = await todoModel.postTodo(req.body)
        res.status(201).json(data)
        console.log("增加文章数据成功")
    } catch (error) {
        console.error(error)
        res.status(500).send();
    }
})

route.put("/:id", async (req, res) => {
    try {
        const data = await todoModel.putTodo(req.params.id, req.body)
        res.status(201).json(data)
        console.log("修改文章数据成功")
    } catch (error) {
        console.error(error)
        res.status(500).send();
    }
})

route.delete("/:id", async (req, res) => {
    try {
        await todoModel.delTodo(req.params.id)
        res.status(201).json({status: "删除成功", code: 200})
        console.log("删除文章数据成功")
    } catch (error) {
        console.error(error)
        res.status(500).send();
    }
})

module.exports = route
