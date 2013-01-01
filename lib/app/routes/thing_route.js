
require('lib/app/router');

App.ThingRoute = Ember.Route.extend({
  setupControllers: function(controller, thing) {
    controller.set('content', App.Thing.find(thing.get('id')));
  }
});