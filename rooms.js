window.tinytip_colors = {
  'Fun': '00F',
  'Sérieuse': 'F00',
  'Normale': '0F0',
  'Carnage': '000'
};
window.tinytip_marker = '<!-- already-tinyTipped -->';

(function () {
  window.oldTipped = null;
  window.hovering = false;
  window.tinyTip_mousevover = false;

  $.fn.tinyTips = function (is_list, params) {
    'use strict';
    var tipFrame = '<div class="tinyTip_salle_de_jeu"><div class="content"></div></div>',
        animSpeed = 300,
        tinyTip = '';
    var options = {
      transformTitle: function (title, self) {
        var clear_title = title.replace(/<form.*/, '').replace(/<[^>]*>/g, '').replace(/\[[^\]]*\]/g, '').replace(/\([^\)]*\)/g, '');
        var form = (title.indexOf('<form') > -1) ? title.replace(/.*<form/, '<form') : '';
        var type = clear_title.replace(/^Partie (.*)Joueurs.*$/, '$1');
        var players = clear_title.replace(/.*:/, '').split(', ').map(function (e) {
          return $.trim(e);
        }).filter(function (e) {
          return e !== '';
        });

        title = '';

        title += 'Partie <strong style="color: #' + window.tinytip_colors[type] + '">' + type + '</strong>';
        title += '<hr/>';
        title += 'Joueurs :</em>';
        title += '<ul>';
        for (var i in players) {
          var player = players[i];
          title += '<li class="player">' + player + '</li>';
        }
        title += '</ul>';
        if (form) {
          title += '<hr/>';
          title += form;
        }
        return title;
      },
      doAfter: function (tip, self) {
        if (!self.html().match('Partie anonyme')) {
          tip.find('.player').playerify(
            '<li style="list-style-image: url(\'/stuff/{% sex_text %}.png\');">' +
            '  <span class="link colored" onclick="Infos(\'{% name %}\')">' +
            '    {% team %} <strong>{% name %}</strong> ' +
            '  </span>' +
            '  <span class="info">[' +
            '    <span title="Parties">{% games %} <icon class="games-icon"></icon></span>' +
            '    - <span title="Points">{% points %} <icon class="points-icon"></icon></span>' +
            '  ]</span>' +
            '  <icon class="{% premium_text %}-icon" title="Premium"></icon>' +
            '</li>');
        }
      }
    };
    $.extend(options, params);

    $(this).css('cursor', 'pointer');
    $(this).hover(function () {
      var self = $(this);
      window.hovering = true;
      if(window.oldTipped === this || window.tinyTip_mouseover) {
        return;
      }
      if (window.oldTipped) {
        $(window.oldTipped).attr("title", $('.tinyTip_salle_de_jeu .content').html());
        $('div.tinyTip_salle_de_jeu').remove();
      }
      window.oldTipped = this;
      $('body').append(tipFrame);
      tinyTip = $('div.tinyTip_salle_de_jeu');
      tinyTip.hide();
      tinyTip.mouseout(function () {
        window.tinyTip_mouseover = false;
      }).mouseover(function () {
        window.tinyTip_mouseover = true;
      });

      var title = self.attr('title') || '';
      if (!title.match(window.tinytip_marker)) {
        title = window.tinytip_marker + options.transformTitle(title, self);
         $(this).attr('title', title);
      }
      tinyTip.find('.content').html(title);
      options.doAfter(tinyTip, self);
      self.attr('title', '');
      var y_offset = tinyTip.height() + 17;
      var x_offset = -20;
      var pos = $(this).offset();
      pos.top = Math.max(0, pos.top - y_offset);
      pos.left = Math.max(0, pos.left - x_offset);
      tinyTip.css(pos).fadeIn(animSpeed);
      // Tests
      $('#pass').focus(function () {
        clearInterval(refresh_interval);
      });
      $('#pass').blur(function () {
        refresh_interval = setInterval(actualiseRoom2, 4000);
      });
    }, function () {
      window.hovering = false;
      var self = this;
      var destroy = function () {
        if (window.oldTipped === self) {
          if ((tinyTip_mouseover === false) && (window.hovering === false)) {
            $(self).attr('title', $('.tinyTip_salle_de_jeu .content').html());
            $('div.tinyTip_salle_de_jeu').remove();
            window.oldTipped = null;
          } else {
            setTimeout(destroy, 50);
          }
        }
      };
      setTimeout(destroy, 50);
    });
  };

  if (window.roomEnCours) {
    // Active rooms list on the side
    if (window.roomEnCours) {
      var transformTitle = function (to_add) {
        return (function (title) {
          var clear_title = title.replace(/<[^>]*>/g, '').replace(/\[[^\]]*\]/g, '').replace(/\([^\)]*\)/g, '');
          var players = clear_title.replace(/.*:/, '').split(', ').map(function (e) {
            return $.trim(e);
          }).filter(function (e) {
            return e !== '';
          });

          title = window.tinytip_marker;

          title += 'Joueurs :</em>';
          title += '<ul style="padding: 0 5px 0 20px; margin: 7px 0;">';
          for (var i in players) {
            var player = players[i];
            title += '<li class="player">' + player + '</li>';
          }
          title += '</ul>';
          if(to_add)
            title += '<hr />' + to_add;
          return title;
        });
      };

      window.roomEnCours = function() {};
      window.newRoomEnCours = function () {
        if(focusStatus === 0) {
          return false;
        }

        $.post("jeu/externe/enCours.php",{
          action:"actRoom",
          type_parties: window.type_de_partie
        }, function(donnee) {
          $('#enCours *').unbind();
          $('#enCours').html(donnee);
          $('#enCours .tableTdGreen, #enCours .tableTdOrange').each(function () {
            $(this).tinyTips(false, {transformTitle: transformTitle(($(this).find('td:nth-child(4)').html() || '').replace(/<a[^>]*>Observer<\/a>/, '<input type="submit" value="Observer" />'))});
          });
        },"text");

        return false;
      };

      window.updateRunningTime = function () {
        $('#enCours .tableTdGreen, #enCours .tableTdOrange').each(function() {
          var time = $(this).find('td')[2];
          var splitted = time.innerHTML.split(':');
          var total = +splitted[0] * 60 + (+splitted[1]) + 1;
          splitted[1] = total % 60;
          splitted[0] = ("00" + ((total - splitted[1]) / 60)).slice(-2);
          splitted[1] = ("00" + splitted[1]).slice(-2);
          time.innerHTML = splitted.join(":");
        });
      };

      window.newRoomEnCours();
      setInterval(window.newRoomEnCours, 30000);
      setInterval(window.updateRunningTime, 1000);
    }
  }

  $('#boxRed td[align=left]').each(function () {
    var html = this.innerHTML;
    this.innerHTML = html.replace(' : ', '');
  });
  $('#boxRed .player, #last_top_10 .player').playerify(
    '<icon class="{% sex_text %}-icon"></icon>' +
    '<span class="link" title="{% team %} ({% games %} parties - {% points %} points)" onclick="Infos(\'{% name %}\')">' +
    '  <strong>{% name %}</strong> ' +
    '</span>' +
    '<icon class="{% premium_text %}-icon" title="Premium"></icon>' +
    '');

}).call(this);
