const express = require("express");
const todo = require("./post");

module.exports = (app) => {
    app.use("/todo", todo)
    app.use(function (req, res, next) {
        res.status(404).send('Sorry cant find that!');
    });
}
