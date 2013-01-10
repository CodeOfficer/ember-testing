Todos.AllTodosRoute = Ember.Route.extend({
  model: function(){
    return Todos.Todo.all();
  },
  renderTemplate: function(controller, model){
    this.render('todos_list', {
      into: 'todos'
    });
  },
  events: {
    toggleTodo: function(route, todo){
      todo.toggleProperty('completed');
    }
  }
});
