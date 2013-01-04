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
    // Todos.initialize();
  }
});

describe("Application", function() {
  it("should have a container", function() {
    expect(Todos.get('container')).to.be.an['instanceof'](Ember.Container);
  });

  it("should have a router", function() {
    expect(Todos.get('container').lookup('router:main')).to.be.an['instanceof'](Ember.Router);
  });

  describe("can be reset", function() {
    beforeEach(function(done) {
      Ember.$("body").append("<div id='app'></div>");
      Ember.run(function() {
        Todos.reset();
        Todos.set('rootElement', '#app');
        Todos.initialize();
      });
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
});