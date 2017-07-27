'use strict';
let express = require('express');
const db = require('../db/postgres/index');
let router = express.Router();

// Get all users
router.get('/', (request, response, next) => {
    db.database.any('SELECT * FROM users')
        .then((data) => {
            response.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL users'
                });
        })
        .catch((err) => {
            return next(err);
        });
});

// Get a single user
router.get('/:id', (request, response, next) => {
    let userID = parseInt(request.params.id);
    db.database.one('SELECT * FROM users WHERE user_id = $1', userID)
        .then((data) => {
            response.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved One User'
                });
        })
        .catch((err) => {
            return next(err);
        });
});

// Create a User
router.post('/', (request, response, next) => {
    db.database.none('INSERT INTO users (first_name, last_name, email, username)' +
        'VALUES (${first_name}, ${last_name}, ${email}, ${username})', request.body)
        .then(() => {
            response.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one user'
                });
        })
        .catch((err) => {
            return next(err);
        });
});


// Update User
router.put('/:id', (request, response, next) => {
    db.database.none('UPDATE users SET first_name=$1, last_name=$2, email=$3, username=$4 WHERE user_id = $5',
        [request.body.first_name, request.body.last_name, request.body.email, request.body.username, parseInt(request.params.id)])
        .then(() => {
            response.status(200)
                .json({
                    status: 'Success',
                    message: 'Updated user'
                });
        })
        .catch((err) => {
            return next(err);
        });
});

// Delete User
router.delete('/:id', (request, response, next) => {
    let userID = parseInt(request.params.id);
    db.database.result('DELETE FROM users WHERE user_id = $1', userID)
        .then((result) => {
            response.status(200)
                .json({
                    status: 'success',
                    message: `Removed ${result.rowCount} user`
                });
        })
        .catch((err) => {
            return next(err);
        });
});


// Deactivate User
router.put('/:id/deactivate', (request, response, next) => {
    let userID = parseInt(request.params.id);
    db.database.none('UPDATE users SET active=false WHERE user_id=$1',
        userID)
        .then(() => {
            response.status(200)
                .json({
                    status: 'success',
                    message: `User ${userID} has been deactivated`
                });
        })
        .catch((err) => {
            return next(err);
        });

});

// Activate User
router.put('/:id/activate', (request, response, next) => {
    let userID = parseInt(request.params.id);
    db.database.none('UPDATE users SET active=true WHERE user_id=$1',
        request.params.id)
        .then(() => {
            response.status(200)
                .json({
                    status: 'success',
                    message: `User ${userID} has been activated`
                });
        })
        .catch((err) => {
            return next(err);
        });

});


module.exports = router;