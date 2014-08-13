(function () {
  var css = window.document.createElement('style');
  css.type = "text/css";
  css.innerHTML = ("" +
    ".error {" +
    "  color: red !important;" +
    "}" +
    ".link {" +
    "  cursor:pointer !important;" +
    "}" +
    ".link:hover {" +
    "  text-decoration: underline;" +
    "}" +
    ".tinyTip_salle_de_jeu player {" +
    "  font-weight: bold !important;" +
    "}" +
    ".tinyTip_salle_de_jeu {" +
    "  width: auto !important;" +
    "  background: white !important;" +
    "  border: 2px solid #444 !important;" +
    "  border-radius: 3px !important;" +
    "  position: absolute !important;" +
    "  z-index: 1000 !important;" +
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
