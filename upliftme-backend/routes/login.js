const express = require('express');
const router = express.Router();
let Happy = require('../models/happyTrack');
let Angry = require('../models/angryTrack');
const fetch = require('node-fetch');
let Sad = require('../models/sadTrack');
let Chill = require('../models/chillTrack');

request = require('request')

let querystring = require('querystring')
let uri = 'http://localhost:3000';
let redirect_uri = 'http://localhost:8888/logger';
var N = 10; // max size of playlist to be rendered on screen
const TARGET_PLAYLIST_SIZE = 50;

router.get('/login', function(req,res){
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri
    }))
})

var access_token;
var data_ret;
var tracks_ret;
var happy_list;

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
    access_token = body.access_token

      //console.log('Something went wrong in gucci');
      console.log(access_token);
            //res.redirect(uri);
            var count=0;
              Happy.count().exec((err, counter) => {

                if (counter >0) {
                      count = counter;
                      return;
                }
                else{
                      populateDatabase('happy');
                } //else statement ends here
              });

              Angry.count().exec((err, counter) => {

                if (counter >0) {
                      count = counter;
                      return;
                }
                else{
                      populateDatabase('angry');
                } //else statement ends here
              });

              Sad.count().exec((err, counter) => {

                if (counter >0) {
                      count = counter;
                      return;
                }
                else{
                      populateDatabase('sad');
                } //else statement ends here
              });

              Chill.count().exec((err, counter) => {

                if (counter >0) {
                      count = counter;
                      return;
                }
                else{
                      populateDatabase('chill');
                } //else statement ends here
              });


       // console.log(data_ret);
  })
})

function populateDatabase(mood)
{
  var query=mood;
  var uri = 'https://api.spotify.com/v1/search?q=' + query + '&type=playlist&limit=25';
  fetch(uri,{
    headers: {'Authorization': 'Bearer ' + access_token}
  })
  .then(response => response.json())
  .then((data) =>{
    data_ret=data;
    var chosenPlaylistIndex = findLargePlaylist(data_ret);
    fetch(data_ret.playlists.items[chosenPlaylistIndex].tracks.href,{
      headers: {'Authorization': 'Bearer ' + access_token}
    })
    .then(response => response.json())
    .then((tracks) =>{
        tracks_ret = tracks;
        list_mood=pruneTracksList(tracks_ret);
        console.log("We are printing it here");
        final_list = happyJson(list_mood);
        console.log(list_mood);
        if(query == 'happy')
        {
        const happy_moods = new Happy({

                            mood: 'Happy',
                            data: final_list
        });
        Happy.create(happy_moods, (error)=>{
          if(!error){

          }
          else{
            console.log(error);
          }
        })
        }

        if(query == 'angry')
        {
        const angry_moods = new Angry({

                            mood: 'Angry',
                            data: final_list
        });
        Angry.create(angry_moods, (error)=>{
          if(!error){

          }
          else{
            console.log(error);
          }
        })
        }

        if(query == 'sad')
        {
        const sad_moods = new Sad({

                            mood: 'Sad',
                            data: final_list
        });
        Sad.create(sad_moods, (error)=>{
          if(!error){

          }
          else{
            console.log(error);
          }
        })
        }

        if(query == 'chill')
        {
        const chill_moods = new Chill({

                            mood: 'Chill',
                            data: final_list
        });
        Chill.create(chill_moods, (error)=>{
          if(!error){

          }
          else{
            console.log(error);
          }
        })
        }



    } );
  })
}

function happyJson(list)
{
  var size = list.length;
  var return_array = [];
    for(var i=0;i<size;i++)
    {
      var artists=[];
      for(var j=0;j<list[i].track.artists.length;j++)
      {
        artists.push(list[i].track.artists[j].name);
      }
      var JSON = {
          _id : list[i].track.id,
          preview_url : list[i].track.preview_url,
          cover : list[i].track.album.images[0].url,
          title : list[i].track.name,
          artist : artists,
          probability : '1'
      }
      return_array.push(JSON);
    }
  return return_array;

}
function pruneTracksList(tracks){
  //console.log('Tracks list before pruning: ',tracks);
  //console.log('Num tracks before pruning: ', tracks.items.length);

  if(!tracks.items)
  {
    //console.log("This list of tracks has no tracks!");
    return [];
  }

  var trackList = [];
  for(var i=0; i<tracks.items.length; i++){
    if(processTrack(tracks.items[i])){
      trackList.push(tracks.items[i]);
      //console.log('Item ',i+1);
    }
  }

  // var n = 10;
  if(trackList.length < N){
    N = trackList.length;
  }

  // console.log('Length of processed tracklist is currently: ',trackList.length);
  // console.log('Tracklist before choosing 10: ',trackList);
  // console.log(trackList.length);
  // console.log('First song on tracklist: ', trackList[0]);
  // console.log('Length of processed trackList will be: ',N);
  //

  //choose n songs randomly before returning
  return chooseNSongs(N, trackList);
}

function chooseNSongs(n, list){
    let listOfNSongs=[];
    var range = list.length;

    for(var i=0; i<n; i++){
      //Choose random index from current range
      var indexOfRandomTrack = generateRandomNumber(0,range-1);
    //  console.log('Index chosen: ', indexOfRandomTrack);
      //Decrement range
      range--;
      //Remove chosen song at this index and add to list of chosen songs
    //  console.log('**List before splice: ',list);
      let arrayWithRemovedValue = list.splice(indexOfRandomTrack,1);
    //  console.log('**List after splice: ', list);

      listOfNSongs.push(arrayWithRemovedValue[0]);
    }

    // console.log('============');
    // console.log('List of n songs: ',listOfNSongs);
    return listOfNSongs;
  }

function findLargePlaylist(list)
{
  var largePlaylistCounter = 0;
    // var TARGET_PLAYLIST_SIZE = 50;
    var largestPlaylist = 0;

    //console.log('SCANNING PLAYLISTS');
    //Scan list of playlists and store all with >=50 songs
    for(var i=0; i<list.playlists.items.length; i++){

      //Track largest playlist found just in case none are greater than TARGET_PLAYLIST_SIZE
      if(list.playlists.items[i].tracks.total > largestPlaylist){
        largestPlaylist = list.playlists.items[i].tracks.total;
      }

      if(list.playlists.items[i].tracks.total >= TARGET_PLAYLIST_SIZE){
        largePlaylistCounter++;
        //arrayTracker.push(i);
      }
    }

    //If no playlists of size TARGET_PLAYLIST_SIZE, return index of largest playlist
    // if(arrayTracker.length === 0){
    //   return largestPlaylist;
    // }
    if(largePlaylistCounter === 0){
      return largestPlaylist;
    }
    else{
      //Return random index from array of large-enough songs
      //var randomIndex = this.generateRandomNumber(0,arrayTracker.length-1);
      var randomIndex = generateRandomNumber(0,largePlaylistCounter-1);
      // console.log('Random playlist index chosen: ',randomIndex);
      // console.log('Random playlist size: ',list.playlists.items[randomIndex].tracks.total);

      return randomIndex;
    }
}

function generateRandomNumber(min,max_inclusive)
{
  return Math.floor(Math.random()*(max_inclusive-min+1)+min);
}

function processTrack(trackItem){

       //let image = trackItem.track.album.images[0].url;
       let prev_url = trackItem.track.preview_url;


       if(!prev_url){
        //  console.log("No preview url!");
          return false;
       }

       if(!trackItem.track.album){
        //  console.log("No album!");
          return false;
       }

       if(!trackItem.track.album.images[0]){
        //  console.log("No album images!");
          return false;
       }
       if(!trackItem.track.album.images[0].url){
        //  console.log("No url for album image!");
          return false;
       }
       return true;

  }
 module.exports=router;
