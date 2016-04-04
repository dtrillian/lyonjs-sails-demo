'use strict';

class StreamList {
    constructor(element) {

        this.componentInstance = {};

        Vue.component('stream-list', {
            template: `<ul class="stream-list">
                      <li v-for="stream in streams | orderBy 'date' -1" class="{{stream.active}}">
                        <aside><img src="{{stream.avatar}}"/></aside>
                        <div class="infos">
                          <p class="name">{{stream.screen_name}}</p>
                          <p class="content">{{stream.body}}</p>
                        </div>
                      </li>
                    </ul>`,
            data: function() {
                return {
                    streams: [],
                    init: false
                }
            },
            created: function() {
                let vueInstance = this;

                console.debug("Stream component created");

                console.log(this.streams);

                // The automatically-created socket is exposed as io.socket.
                // Use .on() to subscribe to the 'tweets' event on the client
                io.socket.on('new-tweets', function gotSubscribed(data) {
                    //if first instantiation, getting old tweets from DB
                    if (!vueInstance.init) {
                        vueInstance.$set('streams', data);
                        vueInstance.$set('init', true);
                    } else {
                        vueInstance.streams.push(data);
                    }

                    console.log("channel data: ", data);
                });

                io.socket.get('/tweets/getStreamTweets', function gotResponse(data, res) {
                    console.debug("stream tweets body : ", data);
                    console.debug("stream tweets : ", res);

                    vueInstance.streams.push(data);

                    console.log(data);
                });

            },
            updated: function() {

            },
            methods: {

            }
        });

        this.componentInstance = new Vue({
            el: element
        })

        return this;
    }

    getComponentInstance() {
        return this.componentInstance;
    }
}
