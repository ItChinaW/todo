const express = require("express");

const todo = require("./post");
const user = require("./user");
const expressJwt = require("express-jwt")
const yaml = require("../utils/handleYaml")

module.exports = (app) => {
    app.use(express.urlencoded({extended: false}))   // 解析headers中的请求
    app.use("/user", user)
    // token
    app.use(expressJwt({
        secret: yaml.token.secret,
        algorithms: ['sha1', 'RS256', 'HS256'],
    }).unless({path: ["/user/login", "/user/register"]}
    ))

    // error
    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            // 这个需要根据⾃自⼰己的业务逻辑来处理理
            res.status(402).send({code: -1, msg: 'token验证失败'});
        } else {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error');
        }
    });

    app.use("/todo", todo)
    app.use(function (req, res, next) {
        res.status(404).send('Sorry cant find that!');
    });
}
