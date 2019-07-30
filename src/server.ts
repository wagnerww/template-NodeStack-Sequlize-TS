require("dotenv").config({});
import * as express from "express";
import * as validator from "express-validation";
import * as Youch from "youch";
//const Sentry = require("@sentry/node");
//const sentryConfig = require("./config/sentry");
import * as path from "path";
import * as cors from "cors";

//const responseHandler = require("./app/Middlewares/responseHandler");

class App {
  public express: express.Application;

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
    this.express.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "tmp"))
    );

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

    this.express.use(async (err, req, res, next) => {
      //Erro de validação
      if (err instanceof validator.ValidationError) {
        return res.status(err.status).json(err);
      }

      if (process.env.NODE_ENV != "production") {
        const youch = new Youch(err);
        const json = await youch.toJSON();
        res.json(json);
      }

      //Erros gerais da pp
      return res
        .status(err.status || 500)
        .json({ error: "Internal server erro" });
    });
  }

  /* sentry() {
    Sentry.init(sentryConfig);
  }*/
}
export default new App().express;
