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
      date: '2016/04/25',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Knights',
      invited: 8,
      accepted: 2,
      declined: 2,
      startTime: null,
      finishTime: null,
      tickets: [],
    },
    {
      id: 1,
      date: '2016/04/25',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Cowboys',
      invited: 6,
      accepted: 3,
      declined: 0,
      startTime: null,
      finishTime: null,
      tickets: [],
    },
    {
      id: 2,
      date: '2016/05/05',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Broncos',
      invited: 8,
      accepted: 0,
      declined: 0,
      startTime: null,
      finishTime: null,
      tickets: [],
    },
    {
      id: 3,
      date: '2016/05/21',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Sharks',
      invited: 0,
      accepted: 0,
      declined: 0,
      startTime: null,
      finishTime: null,
      tickets: [],
    },
    {
      id: 4,
      date: '2016/06/03',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Raiders',
      invited: 0,
      accepted: 0,
      declined: 0,
      startTime: null,
      finishTime: null,
      tickets: [],
    },
    {
      id: 5,
      date: '2016/06/12',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Panthers',
      invited: 0,
      accepted: 0,
      declined: 0,
      startTime: null,
      finishTime: null,
      tickets: [],
    },
    {
      id: 6,
      date: '2016/06/20',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Titans',
      invited: 0,
      accepted: 0,
      declined: 0,
      startTime: null,
      finishTime: null,
      tickets: [],
    }
    ,
    {
      id: 7,
      date: '2016/06/27',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Cowboys',
      invited: 0,
      accepted: 0,
      declined: 0,
      startTime: null,
      finishTime: null,
      tickets: [],
    }
    ,
    {
      id: 8,
      date: '2016/07/04',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Dragons',
      invited: 0,
      accepted: 0,
      declined: 0,
      startTime: null,
      finishTime: null,
      tickets: [],
    },
    {
      id: 9,
      date: '2016/07/16',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Warriors',
      invited: 0,
      accepted: 0,
      declined: 0,
      startTime: null,
      finishTime: null,
      tickets: [],
    },
    {
      id: 10,
      date: '2016/07/25',
      homeTeam: 'Sea Eagles',
      awayTeam: 'Rabbitohs',
      invited: 0,
      accepted: 0,
      declined: 0,
      startTime: null,
      finishTime: null,
      tickets: [],
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
      return obj;
    },

    read: function(id) {
      return FakeValue(games[id]);
    },

    update: function(game) {
      var index = find(game.id);
      games[index] = game;
      return FakeValue();
    },

    delete: function(index) {
      games.splice(index, 1);
      return FakeValue();
    },
  }
})

.factory('ContactsService', function(FakeValue) {
  var contacts = [
    {
      id: 0,
      name: "Gary One",
      email: "garyone@guest.com",
    },
    {
      id: 1,
      name: "Gary Two",
      email: "garytwo@guest.com",
    },
    {
      id: 2,
      name: "Gary Three",
      email: "garythree@guest.com",
    },
    {
      id: 3,
      name: "Gary Four",
      email: "garyfour@guest.com",
    },

  ];

  return {
    all: function() {
      return FakeValue(contacts);
    },

    find: function(id) {
      contacts.forEach(function(item, index) {
        if (item.id == id) {
          return index;
        }
      });
    },

    create: function(contact) {
      var obj = FakeValue(contact);
      contacts.push(contact);
      return obj;
    },

    read: function(id) {
      return FakeValue(contacts[id]);
    },

    update: function(contact) {
      var index = find(contact.id);
      contacts[index] = contact;
    },

    delete: function(index) {
      contacts.splice(index, 1);
      return FakeValue();
    },
  }
})
