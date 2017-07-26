'use strict';
let express = require('express');
const db = require('../db/postgres/index');
let router = express.Router();

// Get all systems
router.get('/', (request, response, next) => {
    db.database.any('SELECT * FROM systems')
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

// Get a single system
router.get('/:id', (request, response, next) => {
    let systemID = parseInt(request.params.id);
    db.database.one('SELECT * FROM systems WHERE system_id = $1', systemID)
        .then((data) => {
        response.status(200)
            .json({
                status: 'success',
                data: data,
                message: 'Retrieved One System'
            });
        })
        .catch((err) => {
            return next(err);
        });
});

// Create a System
router.post('/', (request, response, next) => {
    db.database.none('INSERT INTO systems (name, acronym, active)' +
        'VALUES (${name}, ${acronym}, ${active})', request.body)
        .then(() => {
            response.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one system'
                });
        })
        .catch((err) => {
            return next(err);
        });
});

// Update System
router.put('/:id', (request, response, next) => {
    db.database.none('UPDATE systems SET name=$1, acronym=$2, active=$3 WHERE system_id = $4',
        [request.body.name, request.body.acronym, request.body.active, parseInt(request.params.id)])
        .then(() => {
            response.status(200)
                .json({
                    status: 'success',
                    message: 'Updated system'
                });
        })
        .catch((err) => {
            return next(err);
        });
});


// Delete System
router.delete('/:id', (request, response, next) => {
    let systemID = parseInt(request.params.id);
    db.database.result('DELETE FROM systems WHERE system_id = $1', systemID)
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

