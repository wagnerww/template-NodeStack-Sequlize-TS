"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({});
const server_1 = require("./server");
server_1.default.listen(process.env.APP_PORT || 3001);
if (process.env.NODE_ENV === "development") {
    const BgBlack = "\x1b[32m";
    console.log(BgBlack, ` Sua api decolou no endereço:  ${process.env.APP_URL}:${process.env.APP_PORT}   🚀`);
}
