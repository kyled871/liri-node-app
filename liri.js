// dependecies and glolbal variables
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
// var omdb = new omdb(keys.omdb);
var spotify_api = require("node-spotify-api");
var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

// var spotify = new Spotify(keys.spotify);




// BandsInTown API -----------------
let concertThis = (artist) => {
    
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    
axios.get(queryUrl).then( 
    function(response) {
        
        console.log('--------------\n')
        console.log('Here are your choices for ' + input + "'s upcoming events:")

        // only showing 5 concerts at a time so your command line isnt flooded
        response.data.slice(-5).forEach(concert => {
            console.log(concert.venue.name + '\n')
            console.log(concert.venue.location + '\n')
            console.log(moment(concert.datetime).format('L') + '\n')
            console.log('--------------\n')            
        });
    })
}
    
    
    
    // each command calls different function
    switch (command) {
        case "concert-this":
            concertThis(input);
            break;
    }
    