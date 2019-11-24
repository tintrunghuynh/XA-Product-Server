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



const debug = Debug.debug("server:server");
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
const server = http.createServer(new Server().app);

/**
 * Listen on provided port, on all network interfaces.
 */
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Server Express Connected At Port: ${process.env.PORT || 8080}`);

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
    // setInterval(function () {
    //     console.log("Prevent the HerokuApp from going to sleep.");
    //     http.get("http://xaproductserver.herokuapp.com/");
    // }, 300000);
}

