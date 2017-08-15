import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Handlebars.registerHelper('activePage', function() {
  // includes Spacebars.kw but that's OK because the route name ain't that.
  var routeNames = arguments;

  return _.include(routeNames, FlowRouter.getRouteName()) && 'active';
});
