const yaml = require("../utils/handleYaml")
const postTodo = require("../config/mongoConn").getCollection(yaml.mongo.col_todo);
const {ObjectId} = require("mongodb");

exports.getTodo = async (id) => {
    try {
        const col = await postTodo();
        return col.find({id: id}).toArray();
    } catch (error) {
        throw "读取文章内容失败 " + error;
    }
}

exports.postTodo = async (data) => {
    try {
        const col = await postTodo();

        const result = await col.insertOne(data);
        return result.ops[0]
    } catch (error) {
        throw "写入文章内容失败 " + error;
    }
}

exports.putTodo = async (id, data) => {
    try {
        const col = await postTodo();
        const result = await col.findOneAndUpdate({_id: ObjectId(id)}, {
            $set: {title: data.title, status: data.status}
        });

        return result.value
    } catch (error) {
        throw "修改文章内容失败 " + error;
    }
}

exports.delTodo = async (id) => {
    try {
        const col = await postTodo();
        await col.deleteOne({_id: ObjectId(id)});
    } catch (error) {
        throw "删除文章内容失败 " + error;
    }
}
