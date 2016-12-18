import './party_item.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { _ } from 'meteor/underscore';

Template.partyItem.helpers({
  upvoted: upvoters => {
    var username;
    if (Meteor.user() && Meteor.user().username) {
      username = Meteor.user().username;
    }
    else return '';

    var upvoters_ = upvoters || [];
    var i = upvoters_.indexOf(username);
		var str = '';

    if (i >= 0) {
      str = 'upvoted';
    };

		return str;
  }
});

Template.partyItem.onRendered(function() {
	$('.party').imagesLoaded(function() {
		$('.parties').masonry('reloadItems')
									.masonry('layout');
	});
});

Template.partyItem.events({
  'click .party-upvotes__heart': (event, template) => {
    let user = Meteor.userId();

    if (user === null) {
      Bert.alert('Please log in (or register) to upvote.', 'info');
    }
    else {
      Meteor.call('upvoteParty', template.data._id);
    }
  }
});
