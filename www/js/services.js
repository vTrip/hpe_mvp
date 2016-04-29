angular.module('starter')

.factory('GamesListService', function($http) {
   var endpoint = 'http://10.0.1.12/api/game';
  //var endpoint = 'http://thebitspace.com.au/api/game';

  return {
    all: function() {
      return $http ({
        method: 'GET',
        url: endpoint,
      });
    },

    // get a selection of games
    // @param (ids) - array of ids to GET
    selection: function(ids) {
      var params = ids.join(',');
      return $http ({
        method: 'GET',
        url: endpoint + '/' + params,
      });
    },

    read: function(id) {
      return $http ({
        method: 'GET',
        url: endpoint + '/' + id,
      });
    },

    create: function(contact) {
      return $http.post(endpoint, contact);
    },

    update: function(contact) {
      return $http({
        method: 'PUT',
        data: contact,
        url: endpoint + '/' + contact.id
      });
    },

    // Update a field of an object
    // @param (id) - id of the object
    // @param (data) - field / data to be updated
    updateAttribute: function(id, data) {
      return $http({
        method: 'PUT',
        data: data,
        url: endpoint + '/' + id
      }).catch(function(err) {
        console.error(err);
      });
    },

    delete: function(id) {
      return $http({
          method: 'DELETE',
          url : endpoint + '/' + id
      });
    },
  }
})

.factory('ContactsService', function($http) {
  var endpoint = 'http://10.0.1.12/api/contact';
  // var endpoint = 'http://thebitspace.com.au/api/contact';

  return {
    all: function() {
      return $http ({
        method: 'GET',
        url: endpoint,
      });
    },

    // get a selection of contacts
    // @param (ids) - array of ids to GET
    selection: function(ids) {
      var params = ids.join(',');
      return $http ({
        method: 'GET',
        url: endpoint + '/' + params,
      });
    },

    read: function(id) {
      return $http ({
        method: 'GET',
        url: endpoint + '/' + id,
      });
    },

    create: function(contact) {
      return $http.post(endpoint, contact);
    },

    update: function(contact) {
      return $http({
        method: 'PUT',
        data: contact,
        url: endpoint + '/' + contact.id
      })
    },

    delete: function(id) {
      return $http({
          method: 'DELETE',
          url : endpoint + '/' + id
      });
    },
  }
})
