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
        dbURI = "mongodb+srv://CRUD:113355135@xa-product-dvtj7.mongodb.net/all?retryWrites=true&w=majority";
        console.log("Using this URL, Express will connect to mongoDB. dbURI: " + process.env.MONGODB_URL);

        let statusAutoIndex = true;
        if (process.env.NODE_ENV === "production") {
            dbURI = process.env.MONGODB_P_URL;
            dbURI = "mongodb+srv://CRUD:113355135@xa-product-dvtj7.mongodb.net/all?retryWrites=true&w=majority";
            statusAutoIndex = false;
        }

        this.app.get("/", (req, res) => {
            res.send("Hello World! Ts server!");
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
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "jade");

        this.app.use(logger("dev"));

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, "public")));

        // catch 404 and forward to error handler
        this.app.use((req, res, next) => {
            // Exception for checking GraphQL using GraphiQL
            if (req.path.includes("/graphql-retrieve")) {
                next();
            } else {
                next(createError(404));
            }
        });

        // error handler
        this.app.use((err: any, req: any, res: any, next: any) => {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get("env") === "development" ? err : {};

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