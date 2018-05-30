import './banner.html';

Template.banner.helpers({
  colorClass: (sev) => ['light', 'moderate', 'severe'][sev],
  within: (start, end) => {
    var now = new Date();
    return start < now && now < end;
  }
});
