"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
dotenv_1.default.config({
    path: "../.env"
});
var app = (0, express_1.default)();
var PORT = process.env.PORT;
app.get("/", function (req, res) {
    res.send("Hello");
});
app.listen(PORT, function () {
    console.log("Server is listening at ".concat(PORT));
});
