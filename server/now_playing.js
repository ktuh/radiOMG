import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

/*
 * Server-side method to call Spinitron API to obtain latest song recorded.
 * Returns HTML containing latest recorded track information.
 */
Meteor.methods({
  latestSong: function() {
    var queryObj = { 'station': Meteor.settings.spinitronStation, 'num': 1 };
    var keys = Object.keys(queryObj);
    var query = [];
    for (var k = 0; k < keys.length; k++) {
      query.push(encodeURIComponent(keys[k]) + '=' +
        encodeURIComponent(queryObj[keys[k]]));
    }
    query = query.join('&');
    this.unblock();
    var res = HTTP.get('http://spinitron.com/radio/newestsong.php',
      { query: query });
    res = res.content;
    return res;
  }
});
