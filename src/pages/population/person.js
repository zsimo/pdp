"use strict";

var events = require("src/events");
var helpers = require("src/helpers");

const TOP = 20;
const BOTTOM = document.querySelector("main").clientHeight;
const LEFT = 20;
const RIGHT = document.querySelector("main").clientWidth;

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
        this.unbindFood();
        this.me.className = "food";
        events.emit("food", this.me.style.top, this.me.style.left);
    } else {
        this.life -= 1;
    }

}

var person = function (index) {

    this.me = document.createElement("div");
    this.life = helpers.getRandomBetween(10, 100);
    this.unbindMove = events.on('move', linear.bind(this));


    var unbindDestroy = events.on('destroy', function (number) {

        this.unbindFood();
        this.unbindMove();
        unbindDestroy();

        document.querySelector("main").removeChild(this.me);

    }.bind(this));

    this.unbindFood = events.on('food', function (top, left) {

        if (top === this.me.style.top || left === this.me.style.left) {
            console.log(this.me.getAttribute("data-index"), "mangiato", this.life)
            this.life += 50;
        }

    }.bind(this));

    this.me.style.top = helpers.getRandomBetween(TOP, BOTTOM) + "px";
    this.me.style.left = helpers.getRandomBetween(LEFT, RIGHT) + "px";
    this.me.className = "person";
    // me.innerText = index;
    this.me.setAttribute("data-index", index);
    document.querySelector("main").appendChild(this.me);

};

module.exports = person;