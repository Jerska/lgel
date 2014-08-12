var Players = {
  store: window.sessionStorage,
  update_each: 30 // In minutes
};

Players.pullProfile = function (name, callback) {
  'use strict';

  var res = {name: name, error: null},
      stored = null,
      last_update = null;

  $.getJSON(window.urlInteragir, {action: 'charger_profil', joueur: name}, function (player) {
    if (player === 'error')
    res.error = 'Could not load data';
    else if (player.existing_account !== 'yes')
    res.error = 'Ce compte n\'existe pas';
    else {
      res.team = player.hameau;
      res.games = player.parties;
      res.points = player.points;
      res.premium = player.premium.match('premium') !== null;
      res.sex = player.premium.match('joueuse') === null;
    }

    callback(res);
  });
};

Players.getInfo = function (name, callback) {
  'use strict';

  var stored;

  if (Players.store) {
    stored = Players.store.getItem('player_' + name);
    if (stored &&
        (stored = JSON.parse(stored)) &&
        stored.update_time &&
        ((new Date()) - (new Date(stored.update_time))) < (Players.update_each * 1000 * 60)) {

        console.log("[Players.getInfo] Used stored version");
        callback(stored);
    }
    else {
      Players.pullProfile(name, function (data) {
        data.update_time = new Date();
        Players.store.setItem('player_' + name, JSON.stringify(data));
        console.log("[Players.getInfo] Updated stored version");
        callback(data);
      });
    }
  }
  else {
    console.log("[Players.getInfo] No storage service");
    Players.pullProfile(name, callback);
  }
};
