const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
var winston = require('winston');
var expressWinston = require('express-winston');
var http = require('http');
var config = require('./config');


const app = express();

// Mongoose
mongoose.Promise = global.Promise;
// options set to true to avoid deprecation warnings
mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('successfully connected to database')
},
    error => {
        console.log("can't connect to database: " + error)
    }
)

// avoid MongoDB warning error
mongoose.set('useCreateIndex', true);


// middleware for treating request body as a json object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

//Middleware to log every request to the system
app.use(expressWinston.logger(config.winston_options));

// API
const api = require('./routes/auth.routes');
app.use('/api', api)

// Define PORT
const port = process.env.PORT || 8080;
http.createServer(app).listen(port, function(){
  console.log('Listening on port 8080');
});

// Express error handling
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});