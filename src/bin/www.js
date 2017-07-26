#!/usr/bin/env node

/**
 * Module Dependencies
 */
'use strict';
let app = require('../app');
let debug = require('morgan');
let http = require('http');

/**
 * Get Port from environment and store in Express
 */
let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server
 */
let server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        // Named pipe
        return val;
    }
    if (port >= 0) {
        // Port Number
        return port;
    }
    return false;
}

/**
 * Event Listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    // Handle specific listen error with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EDDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}


/**
 * Event Listener for HTTP Server "listening" event
 */
function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'Pipe ' + addr : 'Port ' + addr.port;
    debug('Listening on ' + bind);
}
