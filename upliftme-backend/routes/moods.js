const express = require('express');
const router = express.Router();
let request = require('request')
//let querystring = require('querystring')
let querystring = require('querystring')
let query = '';

let redirect_uri =
  process.env.REDIRECT_URI ||
  'http://localhost:8888/iamhome'

/*Endpoints
  - Calls from front end
  
*/


router.get('/login', function(req, res) {
  query = '';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri
    }))
})

router.get('/Happy', function(req, res) {
  query = 'Happy';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri
    }))
})

router.get('/Angry', function(req, res) {
  query = 'Angry';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri
    }))
})

router.get('/Sad', function(req, res) {
  console.log("Sad was clicked!");
  query = 'Sad';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri
    }))
})

router.get('/Chill', function(req, res) {
  query = 'Chill';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri
    }))
})

/*
   At this point spotify sends a code to a REDIRECT_URI specified in the Spotify app in developers.
   This function listens for it and then sends SECRET and then spotify responds with access token.
   The access_token is then sent to the front end.
*/
router.get('/iamhome', function(req, res) {
  let code = req.query.code || null
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
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000/auth/'
    if(query!='')
    {
    res.redirect(uri + query + '?access_token=' + access_token)
    }
    else {
      res.redirect(uri);
    }
  })
})

module.exports=router;
