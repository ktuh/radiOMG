import './review_list.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Reviews } from '../../../api/reviews/reviews_collection.js';
import { ReviewsIndex } from '../../../api/reviews/review_index.js';
import { EasySearch } from 'meteor/easy:search';
import './review_item.js';

Template.reviewList.helpers({
  reviewsIndex: () => ReviewsIndex // instanceof EasySearch.Index
});
