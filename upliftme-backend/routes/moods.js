const express = require('express');
const router = express.Router();
const HappyTrack = require('../models/happyTrack');
const SadTrack = require('../models/sadTrack');
const ChillTrack = require('../models/chillTrack');
const AngryTrack = require('../models/angryTrack');

request = require('request')

let querystring = require('querystring')
let mood = '';
let uri = 'http://localhost:3000';
let redirect_uri = 'http://localhost:8888/iamhome';


//Routes to instigate the population of tracks into the database
router.get('/generateHappy', function(req,res){
  res.send("Hi! Trying to store some happy songs in a db?"); //placeholder to stop error
});



//Routes to populate one track in database (maybe)
router.post('/happyTracks', function(req,res){
  //creates a new track item in the db. returns a promise when complete
  HappyTrack.create(req.body).then(function(happyTrack){
    res.send(happyTrack);
  });
});


router.post('/sadTracks', function(req,res){
  SadTrack.create(req.body).then(function(sadTrack){
    res.send(sadTrack);
  });
});

router.post('/chillTracks', function(req,res){
  ChillTrack.create(req.body).then(function(chillTrack){
    res.send(chillTrack);
  });
});

router.post('/angryTracks', function(req,res){
  AngryTrack.create(req.body).then(function(angryTrack){
    res.send(angryTrack);
  });
});


//Routes to pull one track from database
router.get('/happyTracks', function(req,res){
  res.send({type: 'GET!'});
});

router.get('/sadTracks', function(req,res){
  res.send({type: 'GET'});
});

router.get('/chillTracks', function(req,res){
  res.send({type: 'GET'});
});

router.get('/angryTracks', function(req,res){
  res.send({type: 'GET'});
});



//Routes to update tracks in database (to mark as removed by setting available to false)
router.put('/happyTracks/:id',function(req,res){
  res.send({type: 'PUT'});
});

router.put('/sadTracks/:id',function(req,res){
  res.send({type: 'PUT'});
});

router.put('/chillTracks/:id',function(req,res){
  res.send({type: 'PUT'});
});

router.put('/angryTracks/:id',function(req,res){
  res.send({type: 'PUT'});
});


router.get('/secret/:mood', function(req,res){
  mood = req.params.mood;
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
    if(mood!==''){
      res.cookie('data', access_token, {maxAge: (58*60*60*1000)});
      console.log('The provided mood is: ',mood);
      res.redirect(uri+'/secretKey/'+mood+'/'+'auth');
    }
    else{
      console.log('Something went wrong in /iamhome');
      res.redirect(uri);
    }
  })
})

module.exports=router;
