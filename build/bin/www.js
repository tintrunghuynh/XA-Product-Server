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
var debug = debug_1.default.debug("server:server");
/**
 * Get port from environment and store in Express.
 */
// const port = normalizePort(process.env.PORT || "5000");
/**
 * Create HTTPS server.
 */
// const privateKey = fs.readFileSync(__dirname + "/../sslcert/selfsigned.key");
// const certificate = fs.readFileSync(__dirname + "/../sslcert/selfsigned.crt");
// const credentials = { key: privateKey, cert: certificate };
// const server = https.createServer(credentials, new Server().app);
/**
 * Create HTTP server.
 */
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
