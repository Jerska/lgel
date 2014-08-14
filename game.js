(function () {
  if (window.location.toString().match('jeu/index.php')) {
    console.log('In a game');
    var keys = Object.keys(window.smileys);
    var oldUpdateGlobal = window.updateGlobal;
    window.updateGlobal = function () {
      return oldUpdateGlobal.call(this);
    };

    window.currentlyShowing = null;
    window.showOnlyMessages = function (name) {
      if (window.currentlyShowing !== name) {
        window.currentlyShowing = name;
        $('span.canal_joueurs').each(function () {
          if (this.innerHTML.toLowerCase().indexOf(name) === -1) {
            $(this).addClass('darkened');
          }
          else {
            $(this).removeClass('darkened');
          }
        });
      }
    };

    $('body').on('click', function () {
      if (window.currentlyShowing) {
        $('span.canal_joueurs').removeClass('darkened');
        window.currentlyShowing = false;
      }
    });

    var oldGetChat = window.getChat;
    window.getChat = function () {
      var do_playerify = !$('#CONTENTchat').html().match('<span style="color:blue">Cette partie possède l\'option <b>Anonyme</b>');
      $('span.to-tip').removeClass('to-tip').tinyTips(false, {
        transformTitle: function (title) {
          var data = {};
          var splitted = title.split('\n');
          var split;
          for (var i = 0, len = splitted.length; i < len; ++i) {
            if (splitted[i] !== '') {
              split = splitted[i].split(':');
              data[split[0]] = split[1];
            }
          }

          title = '';
          if (do_playerify) {
            title += '' +
              '<span>' +
              '  ' + data.hameau +
              '  <strong>' + data.nom + '</strong>' +
              '</span>' +
              '<span class="info"> [' +
              '  <span title="Parties">' + data.parties + '<icon class="games-icon"></icon></span> - ' +
              '  <span title="Points">' + data.points + '<icon class="points-icon"></icon></span> ]' +
              '</span>';
            if (data.premium.toLowerCase() === 'true')
              title += ' <icon class="premium-icon"></icon>';
          }
          else {
            title += '<strong>' + data.nom + '</strong>';
          }
          title += '';
          title += '<hr/>' +
            '<em>Actions :</em>' +
            '<ul>' +
            '<li><span class="link colored" onClick="showOnlyMessages(\'' + data.nom.toLowerCase().substring(0, 3) + '\')">Afficher les messages</span></li>' +
            '</ul>';
          return title;
        },
        doAfter: function (tip) {
          tip.find('span.link').on('click', function (e) {
            e.stopPropagation();
          });
        }
      });
      $('span.canal_joueurs:not(.bound)').each(function () {
        $(this).addClass('bound');
        if (do_playerify) {
          $(this).find('b').playerify(
            '<span class="to-tip link colored" title="' +
            'hameau:{% team %}\n' +
            'nom:{% name %}\n' +
            'parties:{% games %}\n' +
            'points:{% points %}\n' +
            'premium:{% premium %}\n' +
            '"><icon class="{% sex_text %}-icon"></icon> {% team %} <strong>{% name %}</strong></span><icon class="{% premium_text %}-icon" title="Premium"></icon>' +
            '');
        }
        else {
          $('this').find('b').addClass('to-tip').each(function () {
            $(this).attr('title', 'nom:' + $.trim(this.inneHTML));
          });
        }
      for (var i in keys) {
        var smiley = window.smileys[keys[i]];
        this.innerHTML = this.innerHTML.replace(smiley.regex, ' <img src="' + smiley.path + '" /> ');
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
