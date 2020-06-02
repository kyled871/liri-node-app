// dependecies and glolbal variables
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var omdb = new omdb(keys.omdb);
var spotify_api = require("node-spotify-api");
var input_command = process.argv;

var spotify = new Spotify(keys.spotify);



