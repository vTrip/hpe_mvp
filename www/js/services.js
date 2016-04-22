angular.module('starter')

/**
 * Promise which returns a fake value (after cloning), with a globally
 * configurable timeout
 */
.factory("FakeValue", function FakeValueFactory($q, $timeout) {
  // change this during testing to simulate different server response times
  var delay = 0;

  return function FakeValue(val) {
    return $timeout(function() {
      return $q.when(val);
    }, delay);
  }
})


.factory('GamesListService', function(FakeValue) {
  var games = [
    {
      id: 0,
      date: '31 Mar',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Rabbitohs',
      invited: 0,
      accepted: 0,
      declined: 0,
    },
    {
      id: 1,
      date: '12 Apr',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Eels',
      invited: 8,
      accepted: 2,
      declined: 2,
    }
  ];

  return {
    all: function() {
      return FakeValue(games);
    },

    find: function(id) {
      games.forEach(function(item, index) {
        if (item.id == id) {
          return index;
        }
      });
    },

    create: function(game) {
      var obj = FakeValue(game);
      games.push(obj);
      return obj;
    },

    read: function(id) {
      return FakeValue(games[id]);
    },

    update: function(game) {
      var index = find(game.id);
      games[index] = game;
    },

    delete: function(id) {
      var index = find(id);
      games.splice(index, 1);
    },
  }
})
