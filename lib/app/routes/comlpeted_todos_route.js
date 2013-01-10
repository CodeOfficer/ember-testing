Todos.CompletedTodosRoute = Ember.Route.extend({
  model: function(){
    return Todos.Todo.all().filterProperty('completed', true);
  },
  renderTemplate: function(controller, model){
    this.render('todos_list', {
      into: 'todos',
      controller: 'filteredTodos'
    });
  },
  setupController: function(controller, model) {
    this.controllerFor('filteredTodos').set('content', model);
  }
});
