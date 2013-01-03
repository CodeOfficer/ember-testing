require('test/spec_helper');

Ember.Application.prototype.reopen({
  reset: function() {
    console.log('-- reset');
    App.set('_readinessDeferrals', 1);
    App.set('isInitialized', false);
    App.get('container').destroy();
    App.buildContainer();
    if (App.store) {
      App.store.destroy();
      App.set('store', null);
    }
    App.store = App.Store.create();
    App.initialize();
  }
});


describe("Application", function() {
  beforeEach(function(done) {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    Ember.$("body").append("<div id='app'></div>");
    Ember.run(function() {
      App.set('rootElement', '#app');
      App.reset();
    });
    console.log(App.get('container').lookup('router:main'));
    console.log(App.get('eventDispatcher'));
    done();
  });

  afterEach(function(done) {
    Ember.run(function() {
      Ember.$("#app").remove();
    });
    done();
  });

  it("can initialize", function() {
    assert.ok(true, "does not raise");
  });

  it("can initialize again", function() {
    assert.ok(true, "does not raise");
  });
});



// describe("Ember Application", function() {
//   var application = null;

//   beforeEach(function(done) {
//     Ember.$("body").append("<div id='app'></div>");
//     Ember.run(function() {
//       application = Ember.Application.create({rootElement: "#app"});
//       done();
//     });
//   });

//   afterEach(function(done) {
//     Ember.run(function() {
//       application.destroy();
//       application = null;
//       Ember.$("#app").remove();
//       done();
//     });
//   });

//   it("can initialize the application", function() {
//     assert.ok(true, "does not raise");
//   });
// });
