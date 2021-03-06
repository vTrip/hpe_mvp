angular.module('starter')

.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
})

.factory('GamesListService', function($http) {
   var endpoint = 'http://54.206.46.11/hp/api/game';
  // var endpoint = 'http://thebitspace.com.au/api/game';

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

    create: function(game) {
      return $http.post(endpoint, game);
    },

    update: function(game) {
      return $http({
        method: 'PUT',
        data: game,
        url: endpoint + '/' + game.id
      });
    },

    // Update a field of an object
    // @param (id) - id of the object
    // @param (data) - field / data to be updated
    updateAttribute: function(id, data) {
      return $http({
        method: 'PATCH',
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

.factory('GuestGameService', function($http) {
   var endpoint = 'http://54.206.46.11/hp/api/guest-game';

  return {
    read: function(id) {
      return $http ({
        method: 'GET',
        url: endpoint + '/' + id,
      });
    }
  }
})

.factory('ContactsService', function($http) {
  var endpoint = 'http://54.206.46.11/hp/api/contact';
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
        method: 'PATCH',
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

.factory('GuestService', function($http, $q) {
  var endpoint = 'http://54.206.46.11/hp/api/guest';
  // var endpoint = 'http://thebitspace.com.au/api/guest-status';

  return {
    all: function() {
      return $http ({
        method: 'GET',
        url: endpoint,
      });
    },

    create: function(guest) {
      return $http.post(endpoint, guest);
    },

    read: function(id) {
      return $http ({
        method: 'GET',
        url: endpoint + '/' + id,
      });
    },

    // get a selection of guests
    // @param (ids) - array of ids to GET
    selection: function(ids) {
      ids.push(-1);
      var params = ids.join(',');
      return $http ({
        method: 'GET',
        url: endpoint + '/' + params,
      });
    },

    // Update a field of an object
    // @param (id) - id of the object
    // @param (data) - field / data to be updated
    updateAttribute: function(id, data) {
      return $http({
        method: 'PATCH',
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

.factory('GuestGameService', function($http, $q) {
  var endpoint = 'http://54.206.46.11/hp/api/guest-game';
  // var endpoint = 'http://thebitspace.com.au/api/guest-status';

  return {
    all: function() {
      return $http ({
        method: 'GET',
        url: endpoint,
      });
    },

    create: function(guest) {
      return $http.post(endpoint, guest);
    },

    read: function(id) {
      return $http ({
        method: 'GET',
        url: endpoint + '/' + id,
      });
    },

    // get a selection of guests
    // @param (ids) - array of ids to GET
    selection: function(ids) {
      var params = ids.join(',');
      if (params.length != 0) {
        return $http ({
          method: 'GET',
          url: endpoint + '/' + params,
        });
      }

      return $q.when(null);

    },

    // Update a field of an object
    // @param (id) - id of the object
    // @param (data) - field / data to be updated
    updateAttribute: function(id, data) {
      return $http({
        method: 'PATCH',
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

.factory('LogoToggleService', function() {
  var logo_switch = true;

  return {
    get: function() {
      return logo_switch;
    },

    set: function(state) {
      logo_switch = state;
      console.log(logo_switch);
    }
  }
})

.factory('TeamCodes', function() {
  var teams = [
    {name: 'Broncos', code: 'BRI'},
    {name: 'Bulldogs', code: 'CBY'},
    {name: 'Cowboys', code: 'NQL'},
    {name: 'Dragons', code: 'STI'},
    {name: 'Eels', code: 'PAR'},
    {name: 'Knights', code: 'NEW'},
    {name: 'Panthers', code: 'PEN'},
    {name: 'Rabbitohs', code: 'SOU'},
    {name: 'Raiders', code: 'CBR'},
    {name: 'Roosters', code: 'SYD'},
    {name: 'Sea Eagles', code: 'MAN'},
    {name: 'Sharks', code: 'CRO'},
    {name: 'Storm', code: 'MEL'},
    {name: 'Tigers', code: 'WST'},
    {name: 'Titans', code: 'GLD'},
    {name: 'Warriors', code: 'WAR'}
  ];

  return {
    get: function(team) {
      var code;
      teams.forEach(function(item) {
        if (item.name == team) {
          code = item.code;
        }
      });
      return code;
    }
  }
})
