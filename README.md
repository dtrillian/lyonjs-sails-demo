# lyonjs-demo

a [Sails](http://sailsjs.org) application made for LyonJS demo.

You just have to do `npm install` in the repository in order to get all dependencies. You must have last node version (5.10.0) and latest npm version (`npm install -g npm@latest`) in order to avoid some dependencies bugs.

Inside the repository there are two things to configure : your twitter application keys and the tags to track.

First one is inside `config/twitter.js`, just change the following: 

```javascript
module.exports.twitter = {
    consumer_key: 'xxxxx',
    consumer_secret: 'xxxxx',
    access_token_key: 'xxxxx',
    access_token_secret: 'xxxxx'
};
```

The second is inside `api/controllers/TweetController.js`, just change `'#lyonjs'` tag by whatever tags you want to track :

```javascript
// Set a stream listener for tweets matching tracking keywords
twitterClient.stream('statuses/filter', {
	track: '#lyonjs' --> here : e.g: '#test,lyonjs,games' etc
}, function(stream) {
	streamTweets(stream, Tweet, sails);
	console.log("tweets stream: ", stream);
});
```
