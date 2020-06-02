// dependecies and glolbal variables
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var omdb = new omdb(keys.omdb);
var spotify_api = require("node-spotify-api");
var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

var spotify = new Spotify(keys.spotify);





let concertThis = (artist) => {

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/?app_id=codingbootcamp"





}
