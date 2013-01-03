require('test/spec_helper');

Ember.Application.prototype.reopen({
  reset: function() {
    console.log('-- reset');
    Todos.set('_readinessDeferrals', 1);
    Todos.set('isInitialized', false);
    Todos.get('container').destroy();
    Todos.buildContainer();
    if (Todos.store) {
      Todos.store.destroy();
      Todos.set('store', null);
    }
    Todos.store = Todos.Store.create();
    Todos.initialize();
  }
});


describe("Application", function() {
  beforeEach(function(done) {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    Ember.$("body").append("<div id='app'></div>");
    Ember.run(function() {
      Todos.set('rootElement', '#app');
      Todos.reset();
    });
    console.log(Todos.get('container').lookup('router:main'));
    console.log(Todos.get('eventDispatcher'));
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
