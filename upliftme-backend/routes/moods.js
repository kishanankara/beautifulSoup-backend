const express = require('express');
const router = express.Router();
const HappyTrack = require('../models/happyTrack');
const SadTrack = require('../models/sadTrack');
const ChillTrack = require('../models/chillTrack');
const AngryTrack = require('../models/angryTrack');
var ObjectID = require('mongodb').ObjectID;

var N = 10; //Number of tracks to pass to front end
let mood = '';
let uri = 'http://localhost:3000';


router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//Routes to return playlists from database
router.get('/generateHappy', function(req,res,next){
  //Grab a track here and send the json info back via res.send()
  HappyTrack.find({},function(err,docs){
    
    if(err) throw err;
    let trackList = generateTrackList(docs);
    var JSON = {
      numTracks : trackList.length,
      data : trackList
    }
    res.send(JSON);
  })
});

router.get('/generateSad', function(req,res){
  //Grab a track here and send the json info back via res.send()
  SadTrack.find({},function(err,docs){
    
    if(err) throw err;
    let trackList = generateTrackList(docs);
    var JSON = {
      numTracks : trackList.length,
      data : trackList
    }
    res.send(JSON);
  })
});

router.get('/generateAngry', function(req,res){
  //Grab a track here and send the json info back via res.send()
  AngryTrack.find({},function(err,docs){
    
    if(err) throw err;
    let trackList = generateTrackList(docs);
    var JSON = {
      numTracks : trackList.length,
      data : trackList
    }
    res.send(JSON);
  })
});

router.get('/generateChill', function(req,res){
  //Grab a track here and send the json info back via res.send()
  ChillTrack.find({},function(err,docs){
    
    if(err) throw err;
    let trackList = generateTrackList(docs);
    var JSON = {
      numTracks : trackList.length,
      data : trackList
    }
    res.send(JSON);
  })
});







//Routes to update tracks in database (to mark as removed by setting available to false)
router.put('/happyTracks/:id',function(req,res,next){  
  var id = req.params.id;
  console.log('id is: ',id);

  HappyTrack.find({},function(err,doc){
    if(err) throw err;
    //Loop through all entries in data array looking for provided id
      //When found, check probability point value
        //Do not increase past 10

    var indexOfUpdate = -1;
    var probValue = -1;
    for(var i=0; i<doc[0].data.length;i++){
      // console.log('_id found: ',doc[0].data[i]._id);
      if(id===doc[0].data[i]._id){
        // console.log('*InPost: FOUND ID in db!');
        probValue = doc[0].data[i].probability;
        // console.log('total_prob_points: ',doc[0].data[0].artist);
        // console.log('*InPost: thisProbValue is: ',probValue);
        if(probValue<10){
          indexOfUpdate=i;
          doc[0].data[i].probability = probValue+1;
          console.log('Updated probVal: ',doc[0].data[i].probability);
          doc[0].data[0].artist = doc[0].data[0].artist+1;
          console.log('Updated total_prob_points: ',doc[0].data[0].artist);
          break;
        }
      }
    }
    //Put doc back in db
    var docZeroID = {
      _id: new ObjectID(doc[0]._id)
    };
    console.log('docZeroID: ',docZeroID);
    if(indexOfUpdate!==-1){
      HappyTrack.update({_id:docZeroID},{data:doc[0].data},(err,results)=>{
        if(err) throw err;
      });
    }
  });
  res.send({type: 'PUT'});
});

router.put('/sadTracks/:id',function(req,res){
  var id = req.params.id;
  console.log('id is: ',id);

  SadTrack.find({},function(err,doc){
    if(err) throw err;
    //Loop through all entries in data array looking for provided id
      //When found, check probability point value
        //Do not increase past 10
    var indexOfUpdate = -1;
    var probValue = -1;
    for(var i=0; i<doc[0].data.length;i++){
      if(id===doc[0].data[i]._id){
        probValue = doc[0].data[i].probability;
        if(probValue<10){
          indexOfUpdate=i;
          doc[0].data[i].probability = probValue+1;
          console.log('Updated probVal: ',doc[0].data[i].probability);
          doc[0].data[0].artist = doc[0].data[0].artist+1;
          console.log('Updated total_prob_points: ',doc[0].data[0].artist);
          break;
        }
      }
    }
    //Put doc back in db
    var docZeroID = {
      _id: new ObjectID(doc[0]._id)
    };
    console.log('docZeroID: ',docZeroID);
    if(indexOfUpdate!==-1){
      SadTrack.update({_id:docZeroID},{data:doc[0].data},(err,results)=>{
        if(err) throw err;
      });
    }
  });
  res.send({type: 'PUT'});
});

router.put('/chillTracks/:id',function(req,res){
  var id = req.params.id;
  console.log('id is: ',id);

  ChillTrack.find({},function(err,doc){
    if(err) throw err;
    //Loop through all entries in data array looking for provided id
      //When found, check probability point value
        //Do not increase past 10
    var indexOfUpdate = -1;
    var probValue = -1;
    for(var i=0; i<doc[0].data.length;i++){
      if(id===doc[0].data[i]._id){
        probValue = doc[0].data[i].probability;
        if(probValue<10){
          indexOfUpdate=i;
          doc[0].data[i].probability = probValue+1;
          console.log('Updated probVal: ',doc[0].data[i].probability);
          doc[0].data[0].artist = doc[0].data[0].artist+1;
          console.log('Updated total_prob_points: ',doc[0].data[0].artist);
          break;
        }
      }
    }
    //Put doc back in db
    var docZeroID = {
      _id: new ObjectID(doc[0]._id)
    };
    console.log('docZeroID: ',docZeroID);
    if(indexOfUpdate!==-1){
      ChillTrack.update({_id:docZeroID},{data:doc[0].data},(err,results)=>{
        if(err) throw err;
      });
    }
  });
  res.send({type: 'PUT'});
});

router.put('/angryTracks/:id',function(req,res){
  var id = req.params.id;
  console.log('id is: ',id);

  AngryTrack.find({},function(err,doc){
    if(err) throw err;
    //Loop through all entries in data array looking for provided id
      //When found, check probability point value
        //Do not increase past 10
    var indexOfUpdate = -1;
    var probValue = -1;
    for(var i=0; i<doc[0].data.length;i++){
      if(id===doc[0].data[i]._id){
        probValue = doc[0].data[i].probability;
        if(probValue<10){
          indexOfUpdate=i;
          doc[0].data[i].probability = probValue+1;
          console.log('Updated probVal: ',doc[0].data[i].probability);
          doc[0].data[0].artist = doc[0].data[0].artist+1;
          console.log('Updated total_prob_points: ',doc[0].data[0].artist);
          break;
        }
      }
    }
    //Put doc back in db
    var docZeroID = {
      _id: new ObjectID(doc[0]._id)
    };
    console.log('docZeroID: ',docZeroID);
    if(indexOfUpdate!==-1){
      AngryTrack.update({_id:docZeroID},{data:doc[0].data},(err,results)=>{
        if(err) throw err;
      });
    }
  });
  res.send({type: 'PUT'});
});










//HELPER FUNCTIONS
function generateTrackList(docs){
  //Convert raw db response to a collection entry (form: array with total_prob_points followed by tracks)
  collectionEntry = getCollectionEntry(docs);
  console.log('collectionEntry: ',collectionEntry);

  //Identify the total_prob_points in the entry
  total_prob_points = collectionEntry[0].artist;
  console.log('total_prob_points: ',total_prob_points);

  //Generate sorted list of N random numbers between 1 and total_prob_points (inclusive)
  let randomNumberSet = new Set();
  console.log('ValueOfN: ',N);
  console.log('sizeOfRandomNumberSet: ',randomNumberSet.size);
  while(randomNumberSet.size<N){
    randomNumberSet.add(generateRandomNumber(1,total_prob_points));
    console.log('curRandNumSet: ',randomNumberSet.keys);
  }
  console.log('randomNumberSet: ',randomNumberSet);
  let probabilityPointArray = Array.from(randomNumberSet);
  console.log('probabilityPointArray: ',probabilityPointArray);
  probabilityPointArray.sort(function(a,b){return a-b});
  console.log('probabilityPointArray_SORTED: ',probabilityPointArray);


  //Initialize running total points encountered
  runningProbPointTotal = 0;

  //Initialize trackList
  var trackList = [];

  //For each track in collectionEntry: 
      //(1) Add 'probability' to running total 
      //(2) add track to trackList if its probability value makes runningTotal >= target from randomNumberList
      //Special note: if runningTotal is already > target value before adding next track's 'probability', keep same behavior. Add 'probability' and then add track
  var lastIndex = collectionEntry.length-1;
  var index = 1; //Skips metadata entry at index 0
  while(trackList.length < N || runningProbPointTotal<total_prob_points || index<=lastIndex){
    thisEntry = collectionEntry[index];
    thisProb = thisEntry.probability;
    runningProbPointTotal += thisProb;
    if(runningProbPointTotal>=probabilityPointArray[trackList.length] && thisProb!==0){
      trackList.push(thisEntry);
    }
    index++;
  }
  console.log('trackList: ',trackList);
  //shuffle trackList
  shuffleArray(trackList);
  console.log('trackList post shuffle: ',trackList);
  //Return trackList
  return trackList;
}

function shuffleArray(array) {
    //Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getCollectionEntry(docs){
  return docs[0].data;
}


function generateRandomNumber(min,max_inclusive) {
  return Math.floor(Math.random()*(max_inclusive-min+1)+min);
}


module.exports=router;
