"use strict";

var events = require("src/pages/analogic/events");
var neuron = require("src/pages/analogic/neuron");

var COUNT = 250;
var neurons = [];
for (var i = 0; i < COUNT; i += 1) {
    neurons.push(i);
}
randomize();

function getInput (name) {
    return document.querySelector('input[name="'+ name +'"]');
}
function randomize () {
    neurons = neurons.sort(() => Math.random() - 0.5);
}
function order () {
    neurons.length = 0;
    for (var i = 0; i < COUNT; i += 1) {
        neurons.push(i);
    }
}
function clear () {
    document.querySelector("main").innerHTML = "";
}
function create () {
    for (var i = 0; i < neurons.length; i += 1) {
        new neuron(neurons[i]);
    }
}


module.exports = {
    init: create
};

document.querySelector('button[name="number"]').addEventListener("click", function () {
    var number = getInput("number").value || "0";
    events.emit("number", parseInt(number, 10));
});
document.querySelector('button[name="randomize"]').addEventListener("click", function () {
    clear();
    randomize();
    create();
});
document.querySelector('button[name="order"]').addEventListener("click", function () {
    clear();
    order();
    create();
});
document.body.addEventListener("click", function (event) {
    var target = event.target;
    if (target.classList.contains("neuron")) {
        var number = parseInt(target.getAttribute("data-index"), 10);
        events.emit("number", number);
        getInput("number").value = number;
    }
});