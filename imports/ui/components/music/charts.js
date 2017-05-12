import './charts.html';
import { Template } from 'meteor/templating';
import { Posts } from '../../../api/posts/posts_collection.js';
import { PostsIndex } from '../../../api/posts/post_index.js';

Template.charts.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('chartsPosts');
  });
});

Template.charts.helpers({
  index: () => PostsIndex,
  attr: () => ({'placeholder': "Search Charts..."})
});
