(function () {
  var css = window.document.createElement('style');
  css.type = "text/css";
  css.innerHTML = ("" +
    "icon {" +
    "  width: 1em;" +
    "  height: 1em;" +
    "  display: inline-block;" +
    "  background-size: contain;" +
    "  background-repeat: none;" +
    "}" +
    ".games-icon {" +
    "  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACIElEQVR4nJVRTWsUQRSs7tcfM90z07MJMSubrEIgHpQg4iWH6M2Pv+DZc0CMYLz4AxT8BUI8KZ7Ei1dPikJQFM+CN0Viko3Zmc3OPA9xN+tiDNapX3W9Kroa+D+cBRBGCXmIsAFg4S+8BbB1ZEyz2Tw1SLLGzCuiOwCWjly0xpyOrH1ORKsA0Mjz+5MTE7V3jqWUy2PyP+fEe8pD+JyHwMaYNefc+ZlWi2dbLU68f09EZswgA0Y7EOKS9/4kEQHML6t+v9zZ2cF2p/MKwOU0SVpZmj7MQ1hXRBcBbAOAGuzXVRUXRYGyLN9CiMdlr1f6JGlZrb6ykIsk5QsiSja3NiGJKlTVQfbgEEfRhenp6aHpAM652yfabZ7Zf86z0TvKskyUZQmj9URV1+29Xu+aUuouEd0SQFEzv6uq6kNd15NFUTzRWt8siqI+cCCajaPoY5okHLKMGyFwIwROk4SNMT8Huvm5OWmNyX+PKwDaACCVUlfTND3TyHMk3kNrDaUUiAhSiNcAkIew8n1j45tS6gcRLQN4AOALAEgp5VNmfkNEiGMHYy2EGNayFtlowXt/L8uySa0UpBAFgGGDstvtbqZZtrjd6dzoFl1YYyClBNc1mPmTjWzR7/exu7uLvb3+I631w/GSh8hDuH682eRjU1PsnWOl1BIAWGOWoyi6kjhHhy6PfNmqi2M2WldaqfZRejFOEJESQpyr97EOgP9l8Ass46OBHNMw9gAAAABJRU5ErkJggg==');" +
    "}" +
    ".points-icon {" +
    "  background-image: url('data:image/png;base64,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');" +
    "}" +
    ".premium-icon {" +
    "  background-image: url('/stuff/star.png');" +
    "}" +
    ".no-premium-icon {" +
    "  display: none;" +
    "}" +
    ".boy-icon {" +
    "  background-image: url('/stuff/boy.png');" +
    "}" +
    ".girl-icon {" +
    "  background-image: url('/stuff/girl.png');" +
    "}" +
    ".error {" +
    "  color: red !important;" +
    "}" +
    ".link {" +
    "  cursor:pointer !important;" +
    "}" +
    ".link.colored {" +
    "  color: #55E;" +
    "}" +
    ".info {" +
    "  color: #666;" +
    "  cursor: default;" +
    "}" +
    ".darkened {" +
    "  background: #555;" +
    "}" +
    ".link img {" +
    "  height: 1em !important;" +
    "}" +
    ".link:hover {" +
    "  text-decoration: underline;" +
    "}" +
    "#chat > .tchatIcon {" +
    "  display: none;" +
    "}" +
    "span.canal_joueurs, span.canal_meneur {" +
    "  display: inline-block !important;" +
    "  width: 100%;" +
    "}" +
    ".tinyTip_salle_de_jeu player {" +
    "  font-weight: bold !important;" +
    "}" +
    ".tinyTip_salle_de_jeu {" +
    "  color: black;" +
    "  width: auto !important;" +
    "  background: white !important;" +
    "  border: 2px solid #444 !important;" +
    "  border-radius: 3px !important;" +
    "  position: absolute !important;" +
    "  padding: 10px 5px !important;" +
    "  z-index: 1000 !important;" +
    "}" +
    ".tinyTip_salle_de_jeu ul {" +
    "  padding: 0 5px 0 20px;" +
    "  margin: 7px 0;" +
    "}" +
    ".tinyTip_salle_de_jeu.smileyBox {" +
    "  margin-left: -120px;" +
    "  margin-top: -5px;" +
    "  padding: 5px 20px;" +
    "  text-align: center;" +
    "}" +
    ".tinyTip_salle_de_jeu > * {" +
    "  background: white !important;" +
    "}" +
    ".tinyTip_salle_de_jeu img, table_t img {" +
    "  height : 1em;" +
    "}" +
    ".tinyTip_salle_de_jeu form {" +
    "    display: block !important;" +
    "    width: 95% !important;" +
    "    margin: 0 2.5%; !important" +
    "}" +
    ".tinyTip_salle_de_jeu input:not([type=hidden]) {" + 
    "  width: 50% !important;" +
    "}" +
    "#enCours tr:not(:first-child):not(:last-child) > td:first-child {" +
    "  text-align: left !important;" +
    "  font-weight: bold !important;" +
    "  font-size: 11px !important;" +
    "} " +
    "#enCours tr:not(:first-child) > td:not(:first-child) {" +
    "  text-align: center !important;" +
    "} " +
    "#enCours tr > td:nth-child(4) {" +
    "  display: none !important;" +
    "}" +
    "#boxRed img, #last_top_10 img {" +
    "  height: 8px;" +
    "}");
  window.document.body.appendChild(css);
}).call(this);
