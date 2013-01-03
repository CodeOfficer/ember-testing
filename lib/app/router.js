
require('lib/app/app');

Todos.Router.map(function(match) {
  match("/").to("todos", function(match){
    match("/").to("allTodos");
    match("/active").to("activeTodos");
    match("/completed").to("completedTodos");
  });
});
