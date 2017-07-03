'use strict';

const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const config = require('./config');
let DELAY = 0;

// Start an Express instance for the stub server
const app = express();
app.listen(config.port);

// Enable CORS: This is needed because the stub server runs on a different location than the frontend
app.use(cors());

// Enable JSON body parsing
app.use(bodyParser.json());

// Custom middleware. Feel free to add/remove, depending on your needs.
app.use(logMiddleware);
app.use(delayMiddleware);

// Attach the endpoints
const endpoints = require(path.join(process.cwd(), './stubs/endpoints'));
endpoints.attach(app);


/**
 * Logs all incoming requests.
 *
 * Note: this is server side logging. The client side logging can be found in ./client.js
 */
function logMiddleware(req, res, next) {
    console.log('[Incoming]', JSON.stringify({
        method: req.method,
        url: req.originalUrl,
        params: req.params,
        body: req.body
    }));

    next();
}

/**
 * Delays all incoming requests with 2 seconds.
 *
 * This is handy when testing loading states (e.g. spinners appear only if a request takes longer than 1 second),
 * without delaying all other HTTP traffic (e.g. frontend assets when throttling HTTP traffic in a web browser).
 */
function delayMiddleware(req, res, next) {
    console.log('[Delaying]', JSON.stringify({
        method: req.method,
        url: req.originalUrl,
        params: req.params,
        body: req.body
    }));

    setTimeout(function () {
        console.log('[Continuing]', JSON.stringify({
            method: req.method,
            url: req.originalUrl,
            params: req.params,
            body: req.body
        }));
        next();
    }, DELAY);
}