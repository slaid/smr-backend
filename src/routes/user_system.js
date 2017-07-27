'use strict';
let express = require('express');
const db = require('../db/postgres/index');
let router = express.Router();

// Get all Users with Systems
router.get('/', (request, response, next) => {
    db.database.any('SELECT * FROM users_systems')
        .then((data) => {
            response.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all Users with Systems'
                });
        })
        .catch((err) => {
            return next(err);
        });
});


// Get a Single User_System

router.get('/:id', (request, response, next) => {
    let userSystemId = parseInt(request.params.id);
    db.database.one('SELECT * FROM users_systems WHERE users_systems_id = $1', userSystemId)
        .then((data) => {
            response.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved One User_System'
                });
        })
        .catch((err) => {
            return next(err);
        });
});













// Must check this and validate it..
// Delete User_System
router.delete('/:id', (request, response, next) => {
    let userSystemId = parseInt(request.params.id);
    db.database.result('DELETE FROM users_systems WHERE users_systems_id = $1', userSystemId)
        .then((result) => {
            response.status(200)
                .json({
                    status: 'success',
                    message: `Removed ${result.rowCount} system`
                });
        })
        .catch((err) => {
            return next(err);
        });
});

module.exports = router;