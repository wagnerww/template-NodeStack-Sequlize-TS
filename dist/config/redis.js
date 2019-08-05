"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
const host = "localhost";
const port = 6379;
const client = redis.createClient(port, host);
client.on("connect", function () {
    if (process.env.NODE_ENV === "development") {
        console.log("==> Conexão com o REDIS OK!");
    }
});
client.on("error", function (err) {
    console.log("==> Falha na conexão com o REDIS: " + err);
});
exports.default = client;
