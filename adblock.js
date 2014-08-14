(function () {
  if (window.IWannaPlay) {
    window.IWannaPlay.toString = Object.toString;
    var OldIWannaPlay = window.IWannaPlay.toString();
    window.query = OldIWannaPlay.match(/[^\/][^\/][a-z0-9]{34}[^\)]*\)/)[0];
    window.query = window.query.replace(/^[\s\S]*\(['"]/, '').replace(/['"]\)$/, '');
    console.log('query', window.query);
    window.IWannaPlay = function () {
      'use strict';
      console.log('In IWannaPlay', window.query);
      window.adWatchedAfterAdblockCheck(window.query);
    };
    if ($('#immViewer').css('display') == 'block') {
      window.location = window.location.href;
    }
  }
}).call(this);
