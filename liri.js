// dependecies and global variables
require("dotenv").config();
const fs = require("fs");
const keys = require("./keys");
const axios = require("axios");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);


let command = process.argv[2];
let input = process.argv.slice(3).join("+");





// BandsInTown API -----------------
let concertThis = (artist) => {
    
    let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    
axios.get(queryUrl).then( 
    function(response) {
        
        console.log('\n--------------\n')
        console.log('Here are your choices for ' + input + "'s upcoming events:\n")

        // only showing 5 concerts at a time so your command line isnt flooded
        response.data.slice(0, 5).forEach(concert => {
            console.log("Venue: " + concert.venue.name + '\n')
            console.log("Location: " + concert.venue.location + '\n')
            console.log("Date: " + moment(concert.datetime).format('L') + '\n')
            console.log('--------------\n')            
        });
    })
}



// Spotify Node API --------------
let spotifyThis = (song) => {

    if (input) {
        spotify.search({ type: 'track', query: song }, function(err, data) {
            if (err) {
                return console.log('Error occured' + err)
            }
            console.log("\nResults:\n")
            console.log('--------------\n')
    
            data.tracks.items.slice(0, 5).forEach(result => {
    
                console.log("Artist: " + result.artists[0].name)
                console.log("Song: " + result.name)
                console.log("Preview: >>> " + result.preview_url + " <<<")
                console.log("Album: " + result.album.name + '\n')
                console.log('--------------\n')
    
            })
        })
        
    } else {

        spotify.search({ type: 'track', query: "The Sign" }, function(err, data) {
            if (err) {
                return console.log('Error occured' + err)
            }
            console.log("\nNothing? Maybe you need a sign? :\n")
            console.log('--------------\n')
    
            let aceOfBase = data.tracks.items[0]
    
                console.log("Artist: " + aceOfBase.artists[0].name)
                console.log("Song: " + aceOfBase.name)
                console.log("Preview: >>> " + aceOfBase.preview_url + " <<<")
                console.log("Album: " + aceOfBase.album.name + '\n')
                console.log('--------------\n')
    
            
        })
    }
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

    } else {
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


let doWhatItSays = () => {
    fs.readFile("random.txt", "utf8", function(err, data) {

        if (err) {
            console.log(err)
        }

        let dataArray = data.split(",")
        console.log(dataArray)

        if (input.replace(/\+/g,' ') === dataArray[1]) {
            spotifyThis(input)
            
        }

    })
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

        case 'do-what-it-says':
            doWhatItSays();
            break;
        
        default:
            break
    }