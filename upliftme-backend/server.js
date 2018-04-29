const express = require('express');
let mood_routes = require('./routes/moods');
let login_routes = require('./routes/login');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let app = express();

//let request = require('request')
//let querystring = require('querystring')


//set up express app


//connect to mongodb
mongoose.connect("mongodb://localhost/upliftdb");
mongoose.Promise = global.Promise;




//initialize routes
app.use(login_routes);
app.use(mood_routes);




//listens for requests
let port = process.env.PORT || 8888
console.log(`Listening on port ${port}. Go to /login to initiate authentication flow.`)
app.listen(port)


// //old routing
// let query = '';
// let redirect_uri =
//   process.env.REDIRECT_URI ||
//   'http://localhost:8888/iamhome'
