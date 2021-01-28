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
function linear () {

    this.me.style.top = linearNext(parseInt(this.me.style.top, 10), VERTICAL) + "px";
    this.me.style.left = linearNext(parseInt(this.me.style.left, 10), HORIZONTAL) + "px";

    if (this.life === 0) {
        this.unbindMove();
        this.me.className = "food";
    } else {
        this.life -= 1;
    }

}

var person = function (index) {

    this.me = document.createElement("div");
    this.life = helpers.getRandomBetween(10, 100);
    this.unbindMove = events.on('move', linear.bind(this));


    var unbindDestroy = events.on('destroy', function (number) {

        this.unbindMove();
        unbindDestroy();

        document.querySelector("main").removeChild(this.me);

    }.bind(this));

    this.me.style.top = helpers.getRandomBetween(TOP, BOTTOM) + "px";
    this.me.style.left = helpers.getRandomBetween(LEFT, RIGHT) + "px";
    this.me.className = "person";
    // me.innerText = index;
    this.me.setAttribute("data-index", index);
    document.querySelector("main").appendChild(this.me);

    console.log(this);

};

module.exports = person;