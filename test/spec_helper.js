// spec_helper.js

beforeEach(function() {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~');
});

window.app = function(code){
  $W.Ember.run(code);
};

window.integrationTest = function(testname, callback) {
  var func, resume, oldApp = window.Todos;

  func = function() {
    var timer;

    console.log('--- integrationTest executing', this);

    $('#iframe').on('load', function(){
      console.log('--- iframe onLoad');

      window.$W    = document.getElementById('iframe').contentWindow;
      window.$J    = $W.$;
      window.Todos = $W.Todos;

      console.log('integrationTest#advanceReadiness');
      spyOn(Todos, 'didBecomeReady').andCallThrough();
      Todos.advanceReadiness();

      waitsFor(function(){
        console.log('--- waitsFor#didBecomeReady', Todos.didBecomeReady.wasCalled);
        return Todos.didBecomeReady.wasCalled;
      });

      runs(function(){
        console.log('running callback');
        callback();
        window.Todos = oldApp;
        clearTimeout(timer);
        resume = true;
      });
    });

    document.getElementById('iframe').contentWindow.location.reload();

    timer = setTimeout(function(){
      resume = true;
      expect(true).toBe(false);
    }, 2000);
  };

  runs(function(){
    console.log('--- runs test');
    jasmine.getEnv().describe(testname, func);
  });
};











// beforeEach(function() {
//   console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~');
// });

// window.app = function(code){
//   $W.Ember.run(code);
// };

// window.integrationTest = function(testname, callback) {
//   var func, oldApp;

//   oldApp = window.Todos;

//   func = function() {
//     var timer;

//     console.log('integrationTest func executing', this);

//     document.getElementById('iframe').onLoad = function() {
//       window.$W    = document.getElementById('iframe').contentWindow;
//       window.$J    = $W.$;
//       window.Todos = $W.Todos;
//       Todos.advanceReadiness();
//       Todos.didBecomeCompletelyReady = function() {
//         callback();
//         window.Todos = oldApp;
//         clearTimeout(timer);
//         start();
//       };
//     };

//     stop();

//     document.getElementById('iframe').contentWindow.location.reload();
//     timer = setTimeout(function() {
//       ok(false, "Integration test timed out");
//       start();
//     }, 2000);
//   };

//   jasmine.getEnv().describe(testname, func);
// };