"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({});
const express = require("express");
const validator = require("express-validation");
const Youch = require("youch");
//const Sentry = require("@sentry/node");
//const sentryConfig = require("./config/sentry");
const path = require("path");
const cors = require("cors");
//const responseHandler = require("./app/Middlewares/responseHandler");
class App {
    constructor() {
        this.express = express();
        // this.isDec = process.env.NODE_ENV != "production";
        //this.sentry();
        this.middlewares();
        this.routes();
        //this.exception();
    }
    middlewares() {
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));
        // this.express.use(Sentry.Handlers.requestHandler());
    }
    routes() {
        this.express.use(require("./routes"));
        // this.express.use(responseHandler);
    }
    exception() {
        if (process.env.NODE_ENV === "production") {
            //this.express.use(Sentry.Handlers.errorHandler());
        }
        this.express.use((err, req, res, next) => __awaiter(this, void 0, void 0, function* () {
            //Erro de validação
            if (err instanceof validator.ValidationError) {
                return res.status(err.status).json(err);
            }
            if (process.env.NODE_ENV != "production") {
                const youch = new Youch(err);
                const json = yield youch.toJSON();
                res.json(json);
            }
            //Erros gerais da pp
            return res
                .status(err.status || 500)
                .json({ error: "Internal server erro" });
        }));
    }
}
exports.default = new App().express;
