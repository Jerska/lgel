var css = document.createElement('style');
css.type = "text/css";
css.innerHTML = ("" +
  ".tinyTip_salle_de_jeu {" +
  "  width: auto !important;" +
  "  background: white !important;" +
  "  border: 1px solid #777 !important;" +
  "  border-radius: 2px !important;" +
  "  position: absolute !important;" +
  "  z-index: 1000 !important;" +
  "}" +
  ".tinyTip_salle_de_jeu > * {" +
  "  background: white !important;" +
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
  "}");
document.body.appendChild(css);

