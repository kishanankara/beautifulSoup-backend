let express = require('express')
//let request = require('request')
let routes = require('./routes/moods');
//let querystring = require('querystring')

let app = express()
let query = '';

let redirect_uri =
  process.env.REDIRECT_URI ||
  'http://localhost:8888/iamhome'

app.use(routes);
/*Endpoints
  - Calls from front end
*/


let port = process.env.PORT || 8888
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)
