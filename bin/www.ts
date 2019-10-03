#!/usr/bin/env node
"use strict";
/**
 * Module dependencies.
 */
// import * as app from '../app';
// import http from 'http';
import { Server } from "../src/app";
import https from "https";
import http from "http";
import Debug from "debug";
import path from "path";
import fs from "fs";

console.log(process.env.NODE_ENV);


console.log(__dirname);
if (process.env.NODE_ENV === "DEV") {
    console.log("copyFileDefInDev");
    copyFileDefInDev();
} else if (process.env.NODE_ENV === "PROD") {
    console.log("copyFileDefInProd");
    copyFileDefInProd();
}

const debug = Debug.debug("server:server");
/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "3000");
console.log("process.env.PORT: " + process.env.PORT);
// app.set('port', port);

/**
 * Create HTTP server.
 */
// const privateKey = fs.readFileSync(__dirname + "/../sslcert/selfsigned.key");
// const certificate = fs.readFileSync(__dirname + "/../sslcert/selfsigned.crt");
// const credentials = { key: privateKey, cert: certificate };
// const server = https.createServer(credentials, new Server().app);
const server = http.createServer(new Server().app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => {
    console.log(`Server Express Connected At Port: ${port}`);

});

server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string): any {
    const PORT = parseInt(val, 10);

    if (isNaN(PORT)) {
        // named pipe
        return val;
    }

    if (PORT >= 0) {
        // PORT number
        return PORT;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    let bind;
    if (addr) {
        bind = typeof addr === "string"
            ? "pipe " + addr
            : "port " + addr.port;

    }
    debug(`Listening on ${bind}`);
}

// Copy file Graphql TypeDef into Build(dist) folder in Dev Env
function copyFileDefInDev() {
    const shell = require("child_process").execSync;
    console.log(__dirname);
    const src = path.join(__dirname, "/../src/Graphql/types");
    const build = path.join(__dirname, "/../build/src/Graphql/types");
    console.log(src);
    console.log(build);
    shell(`mkdir -p ${build}`);
    shell(`cp -r ${src}/* ${build}`);
}
// Copy file Graphql TypeDef into Build(dist) folder in Prod Env
function copyFileDefInProd() {
    const shell = require("child_process").execSync;
    console.log(__dirname);
    let src = path.join(__dirname, "/../../src/Graphql/types");
    let build = path.join(__dirname, "/../src/Graphql/types");
    console.log(src);
    console.log(build);
    shell(`mkdir -p ${build}`);
    shell(`cp -r ${src}/* ${build}`);
    src = path.join(__dirname, "/../../sslcert");
    build = path.join(__dirname, "/../sslcert");
    console.log("src");
    console.log(src);
    shell(`mkdir -p ${build}`);
    shell(`cp -r ${src}/* ${build}`);
}

