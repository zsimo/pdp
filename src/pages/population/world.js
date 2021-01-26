"use strict";

const FREQUENCY = 10;
var events = require("src/events");
var person = require("src/pages/population/person");
const COUNTER = 1;

function create () {
    for (var i = 0; i < COUNTER; i += 1) {
        new person(i);
    }
}

module.exports = {
    init: create
};



setInterval(function () {
    events.emit("move");
}, FREQUENCY);
