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
var https_1 = __importDefault(require("https"));
var debug_1 = __importDefault(require("debug"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
console.log(process.env.NODE_ENV);
console.log(__dirname);
if (process.env.NODE_ENV === "DEV") {
    console.log("copyFileDefInDev");
    copyFileDefInDev();
}
else if (process.env.NODE_ENV === "PROD") {
    console.log("copyFileDefInProd");
    copyFileDefInProd();
}
var debug = debug_1.default.debug("server:server");
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || "3000");
console.log("process.env.PORT: " + process.env.PORT);
// app.set('port', port);
/**
 * Create HTTP server.
 */
var privateKey = fs_1.default.readFileSync(__dirname + "/../sslcert/selfsigned.key");
var certificate = fs_1.default.readFileSync(__dirname + "/../sslcert/selfsigned.crt");
var credentials = { key: privateKey, cert: certificate };
var server = https_1.default.createServer(credentials, new app_1.Server().app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function () {
    console.log("Server Express Connected At Port: " + port);
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
    console.log(__dirname);
    var src = path_1.default.join(__dirname, "/../src/Graphql/types");
    var build = path_1.default.join(__dirname, "/../build/src/Graphql/types");
    console.log(src);
    console.log(build);
    shell("mkdir -p " + build);
    shell("cp -r " + src + "/* " + build);
}
// Copy file Graphql TypeDef into Build(dist) folder in Prod Env
function copyFileDefInProd() {
    var shell = require("child_process").execSync;
    console.log(__dirname);
    var src = path_1.default.join(__dirname, "/../../src/Graphql/types");
    var build = path_1.default.join(__dirname, "/../src/Graphql/types");
    console.log(src);
    console.log(build);
    shell("mkdir -p " + build);
    shell("cp -r " + src + "/* " + build);
    src = path_1.default.join(__dirname, "/../../sslcert");
    build = path_1.default.join(__dirname, "/../sslcert");
    console.log("src");
    console.log(src);
    shell("mkdir -p " + build);
    shell("cp -r " + src + "/* " + build);
}
