const express = require('express');

const app = express();
app.use(express.json()); // to parse json data

// root import
const product = require('./routes/ProductRoute');
const user = require('./routes/userRoute');

app.use('/api/v1', product);
app.use('/api/v1', user);

module.exports = app;