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
      date: '25 Apr',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Knights',
      invited: 8,
      accepted: 2,
      declined: 2,
      startTime: null,
      finishTime: null,
    },
    {
      id: 1,
      date: '30 Apr',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Cowboys',
      invited: 6,
      accepted: 3,
      declined: 0,
      startTime: null,
      finishTime: null,
    },
    {
      id: 2,
      date: '14 May',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Broncos',
      invited: 8,
      accepted: 0,
      declined: 0,
      startTime: null,
      finishTime: null,
    },
    {
      id: 3,
      date: '21 May',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Sharks',
      invited: 0,
      accepted: 0,
      declined: 0,
      startTime: null,
      finishTime: null,
    },
    {
      id: 4,
      date: '3 Jun',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Raiders',
      invited: 0,
      accepted: 0,
      declined: 0,
      startTime: null,
      finishTime: null,
    },
    {
      id: 5,
      date: '12 Jun',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Panthers',
      invited: 0,
      accepted: 0,
      declined: 0,
      startTime: null,
      finishTime: null,
    },
    {
      id: 6,
      date: '20 Jun',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Titans',
      invited: 0,
      accepted: 0,
      declined: 0,
      startTime: null,
      finishTime: null,
    }
    ,
    {
      id: 7,
      date: '27 Jun',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Cowboys',
      invited: 0,
      accepted: 0,
      declined: 0,
      startTime: null,
      finishTime: null,
    }
    ,
    {
      id: 8,
      date: '4 Jul',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Dragons',
      invited: 0,
      accepted: 0,
      declined: 0,
      startTime: null,
      finishTime: null,
    },
    {
      id: 9,
      date: '16 Jul',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Warriors',
      invited: 0,
      accepted: 0,
      declined: 0,
      startTime: null,
      finishTime: null,
    },
    {
      id: 10,
      date: '25 Jul',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Rabbitohs',
      invited: 0,
      accepted: 0,
      declined: 0,
      startTime: null,
      finishTime: null,
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
