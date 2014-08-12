var player = {
  update_each: 30 // In minutes
};

player.pullProfile = function (name, callback) {
  'use strict';

  var res = {name: name, error: null},
      stored = null,
      last_update = null;
  $.getJSON(urlInteragir, {action: 'charger_profil', joueur: name}, function (player) {
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

player.getInfos = function (name, callback) {
  'use strict';

  var stored;

  if (sessionStorage) {
    stored = sessionStorage.getItem('player_' + name);
    if (stored &&
        (stored = JSON.parse(stored)) &&
        stored.update_time &&
        ((new Date()) - (new Date(stored.update_time))) < (player.update_each * 1000 * 60)) {

        console.log("[getPlayerInfos] Used stored version");
        callback(stored);
    }
    else {
      player.pullProfile(name, function (data) {
        data.update_time = new Date();
        sessionStorage.setItem('player_' + name, JSON.stringify(data));
        console.log("[getPlayerInfos] Updated stored version");
        callback(data);
      });
    }
  }
  else {
    player.pullProfile(name, callback);
  }
};
