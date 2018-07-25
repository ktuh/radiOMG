import './comment_item.html';
import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';

Template.commentItem.helpers({
  timeDiff: function() {
    var timeStr = this.submitted.toString().substring(0, 24);
    var timestamp = moment(timeStr, 'ddd MMM DD YYYY HH:mm:ss');
    var now = moment();
    var diff = moment.duration(timestamp.diff(now), 'milliseconds')
      .humanize(true);
    return diff;
  }
});
