#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
// import * as app from '../app';
// import http from 'http';
var app_1 = require("../src/app");
var http_1 = __importDefault(require("http"));
var debug_1 = __importDefault(require("debug"));
var path_1 = __importDefault(require("path"));
console.log("__dirname: " + __dirname);
console.log("Environment: " + process.env.NODE_ENV);
// if (process.env.NODE_ENV === "DEV") {
//     console.log("copyFileDefInDev");
//     copyFileDefInDev();
// } else if (process.env.NODE_ENV === "PROD") {
//     console.log("copyFileDefInProd");
//     copyFileDefInProd();
// }
var debug = debug_1.default.debug("server:server");
/**
 * Get port from environment and store in Express.
 */
// const port = normalizePort(process.env.PORT || "5000");
/**
 * Create HTTP server.
 */
// const privateKey = fs.readFileSync(__dirname + "/../sslcert/selfsigned.key");
// const certificate = fs.readFileSync(__dirname + "/../sslcert/selfsigned.crt");
// const credentials = { key: privateKey, cert: certificate };
// const server = https.createServer(credentials, new Server().app);
var server = http_1.default.createServer(new app_1.Server().app);
/**
 * Listen on provided port, on all network interfaces.
 */
var port = process.env.PORT || 8080;
server.listen(port, function () {
    console.log("Server Express Connected At Port: " + (process.env.PORT || 8080));
});
server.on("error", onError);
server.on("listening", onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var PORT = parseInt(val, 10);
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
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = typeof port === "string"
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
    var addr = server.address();
    var bind;
    if (addr) {
        bind = typeof addr === "string"
            ? "pipe " + addr
            : "port " + addr.port;
    }
    debug("Listening on " + bind);
}
// Copy file Graphql TypeDef into Build(dist) folder in Dev Env
function copyFileDefInDev() {
    var shell = require("child_process").execSync;
    var src = path_1.default.join(__dirname, "/../src/Graphql/types");
    var build = path_1.default.join(__dirname, "/../build/src/Graphql/types");
    console.log("From\t: " + src);
    console.log("To\t: " + build + "\n");
    shell("mkdir -p " + build);
    shell("cp -r " + src + "/* " + build);
}
// Copy file Graphql TypeDef into Build(dist) folder in Prod Env
function copyFileDefInProd() {
    var shell = require("child_process").execSync;
    var src = path_1.default.join(__dirname, "/../../src/Graphql/types");
    var build = path_1.default.join(__dirname, "/../src/Graphql/types");
    shell("mkdir -p " + build);
    shell("cp -r " + src + "/* " + build);
    console.log("\nFrom\t: " + src);
    console.log("To\t: " + build + "\n");
    src = path_1.default.join(__dirname, "/../../sslcert");
    build = path_1.default.join(__dirname, "/../sslcert");
    shell("mkdir -p " + build);
    shell("cp -r " + src + "/* " + build);
    console.log("From\t: " + src);
    console.log("To\t: " + build + "\n");
}
