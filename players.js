var Players = {
  store: window.sessionStorage,
  update_each: 30, // In minutes
  limit: 3000
};

(function ($) {
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
        res.team = player.hameau && ('[' + player.hameau + ']');
        res.games = player.parties;
        res.points = player.points;
        res.premium = (player.premium && player.premium.match('premium') !== null);
        // This base64 code is only a 1px per 1px transparent image. It allows to avoir the broken link image
        res.premium_img = res.premium ? '/stuff/star.png' : 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        res.sex = (player.premium && player.premium.match('joueuse') === null);
        res.sex_img = '/stuff/' + (res.sex ? 'boy.png' : 'girl.png');
      }

      callback(res);
    });
  };

  Players.getInfo = function (name, callback) {
    'use strict';

    if (Players.store) {
      var stored = Players.store.getItem('player_' + name);
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
          if (Players.store.length > Players.limit) {
            Players.store.clear();
          }
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

  var marker = '<!-- already-playerified -->';

  // Format : "[{% team %}] {% name %}"
  $.fn.playerify = function (format) {
    var splitted = format.split(/{%|%}/);
    return this.each(function () {
      var player = this.innerHTML;
      if (player.indexOf(marker) === -1) {
        var self = this;
        Players.getInfo($.trim(self.innerHTML), function (data) {
          var res = marker;
          if (data.error) {
            res += '<span title="' +
              data.error +
              '"> ' +
              '<img src="data:image/gif;base64,R0lGODlhDAAMAOMAAP///wAAAPE4C/ZWLvNCF/hjPfVPJvRJH/dcNfI8D/lpRP///////////////////yH5BAEKAA8ALAAAAAAMAAwAAAQ88MkXapizii1q5mAnBUkJAGVyBURLnC5RHfRx1kdl7MbJG5WBcEhcIY6nI+JCKTifTiYloKgqPJgpVhIBADs=" /> ' +
              player +
              '</span>';
            $(self).html(res);
          }
          else {
            res += splitted.reduce(function (acc, val, ind) {
              var trimmed = data[$.trim(val)];
              return acc + ((ind % 2) ? (trimmed === undefined ? '' : trimmed) : val);
            }, '');
            $(self).replaceWith(res);
          }
        });
      }
    });
  };
})(jQuery);
