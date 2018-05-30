import './faq.html';

Template.faq.events({
  'click .toggle': function(event) {
    var btn;
    if ($(event.target).text() == '+') btn = '-';
    else btn = '+';
    $(event.target).html(btn);
    $(event.target).siblings('.faq__section-qna-content')
      .children('.faq__answer').toggle(100);
  },
  'click .faq__question > span': function(event) {
    var actual =
      $(e.target).parent('.faq__question').parent('.faq__section-qna-content');
    var toggle = actual.siblings('.toggle'), btn;
    if ($(toggle).text() == '+') btn = '-';
    else btn = '+';
    $(toggle).html(btn);
    actual.children('.faq__answer').toggle(100);
  }
});
