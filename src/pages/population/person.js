"use strict";

var events = require("src/events");
var helpers = require("src/helpers");

const TOP = 0;
const BOTTOM = document.body.clientHeight;
const LEFT = 0;
const RIGHT = document.body.clientWidth;
const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";
var horizontal_step = 1;
var vertical_step = 1;

function randomNext (current, direction) {
    var newCord = current + (helpers.getRandomBetween(1, 2) === 1 ? -1 : 1);
    if (direction === HORIZONTAL) {
        return Math.min(Math.max(newCord, TOP), BOTTOM);
    } else {
        return Math.min(Math.max(newCord, LEFT), RIGHT);
    }
}
function linearNext (current, direction) {
    if (direction === HORIZONTAL) {
        if (current <= LEFT || current >= RIGHT) {
            horizontal_step = - horizontal_step;
        }
        return current + horizontal_step;
    } else {
        if (current <= TOP || current >= BOTTOM) {
            vertical_step = - vertical_step;
        }
        return current + vertical_step;
    }

}

function randomMovement (me) {
    me.style.top = randomNext(parseInt(me.style.top, 10), VERTICAL) + "px";
    me.style.left = randomNext(parseInt(me.style.left, 10), HORIZONTAL) + "px";
}
function linear (me) {
    me.style.top = linearNext(parseInt(me.style.top, 10), VERTICAL) + "px";
    me.style.left = linearNext(parseInt(me.style.left, 10), HORIZONTAL) + "px";
}


module.exports = function (index) {

    var me = document.createElement("div");
    var unbindMove = events.on('move', function () {

        linear(me);

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