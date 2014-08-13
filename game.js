(function () {
  if (window.location.toString().match('jeu/index.php')) {
    console.log('In a game');
    var oldUpdateGlobal = window.updateGlobal;
    window.updateGlobal = function () {
      return oldUpdateGlobal.call(this);
    };
    var oldGetChat = window.getChat;
    window.getChat = function () {
      $('span.canal_joueurs:not(.bound)').each(function () {
        $(this).addClass('bound');
        var keys = Object.keys(window.smileys);
        for (var i in keys) {
          var smiley = window.smileys[keys[i]];
          this.innerHTML = this.innerHTML.replace(smiley.regex, '<img src="' + smiley.path + '" />');
        }
      });
      return oldGetChat.call(this);
    };
  }
}).call(this);
