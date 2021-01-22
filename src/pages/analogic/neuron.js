"use strict";

var events = require("src/pages/analogic/events");

module.exports = function (index) {

    var me = document.createElement("div");

    events.on('number', function (number) {
        if (number === index) {
            me.classList.add("activated")
        } else {
           me.classList.remove("activated");
        }
        
    });

    me.className = "neuron";
    me.innerText = index;
    document.body.appendChild(me);

};