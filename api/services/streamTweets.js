module.exports = function (stream, TweetModel, sails) {
  stream.on('data', function (data) {

    console.log("stream data => ", data);

    TweetModel.create({
      tweet_id: data.id,
      active: false,
      author: data.user.name,
      avatar: data.user.profile_image_url,
      body: data.text,
      date: data.created_at,
      screen_name: data.user.screen_name
    },
    function (err, res) {
      if (err) {
        console.error("error in creating a Tweet", err);
      }

      sails.sockets.broadcast('tweets-channel', 'new-tweets', res);
    });


  });
};
