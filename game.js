(function () {
  if (window.location.toString().match('jeu/index.php')) {
    console.log('In a game');
    var keys = Object.keys(window.smileys);
    var oldUpdateGlobal = window.updateGlobal;
    window.updateGlobal = function () {
      return oldUpdateGlobal.call(this);
    };
    var oldGetChat = window.getChat;
    window.getChat = function () {
      $('span.canal_joueurs:not(.bound)').each(function () {
        $(this).addClass('bound');
        for (var i in keys) {
          var smiley = window.smileys[keys[i]];
          this.innerHTML = this.innerHTML.replace(smiley.regex, '<img src="' + smiley.path + '" />');
        }
      });
      return oldGetChat.call(this);
    };

    var msg_input = $('#postChat #message');
    msg_input.after('<span id="smileys" title="Smileys"> <img src="/jeu/assets/images/smileys/1.png" alt="Smileys" /> <img src="/jeu/assets/images/smileys/c.png" alt="" /></span>');
    $('#postChat #smileys').tinyTips(false, {
      transformTitle: function () {
        var res = '';
        for (var i = 0, len = keys.length; i < len; ++i)
          res += '<img class="smiley" src="' + window.smileys[keys[i]].path + '" title="' + keys[i] + '" />' + (((i + 1) % 10) ? ' ' : '<br/>');
        return res;
      },
      doAfter: function (tip) {
          tip.addClass('smileyBox');
          tip.find('.bottom').remove();
          tip.find('.smiley').on('click', function (e) {
          e.preventDefault();
          var pos = msg_input[0].selectionStart;
          var value = msg_input.val();
          msg_input.val(value.substring(0, pos) + $(this).attr('title') + value.substring(pos));
        });
      }
    });
  }
}).call(this);
