
require('lib/app/app');

App.Router.map(function(match) {
  match('/').to('things');
  match('/things/:thing_id').to('thing');
});