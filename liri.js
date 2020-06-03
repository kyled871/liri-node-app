// dependecies and global variables
require("dotenv").config();
const fs = require("fs");
const keys = require("./keys");
const axios = require("axios");
const moment = require("moment");
const Spotify = require("node-spotify-api");

let command = process.argv[2];
let input = process.argv.slice(3).join("+");





// BandsInTown API -----------------
let concertThis = (artist) => {
    
    let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    
axios.get(queryUrl).then( 
    function(response) {
        
        console.log('\n--------------\n')
        console.log('Here are your choices for ' + input + "'s upcoming events:")

        // only showing 5 concerts at a time so your command line isnt flooded
        response.data.slice(-5).forEach(concert => {
            console.log("Venue: " + concert.venue.name + '\n')
            console.log("Location: " + concert.venue.location + '\n')
            console.log(moment("Date: " + concert.datetime).format('L') + '\n')
            console.log('--------------\n')            
        });
    })
}



// Spotify Node API --------------
let spotifyThis = (song) => {

    let spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            return console.log('Error occured' + err)
        }
        console.log("\nResults:\n")
        console.log('--------------\n')

        data.tracks.items.slice(-5).forEach(result => {

            console.log("Artist: " + result.artists[0].name)
            console.log("Song: " + result.name)
            console.log("Preview: >>> " + result.preview_url + " <<<")
            console.log("Album: " + result.album.name + '\n')
            console.log('--------------\n')

        })
    })
}



// OMDB API ---------------------
let movieThis = (movie) => {
    let apiKey = (keys.omdb)
    let queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
    let empty = "http://www.omdbapi.com/?t=mr+nobody&y=2009&plot=short&apikey=trilogy"

    if (input) {
        axios.get(queryUrl).then(
            function(response) {
                
                console.log("\nTitle: " + response.data.Title)
                console.log("Year: " + response.data.Year)
                console.log("IMDB: " + response.data.Ratings[0].Value)
                console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value)
                console.log("Country: " + response.data.Country)
                console.log("Language: " + response.data.Language)
                console.log("Plot: " + response.data.Plot)
                console.log("Actors: " + response.data.Actors + '\n')
                console.log('--------------\n')

    
            }
        )

    } else if (!input) {
        axios.get(empty).then( 
            function(response) {
                console.log("\nCan't think of anything? Try this movie: ")
                console.log("\nTitle: " + response.data.Title)
                console.log("Year: " + response.data.Year)
                console.log("IMDB: " + response.data.Ratings[0].Value)
                console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value)
                console.log("Country: " + response.data.Country)
                console.log("Language: " + response.data.Language)
                console.log("Plot: " + response.data.Plot)
                console.log("Actors: " + response.data.Actors + '\n')
                console.log("It's on Netflix!")
                console.log('--------------\n')
                
            }
        )
    }
}
    
    
    
    // each command calls different function
    switch (command) {
        case "concert-this":
            concertThis(input);
            break;

        case 'spotify-this-song':
            spotifyThis(input);
            break;

        case 'movie-this':
            movieThis(input);
            break;
            
    }
    