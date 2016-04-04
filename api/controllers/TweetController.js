/**
 * TweetController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var twitter = require('twitter');

module.exports = {
	getStreamTweets(req, res) {
		//return res.send("test");

		var init = false;

		if (!req.isSocket) {
			return res.badRequest();
		}

		if (!sails.config.twitter) {
			return res.serverError("Config Variable Not Found");
		}

		//Subscribing the requesting socket to the room 'tweets'
		sails.sockets.join(req, 'tweets-channel');

		var twitterClient = new twitter(sails.config.twitter);

		// Set a stream listener for tweets matching tracking keywords
		twitterClient.stream('statuses/filter', {
			track: '#lyonjs'
		}, function(stream) {
			streamTweets(stream, Tweet, sails);
			console.log("tweets stream: ", stream);
		});

		Tweet
			.find()
			.exec(function(err, tweets) {
				if (err) {
					return res.serverError(err);
				}

				if (!init) {
					init = true;
					sails.sockets.broadcast('tweets-channel', 'new-tweets', tweets);
				}

				tweets.forEach(function(tweet) {
					tweet.active = true;
				});

			});

	}
};
