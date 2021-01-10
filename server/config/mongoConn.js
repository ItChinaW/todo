const MongoClient = require("mongodb").MongoClient;
const yaml = require("../utils/handleYaml")
const url = "mongodb://" + yaml.mongo.user + ":" + yaml.mongo.pass + "@localhost:" + yaml.mongo.port;
const dbname = yaml.mongo.dbname;
let _db = null;

async function connectDb() {
    if (!_db) {
        try {
            const client = new MongoClient(url, {useUnifiedTopology: true}); //不过时
            await client.connect();
            _db = await client.db(dbname);
            console.log("连接数据库成功...........");
        } catch (error) {
            throw "连接数据库失败..........." + error;
        }
    }
    return _db;
}


exports.getCollection = (collection) => {
    let _col = null;
    return async () => {
        if (!_col) {
            const db = await connectDb();
            _col = await db.collection(collection)
        }
        return _col
    }
}
