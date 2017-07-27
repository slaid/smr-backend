"use strict";
let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let pug = require('pug');
let index = require('./routes/index');
let users = require('./routes/users');
let tasks = require('./routes/tasks');
let systems = require('./routes/systems');
let user_system = require('./routes/user_system');
let task_type = require('./routes/task_type');
let action_type = require('./routes/action_type');
let absence_type = require('./routes/absence_type');
let timereport = require('./routes/timereport');

let app = express();

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extend: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// This enables cross Origin Requests
// Note: Don't use * for production unless really want to allow requests from anywhere.
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.use('/api', index);
app.use('/api/users', users);
app.use('/api/systems', systems);
app.use('/api/user_system', user_system);
// app.use('/api/tasks', tasks);
// app.use('/api/task_type', task_type);
// app.use('/api/action_type', action_type);


// Catch 404 and forward to error handler
app.use((request, response, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error Handlers

// Development Error Handler
// Will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, request, response, next) => {
        response.status(err.code || 500)
            .json({
                status: 'error',
                message: err
            });
    });
}

// Production Error Handler
// No Stacktrackes leaked to user
app.use((err, request, response, next) => {
    response.status(err.status || 500)
        .json({
            status: 'error',
            message: err.message
        });
});

module.exports = app;
