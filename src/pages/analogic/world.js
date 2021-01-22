"use strict";

var events = require("src/pages/analogic/events");
var neuron = require("src/pages/analogic/neuron");

var COUNT = 100;

function getInput (name) {
    return document.querySelector('input[name="'+ name +'"]');
}

module.exports = {
    init: function () {

        for (var i = 0; i < COUNT; i += 1) {
            new neuron(i);
        }
    }
};

document.querySelector("button").addEventListener("click", function () {
    var number = getInput("number").value || "0";
    events.emit("number", parseInt(number, 10));
});
document.body.addEventListener("click", function (event) {
    var target = event.target;
    if (target.classList.contains("neuron")) {
        var number = parseInt(target.getAttribute("data-index"), 10);
        events.emit("number", number);
        getInput("number").value = number;
    }
});