"use strict";

var events = require("src/pages/analogic/events");
var neuron = require("src/pages/analogic/neuron");

var COUNT = 200;

module.exports = {
    init: function () {

        for (var i = 0; i < COUNT; i += 1) {
            new neuron(i);
        }
    }
};

document.querySelector("button").addEventListener("click", function () {
    var number = document.querySelector("input").value || "0";
    events.emit("number", parseInt(number, 10));
});
document.body.addEventListener("click", function (event) {
    var target = event.target;
    if (target.classList.contains("neuron")) {
        var number = parseInt(target.innerText, 10);
        events.emit("number", parseInt(target.innerText, 10));
        document.querySelector("input").value = number;
    }
});