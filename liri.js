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

            var params = {screen_name: 'nhuyp87_hw', limit: 20};
            client.get('statuses/user_timeline', params, function(error, tweets, response) {
            
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

if (process.argv[2] == "spotify-this-song") {

        // var songName = process.argv[3].toLowerCase().trim();

        // console.log(songName); 

        spotify.search({ type: 'track', query: process.argv[3]}, function(err, data) {
            if (err ) {

                console.log('Error occurred: ' + err);
                return;     
                
            }

                for (var i=0; i<data.length; i++) {
                    // Do something with 'data'
                    // console.log(JSON.stringify(data));
                    console.log(JSON.stringify(data.tracks.items[0].album.artists[0].name));
                    console.log(JSON.stringify(data.tracks.items[0].album.name));
                    console.log(JSON.stringify(data.tracks.items[0].name));
                    console.log(JSON.stringify(data.tracks.items[0].preview_url));
                    console.log("-----------------------------------------------------------")
                } // closes for loop



                
                
        
            
                

        });

}

    // if no song is provided, then program will default to "The Sign" by Ace of Base

// Show movie title, movie year, IMDB rating of movie, country of origin, movie language, plot, actors, and Rotten Tomatoes URL using movie-this '<movie name here' command 

    // If no movie is entered, the program will output data for the movie "Mr. Nobody"

// Use fs package in Node to take text inside of random.txt to call spotify-this-song for "I Want it That Way"

