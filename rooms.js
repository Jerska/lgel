if ($.fn.tinyTips) {
  window.oldTipped = null;

  var colors = {
    'Fun': '00F',
    'Sérieuse': 'F00',
    'Normale': '0F0',
    'Carnage': '000'
  };
  $.fn.tinyTips = function (isList, toAdd) {
    'use strict';
    var tipFrame = '<div class="tinyTip_salle_de_jeu"><div class="content"></div><div class="bottom">&nbsp;</div></div>',
        animSpeed = 300,
        tinyTip = '';
    $(this).hover(function () {
      var self = $(this);
      var tipCont, _tipCont, form, type, players, matches, to_add, list, i, len, player, link_player, line, getLine, x_offset, y_offset, pos, npos;
      hovering = true;
      if(window.oldTipped === this || tinyTip_mouseover) {
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
        tinyTip_mouseover = false;
      }).mouseover(function () {
        tinyTip_mouseover = true;
      });
      tipCont = self.attr('title');
      _tipCont = tipCont.replace(/<[^>]*>/g, '').replace(/\[[^\]]*\]/g, '').replace(/\([^\)]*\)/g, '');
      matches = tipCont.match(/player_requested/g);
      if (isList) {
        form = (tipCont.match(/<form/) ? tipCont.replace(/.*<form/, '<form') : '');
        type = _tipCont.replace(/^Partie (.*)Joueurs.*$/, '$1');
      }
      players = _tipCont.replace(/.*:/, '').split(', ').map(function (e) {
        return $.trim(e);
      }).filter(function (e) {
        return e !== '';
      });
      to_add = '';
      if (!matches || matches.length !== players.length) {
        if (isList) {
          to_add += 'Partie <strong style="color: #' + colors[type] + '">' + type + '</strong>';
          to_add += '<hr/>';
        }
        to_add += 'Joueurs :</em>';
        to_add += '<ul style="padding: 0 5px 0 20px; margin: 7px 0;"></ul>';
        if (isList && form) {
          to_add += '<hr/>';
          to_add += form;
        }
        if (toAdd) {
          to_add += toAdd;
        }
        tinyTip.find('.content').html(to_add);
        list = tinyTip.find('.content ul');
        getLine = function (player, link_player, line) {
          Players.getInfo(player, function (data) {
            var res = '';
            if (data.error) {
              res += player + ' [<strong style="color: red">' + data.error + '</strong>]';
            } else {
              line.css('list-style-image', 'url("stuff/' + (data.sex ? 'boy' : 'girl') + '.png")');
              if (data.premium) {
                res += '<img src="stuff/star.png" style="height: 12px;" /> ';
              }
              if (data.team) {
                res += '<span style="color: #476BB2;">[' + data.team + ']</span> ';
              }
              res += link_player;
              res += ' <span style="color: #555;">(' + data.games + ' parties - ' + data.points + ' points)</span>';
            }
            res += '<span style="display: none;">,</span> ';

            line.html(res);
            line.addClass('player_requested');
          });
        };
        for (i = 0, len = players.length; i < len; ++i) {
          player = players[i];
          link_player = '<strong style="color: #003366; cursor: pointer;"><a onClick="javascript:Infos(\'' + player + '\'); return false;">' + player + '</a></strong><span style="display: none;">,</span> ';
          line = $('<li style="height: 16px;">' + link_player + '</li>');
          list.append(line);
          getLine(player, link_player, line);
        }
      } else {
        tinyTip.find('.content').html(tipCont);
      }
      self.attr('title', '');
      y_offset = tinyTip.height() + 17;
      x_offset = -20;
      pos = $(this).offset();
      npos = pos;
      npos.top = pos.top - y_offset;
      npos.left = pos.left - x_offset;
      tinyTip.css(npos).fadeIn(animSpeed);
      // Tests
      $('#pass').focus(function () {
        clearInterval(refresh_interval);
      });
      $('#pass').blur(function () {
        refresh_interval = setInterval(actualiseRoom2, 4000);
      });
    }, function () {
      hovering = false;
      var self = this;
      var destroy = function () {
        if (window.oldTipped === self) {
          if ((tinyTip_mouseover === false) && (hovering === false)) {
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

  // Active rooms list on the side
  if (window.roomEnCours) {
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
          $(this).tinyTips(false, '<hr/>' + $(this).find('td:nth-child(4)').html().replace(/<a[^>]*>Observer<\/a>/, '<input type="submit" value="Observer" />'));
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