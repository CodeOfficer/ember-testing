
App.RESTSerializer = DS.RESTSerializer.extend();

App.RESTAdapter = DS.RESTAdapter.extend({
  bulkCommit: false,
  serializer: App.RESTSerializer.create(),

  // quick hack so all requests end in .json
  ajax: function(url, type, hash) {
    hash.url = url + '.json';
    hash.type = type;
    hash.dataType = 'json';
    hash.contentType = 'application/json; charset=utf-8';
    hash.context = this;

    if (hash.data && type !== 'GET') {
      hash.data = JSON.stringify(hash.data);
    }

    jQuery.ajax(hash);
  }

});

App.Store = DS.Store.extend({
  revision: 11,
  adapter: App.RESTAdapter.create()
});