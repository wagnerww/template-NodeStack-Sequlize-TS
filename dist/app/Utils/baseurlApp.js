"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseURL = process.env.APP_URL;
const port = process.env.APP_PORT;
const url = `${baseURL}:${port}`;
exports.default = url;
