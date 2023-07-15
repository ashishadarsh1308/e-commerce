const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json()); // to parse json data
app.use(cookieParser()); // to parse cookie data

// root import
const product = require('./routes/ProductRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);

module.exports = app;