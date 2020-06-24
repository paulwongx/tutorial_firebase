import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Firebase Admin SDK
let serviceAccount = require(`${process.cwd()}/service-account.json`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-684a9.firebaseio.com"
});


 import * as express from 'express';
 import * as cors from 'cors'; // express middleware allows you to intercept request and do something to it before doing something to the code
//const express = require('express');
//const cors = require('cors');

// Most basic HTTP function
// Sets up my own query endpoint at: http://localhost:5001/fir-684a9/us-central1/basicHTTP/
export const basicHTTP = functions.https.onRequest((request, response) => {
    const name = request.query.name;
    if (!name) {
        response.status(400).send('ERROR: You must supply a name :(');
    }
    response.send(`hello ${name}`);
});

// Custom Middleware
// const auth = (request, response, next) => {
//    if (!request.header.authorization) {
//        response.status(400).send('unauthorized');
//    }
//    next();
//}

// Multi-route ExpressJS HTTP Function
const app = express();
app.use(cors({origin: true})); // Applies this middleware for all requests instead of adding them manually to each request
// app.use(auth);

// Set up my own API endpoints at http://localhost:5001/fir-684a9/us-central1/api/

app.get('/cat', (request, response) => {
    response.send('CAT');
});

app.get('/dog', (request, response) => {
    response.send('DOG');
});

export const api = functions.https.onRequest(app);
