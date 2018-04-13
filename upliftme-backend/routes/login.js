const express = require('express');
const router = express.Router();


request = require('request')

let querystring = require('querystring')
let uri = 'http://localhost:3000';
let redirect_uri = 'http://localhost:8888/logger';


router.get('/login', function(req,res){
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri
    }))
})

router.get('/logger', function(req, res) {
  let code = req.query.code || 'shit'
  console.log(code);
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token

      console.log('Something went wrong in gucci');
      res.redirect(uri);

  })
})

module.exports=router;
