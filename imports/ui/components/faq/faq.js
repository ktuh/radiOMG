import './faq.html';

Template.faq.events({
  'click .toggle': function(e) {
    $(e.target).html($(e.target).text() == '+' ? '-' : '+');
    $(e.target).siblings('.faq__section-qna-content').children('.faq__answer').toggle(100);
  }
});
