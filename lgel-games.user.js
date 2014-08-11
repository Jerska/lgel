// ==UserScript==
// @name        lgel-games
// @namespace   http://www.github.com/Jerskouille/lgel
// @description lgel
// @include     *loups-garous-en-ligne.com/room
// @include     *loups-garous-en-ligne.com/jeu/index.php*
// @version     1.0.3
// @grant       none
// ==/UserScript==
console.log('In user script');
if ($.fn.tinyTips) {
  console.log('In if');
  var colors = {
    'Fun': '00F',
    'Sérieuse': 'F00',
    'Normale': '0F0',
    'Carnage': '000'
  };
  var getPlayerInfos = function (name, callback) {
    'use strict';
    var res = {
      name: name,
      error: null
    };
    $.getJSON(urlInteragir, {
      action: 'charger_profil',
      joueur: name
    }, function (player) {
      if (player === 'error') {
        res.error = 'Could not load data';
      } else if (player.existing_account !== 'yes') {
        res.error = 'Ce compte n\'existe pas';
      } else {
        res.team = player.hameau;
        res.games = player.parties;
        res.points = player.points;
        res.premium = player.premium.match('premium') !== null;
        res.sex = player.premium.match('joueuse') === null;
      }
      callback(res);
    });
  };
  console.log('Before tips');
  $.fn.tinyTips = function () {
    'use strict';
    var tipFrame = '<div class="tinyTip_salle_de_jeu"><div class="content"></div><div class="bottom">&nbsp;</div></div>',
        animSpeed = 300,
        tinyTip = '';
    $(this).hover(function () {
      var tipCont, _tipCont, form, type, players, matches, to_add, list, i, len, player, link_player, line, getLine, x_offset, y_offset, pos, npos;
      hovering = true;
      if (last_id_hovered !== +$(this).attr('id')) {
        if (last_id_hovered !== 0) {
          $('#' + last_id_hovered).attr('title', $('.tinyTip_salle_de_jeu .content').html());
          $('div.tinyTip_salle_de_jeu').remove();
        }
        $('body').append(tipFrame);
        tinyTip = $('div.tinyTip_salle_de_jeu');
        tinyTip.hide();
        tinyTip.css('width', 'auto');
        tinyTip.css('background', 'white');
        tinyTip.css('border', '1px solid #777');
        tinyTip.css('boder-radius', '2px');
        tinyTip.find('*').css('background', 'white');
        tipCont = $(this).attr('title');
        matches = tipCont.match(/player_requested/g);
        form = tipCont.replace(/.*<form/, '<form');
        _tipCont = tipCont.replace(/<[^>]*>/g, '').replace(/\[[^\]]*\]/g, '').replace(/\([^\)]*\)/g, '');
        type = _tipCont.replace(/^Partie (.*)Joueurs.*$/, '$1');
        players = _tipCont.replace(/.*:/, '').replace(/,/g, '').split(' ').filter(function (e) {
          return e !== '';
        });
        if (!matches || matches.length !== players.length) {
          to_add = 'Partie <strong style="color: #' + colors[type] + '">' + type + '</strong>';
          to_add += '<hr/>';
          to_add += 'Joueurs :</em>';
          to_add += '<ul style="padding: 0 5px 0 20px; margin: 7px 0;"></ul>';
          to_add += '<hr/>';
          to_add += form;
          tinyTip.find('.content').html(to_add);
          list = tinyTip.find('.content ul');
          getLine = function (player, link_player, line) {
            getPlayerInfos(player, function (data) {
              var res = '';
              if (data.error) {
                res += player + '[<strong style="color: red">' + data.error + '</strong>]';
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
              res += ' ';
              line.html(res);
              line.addClass('player_requested');
            });
          };
          for (i = 0, len = players.length; i < len; ++i) {
            player = players[i];
            link_player = '<strong style="color: #003366; cursor: pointer;"><a onClick="javascript:Infos(\'' + player + '\'); return false;">' + player + '</a></strong> ';
            line = $('<li style="height: 16px;">' + link_player + '</li>');
            list.append(line);
            getLine(player, link_player, line);
          }
        } else {
          tinyTip.find('.content').html(tipCont);
        }
        last_id_hovered = $(this).attr('id');
        $(this).attr('title', '');
        y_offset = tinyTip.height() + 17;
        x_offset = -20;
        pos = $(this).offset();
        npos = pos;
        npos.top = pos.top - y_offset;
        npos.left = pos.left - x_offset;
        tinyTip.css('position', 'absolute').css('z-index', '1000');
        tinyTip.css(npos).fadeIn(animSpeed);
        // Tests
        $('div.tinyTip_salle_de_jeu').unbind('mouseout');
        $('div.tinyTip_salle_de_jeu').mouseout(function () {
          tinyTip_mouseover = false;
        }).mouseover(function () {
          tinyTip_mouseover = true;
        });
        $('#pass').focus(function () {
          clearInterval(refresh_interval);
        });
        $('#pass').blur(function () {
          refresh_interval = setInterval(actualiseRoom2, 4000);
        });
      }
    }, function () {
      hovering = false;
      setTimeout(function () {
        if ((tinyTip_mouseover === false) && (hovering === false)) {
          $('#' + last_id_hovered).attr('title', $('.tinyTip_salle_de_jeu .content').html());
          $('div.tinyTip_salle_de_jeu').remove();
          last_id_hovered = 0;
        }
      }, 20);
    });
  };
}
if (window.IWannaPlay) {
  window.IWannaPlay.toString = Object.toString;
  var OldIWannaPlay = window.IWannaPlay.toString();
  console.log('old', OldIWannaPlay);
  window.query = OldIWannaPlay.match(/[^\/][^\/][a-z0-9]{34}[^\)]*\)/)[0];
  console.log('query', window.query);
  window.query = window.query.replace(/^[\s\S]*\(['"]/, '').replace(/['"]\)$/, '');
  console.log('query', window.query);
  window.IWannaPlay = function () {
    'use strict';
    console.log('In IWannaPlay', window.query);
    window.adWatchedAfterAdblockCheck(window.query);
  };
  if ($('#immViewer').css('display') == 'block') {
    window.location.reload();
  }
}

