import './faq.html';

Template.faq.events({
  'click .toggle': function(e) {
    $(e.target).html($(e.target).text() == '+' ? '-' : '+');
    $(e.target).siblings('.faq__section-qna-content').children('.faq__answer').toggle(100);
  },
  'click .faq__question > span': function(e) {
    var toggle = $(e.target).parent('.faq__question').parent('.faq__section-qna-content').siblings('.toggle');
    $(toggle).html($(toggle).text() == '+' ? '-' : '+');
    $(e.target).parent('.faq__question').parent('.faq__section-qna-content').children('.faq__answer').toggle(100);
  }
});
