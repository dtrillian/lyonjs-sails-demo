/**
 * Tweet.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    tweet_id: {
      type: 'string'
    },
    active: {
      type: 'boolean'
    },
    author: {
      type: 'string'
    },
    avatar: {
      type: 'string'
    },
    body: {
      type: 'string'
    },
    date: {
      type: 'datetime'
    },
    screen_name: {
      type: 'string'
    }
  }
};
