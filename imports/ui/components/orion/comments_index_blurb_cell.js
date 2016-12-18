Template.commentsIndexBlurbCell.helpers({
  blurb: function(){
    var blurb = jQuery.truncate(this.body, {
      length: 18
    });
    return blurb;
  }
});