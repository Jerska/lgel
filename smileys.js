window.smileys = {
  ':)':           '1.png',
  ';)':           '2.png',
  ':p':           '3.png',
  ':D':           '4.png',
  ':/':           '5.png',
  ':\'(':         '6.png',
  ':v':           '7.png',
  ':(':           '8.png',
  ':3':           '9.png',
  ':sv':          'sv.png',
  ':lg':          'lg.png',
  ':lgb':         'lgb.png',
  ':voy':         'voy.png',
  ':pf':          'pf.png',
  ':cupi':        'cupi.png',
  ':soso':        'soso.png',
  ':ancien':      'ancien.png',
  ':chass':       'chass.png',
  ':ange':        'angel.png',
  ':hameau':      'hameau.png',
  ':chicken':     'chikentear.png',
  ':duck':        'duck.png',
  ':mouton':      'mouton.png',
  ':pingu':       'penguin.gif',
  ':pig':         'pig.png',
  ':lesterpig':   'pig.png',
  ':ninja':       'ninja.png',
  ':mumble':      'mumble.png',
  ':fb':          'fb.png',
  ':bucher':      'bucher.png',
  ':rip':         'rip.png',
  ':hamsterjedi': 'hamsterjedi.png',
  ':hamster':     'hamster.png',
  ':haamster':    'hamster.png',
  ':pizza':       'pizza.png',
  ':cookie':      'cookie.png',
  ':phoque':      'phoque.png',
  ':biche':       'biche.png',
  ':griff':       'griff.png',
  ':porte':       'porte.png',
  '<3':           'c.png',
  ':keur':        'keur.png',
  ':noel':        'noel.gif',
  ':village':     'village.png',
  ':mousse':      'mousse.png',
};

(function () {
  console.log("Loading smileys");

  var regexp_quote = function (str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
  };

  var keys = Object.keys(window.smileys);
  var regex;

  console.log("Before for");
  for (var i = 0, len = keys.length; i < len; ++i) {
    regex = new RegExp('(^|\\s)' + regexp_quote(keys[i]) + '($|\\s)', 'g');
    window.smileys[keys[i]] = {
      path: '/jeu/assets/images/smileys/' + window.smileys[keys[i]],
      regex: regex
    };
  }

  console.log("Smileys ready");
}).call(this);
