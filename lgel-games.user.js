// ==UserScript==
// @name        lgel-games
// @namespace   http://www.github.com/Jerskouille/lgel
// @description lgel
// @include     *loups-garous-en-ligne.com/room
// @version     1.0.2
// @grant       none
// ==/UserScript==

var MutationObserver = window.MutationObserver;
var myObserver       = new MutationObserver (mutationHandler);
var obsConfig        = {
    childList: true, attributes: true,
    subtree: true,   attributeFilter: ['class']
};

myObserver.observe (document, obsConfig);

function mutationHandler (mutationRecords) {

    mutationRecords.forEach ( function (mutation) {

        if (    mutation.type               == "childList"
            &&  typeof mutation.addedNodes  == "object"
            &&  mutation.addedNodes.length
        ) {
            for (var J = 0, L = mutation.addedNodes.length;  J < L;  ++J) {
                checkForCSS_Class (mutation.addedNodes[J], "tinyTip_salle_de_jeu");
            }
        }
        else if (mutation.type == "attributes") {
            checkForCSS_Class (mutation.target, "tinyTip_salle_de_jeu");
        }
    } );
}

function checkForCSS_Class (node, className) {
    if (node.nodeType === 1) {
        if (node.classList.contains (className) ) {
            console.log (
                'New node with class "' + className + '" = ', node
            );
             console.log("new div!")
        }
    }
}