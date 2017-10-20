import './faq.html';

Template.faq.events({
  'click .toggle': function(e) {
    $(e.target).html($(e.target).html() == '[ + ]' ? '[ - ]' : '[ + ]');
    $(e.target).parent().siblings('.faq__answer').toggle(100);
  }
});
