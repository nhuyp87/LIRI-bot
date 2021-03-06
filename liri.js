// Require spotify and OMDB
var spotify = require('spotify');
var request = require('request');
var Twitter = require('twitter');
// Grab data from keys.js
var key = require("./keys.js");
// Store twitter keys 


// Show last 20 tweets and when they were created in git bash/terminal using my-tweets command
if (process.argv[2] == "my-tweets") {

    var myTweets = function () {
        var client = new Twitter(key.twitterKeys);

        var params = { screen_name: 'nhuyp87_hw', limit: 20 };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {

            var data = [];
            if (!error) {
                for (var i = 0; i < tweets.length; i++) {
                    data.push([i + 1] + ": " + tweets[i].created_at + ": " + tweets[i].text);
                }
                console.log(JSON.stringify(data, null, 2));
            }
        }); // closes client.get
    } // closes myTweets 

    myTweets();

} // closes if statement

// Show artists, song's name, preview link from Spotify and the album that the song is from using spotify-this-sing '<song name here>' 

if (process.argv[2] == "spotify-this-song" && process.argv[3]) {

    var songName = process.argv[3]

    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {

            console.log('Error occurred: ' + err);
            return;
        }
        // Do something with 'data'
        // console.log(JSON.stringify(data));
        for (var i = 0; i < data.tracks.items.length; i++) {
            console.log(JSON.stringify(data.tracks.items[i].album.artists[0].name));
            console.log(JSON.stringify(data.tracks.items[i].album.name));
            console.log(JSON.stringify(data.tracks.items[i].name));
            console.log(JSON.stringify(data.tracks.items[i].preview_url));
            console.log("-----------------------------------------------------------");
        };
    });

} // closes spotify-this-song if statement
// if no song is provided, then program will default to "The Sign" by Ace of Base
else if (process.argv[2] == "spotify-this-song" && !process.argv[3]) {

    spotify.search({ type: 'track', query: 'the sign ace of base' }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        // Do something with 'data'
        // console.log(JSON.stringify(data));
        for (var i = 0; i < data.tracks.items.length; i++) {
            console.log(JSON.stringify(data.tracks.items[i].album.artists[0].name));
            console.log(JSON.stringify(data.tracks.items[i].album.name));
            console.log(JSON.stringify(data.tracks.items[i].name));
            console.log(JSON.stringify(data.tracks.items[i].preview_url));
            console.log("-----------------------------------------------------------");
        };

    });
}

// Show movie title, movie year, IMDB rating of movie, country of origin, movie language, plot, actors, and Rotten Tomatoes URL using movie-this '<movie name here' command 
var movie = process.argv[3];
if (process.argv[2] == "movie-this" && process.argv[3]) {

    request("http://www.omdbapi.com/?apikey=40e9cece&t=" + movie + "&y=&plot=short&r=json", function (error, response, body) {

        if (error) { return console.log('error:', error); }

        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("Rotten Tomatoes URL: " + JSON.parse(body).Website);

    })

    // If no movie is entered, the program will output data for the movie "Mr. Nobody"
} else if (process.argv[2] == "movie-this" && !process.argv[3]) {

    movie = "Mr. Nobody";

    request("http://www.omdbapi.com/?apikey=40e9cece&t=" + movie + "&y=&plot=short&r=json", function (error, response, body) {

        if (error) { return console.log('error:', error); }

        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("Rotten Tomatoes URL: " + JSON.parse(body).Website);


    })

}


// do-what-it-says & use fs package

var fs = require("fs");

if (process.argv[2] == "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function (error, data) {
        var dataArr = data.split(",");
        if (dataArr[0] == "spotify-this-song") {
            spotify.search({ type: 'track', query: dataArr[1] }, function (err, data) {
                if (err) {
                    console.log('Error occurred: ' + err);
                    return;
                }
                // Do something with 'data'
                // console.log(JSON.stringify(data));
                for (var i = 0; i < data.tracks.items.length; i++) {
                    console.log(JSON.stringify(data.tracks.items[i].album.artists[0].name));
                    console.log(JSON.stringify(data.tracks.items[i].album.name));
                    console.log(JSON.stringify(data.tracks.items[i].name));
                    console.log(JSON.stringify(data.tracks.items[i].preview_url));
                    console.log("-----------------------------------------------------------");
                };

            });
        } else if (dataArr[0] == "my-tweets") {
            var myTweets = function () {
                var client = new Twitter(key.twitterKeys);

                var params = { screen_name: 'nhuyp87_hw', limit: 20 };
                client.get('statuses/user_timeline', params, function (error, tweets, response) {

                    var data = [];
                    if (!error) {
                        for (var i = 0; i < tweets.length; i++) {
                            data.push([i + 1] + ": " + tweets[i].created_at + ": " + tweets[i].text);
                        }
                        console.log(JSON.stringify(data, null, 2));
                    }
                }); // closes client.get
            } // closes myTweets 

            myTweets();

        } else if (dataArr[0] == "movie-this") {
            movie = dataArr[1];

            request("http://www.omdbapi.com/?apikey=40e9cece&t=" + movie + "&y=&plot=short&r=json", function (error, response, body) {

                if (error) { return console.log('error:', error); }

                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("Rotten Tomatoes URL: " + JSON.parse(body).Website);


            })

        }

    }); // closes fs readfile
} // closes if statement 

