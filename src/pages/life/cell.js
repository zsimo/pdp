"use strict";

var events = require("src/events");


module.exports = function (index, alive) {
    alive = !!alive;

    var me = document.createElement("div");

    me.className = "cell";
    if (alive) {
        me.classList.add("alive");
    }
    me.innerText = index;
    me.setAttribute("data-index", index);
    document.querySelector("main").appendChild(me);

};