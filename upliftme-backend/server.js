let express = require('express')
let routes = require('./routes/moods');
let login = require('./routes/login');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

//let request = require('request')
//let querystring = require('querystring')


//set up express app
let app = express()


//connect to mongodb
mongoose.connect("mongodb://localhost/upliftmedb");
mongoose.Promise = global.Promise;


//initialize routes
app.use(routes);
app.use(login);


//listens for requests
let port = process.env.PORT || 8888
console.log(`Listening on port ${port}. Go to /login to initiate authentication flow.`)
app.listen(port)


// //old routing
// let query = '';
// let redirect_uri =
//   process.env.REDIRECT_URI ||
//   'http://localhost:8888/iamhome'
