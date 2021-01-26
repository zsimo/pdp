"use strict";

var events = require("src/events");
var helpers = require("src/helpers");

const TOP = 0;
const BOTTOM = document.body.clientHeight;
const LEFT = 0;
const RIGHT = document.body.clientWidth;
const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

function next (current, direction) {

    var newCoord = current + (helpers.getRandomBetween(1, 2) === 1 ? -1 : 1);
    if (direction === HORIZONTAL) {
        return Math.min(Math.max(newCoord, TOP), BOTTOM);
    } else {
        return Math.min(Math.max(newCoord, LEFT), RIGHT);
    }
}


module.exports = function (index) {

    var me = document.createElement("div");

    var unbindMove = events.on('move', function () {

        me.style.top = next(parseInt(me.style.top, 10), VERTICAL) + "px";
        me.style.left = next(parseInt(me.style.left, 10), HORIZONTAL) + "px";

    });


    var unbindDestroy = events.on('destroy', function (number) {

        unbindMove();
        unbindDestroy();

        document.querySelector("main").removeChild(me);

    });


    me.style.top = helpers.getRandomBetween(TOP, BOTTOM) + "px";
    me.style.left = helpers.getRandomBetween(LEFT, RIGHT) + "px";
    me.className = "person";
    // me.innerText = index;
    me.setAttribute("data-index", index);
    document.querySelector("main").appendChild(me);

};