require("dotenv").config();
const request = require("request");
const keys = require("./keys.js");
console.log("keys" + keys);


var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

 let myspotify= function (){
    spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
        if ( err ) {
    
            console.log('Error occurred: ' + err);
            return;
        }
        console.log("data",data);
        //Do something with 'data'
     });   
 }
var Twitter = require('twitter');

var client = new Twitter(keys.twitterKeys);
var tweets = function () {
    var params = { screen_name: 'William23753692' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);

        }
    });
}

//Once we run the program, the arguments are grabbed in sequential order passing through the various functions. Simialr to an If/Else statement. 
var omdb = function (movieName) {
    console.log("omdb");

    var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&r=json";
    urlHit += "&apikey=" + "bb428f7b";
    //use env variable for later use. 


    request(urlHit, function (err, resp, body) {
        if (!err && resp.statusCode === 200) {
            var x = JSON.parse(body)
            console.log("x", x);
        } else {
            console.log("ERROR : ", resp.statusCode)
        }
    });
}
//Dispatching to OMDB by using function listed above
var myArgs = process.argv.slice(2);
switch (myArgs[0]) {
    case "movie-this":

        // We are calling OMDB
        omdb(myArgs[1]);
        break;
    case "my-tweets":
        tweets()
        break;
    case "my-spotify":
     myspotify()
        break;
    default:
        text = "Liri does not underdertand that";
}

console.log(myArgs + "myArgs");
console.log(myArgs[0] + "myArgs[0]");
console.log(myArgs[1] + "myArgs[1]");
