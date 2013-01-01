
require('lib/app/router');

App.ThingsRoute = Ember.Route.extend({
  setupControllers: function(controller) {
    controller.set('things', App.Thing.find());
  }
});