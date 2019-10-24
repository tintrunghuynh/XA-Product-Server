"use strict";
import express from "express";
import mongoose from "mongoose";
import createError from "http-errors";
import * as indexRouter from "./routes/index";
import * as usersRouter from "./routes/users";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import graphqlHTTP from "express-graphql";
import cors from "cors";
import { schema } from "./Graphql/indexSchema";
export class Server {

    public app: express.Application;


    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        console.log("bootstrap");
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        // Create a new express application instance
        this.app = express();

        // configure application
        this.config();

        // configure routes
        this.routes();
    }

    config() {
        // connect to db
        let dbURI = process.env.MONGODB_URL;
        dbURI = "mongodb://adm:35351235@127.0.0.1:27017/XA-Product";
        // dbURI = "mongodb+srv://CRUD:113355135@xa-product-dvtj7.mongodb.net/XA-Product?retryWrites=true&w=majority";

        let statusAutoIndex = true;
        if (process.env.NODE_ENV === "PROD") {
            // dbURI = process.env.MONGODB_P_URL;
            dbURI = "mongodb+srv://CRUD:113355135@xa-product-dvtj7.mongodb.net/XA-Product?retryWrites=true&w=majority";
            statusAutoIndex = false;
        }

        console.log("dbURI: " + dbURI);

        this.app.get("/", (req, res, next) => {
            // console.log("get");
            res.send(`
            <h1> Welcome to Express with TS </h1>
            <h2> Hosted by Heroku </h2>
            <a href = "/graphql-retrieve" style = "text-decoration:none; color: #33334d" > Click to come to GraphiQL </a>\
            <p>dbURI: ${dbURI}</p>
            `);
        });

        mongoose.connect(Object(dbURI).toString(), {
            useNewUrlParser: true,
            useCreateIndex: statusAutoIndex,
            autoIndex: statusAutoIndex,
            useFindAndModify: false,
            useUnifiedTopology: true,
        }, (err): void => {
            // console.log(mongoose.connections);
            console.log("Connected into DB: " + dbURI);
        }).catch(error => {
            console.log("Error occured");
            console.log(error);
        });


        // view engine setup
        // this.app.set("views", path.join(__dirname, "views"));
        // this.app.set("view engine", "jade");

        this.app.use(logger("dev"));

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, "public")));

        // favicon
        // this.app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

        // catch 404 and forward to error handler
        this.app.use((req, res, next) => {
            // console.clear();
            console.log(req.path);
            // Exception for checking GraphQL using GraphiQL
            if (req.path.includes("/graphql-retrieve")) {
                next();
            } else if (req.path.includes("/favicon.ico")) {
                this.app.get('/favicon.ico', (req, res) => res.status(204));
                next();
            } else {
                res.send(`
                    < h1 > Error - 404 < /h1>
                    < h2 > Page Not Found < /h2>

                        `);
                next(createError(404));
            }
        });

        // error handler
        this.app.use((err: any, req: any, res: any, next: any) => {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") === "DEV" ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render("error");
        });

        // /////////////////////////////
        // /* Instlal GraphQL Modules and Dependencies */

        // var corsOptions = {
        //   origin: 'http://localhost:4200',
        //   credentials: true // <-- REQUIRED backend setting
        // // };
        this.app.use("*", cors());

        this.app.use("/graphql-retrieve", graphqlHTTP({
            schema: schema(),
            rootValue: global,
            graphiql: true,
            context: async ({ req, connection }: any) => {
                if (connection) {
                    // Check connection for metadata
                    return connection.context;
                } else {
                    // check from req
                    const token = req.headers.authorization || "";
                    return { token };
                }
            }
        }));


    }

    routes() {
        this.app.use("/", indexRouter.router);
        this.app.use("/users", usersRouter.router);
    }
}