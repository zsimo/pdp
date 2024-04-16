"use strict";

var events = require("src/events");
var cell = require("src/pages/life/cell");

var INSTANT = 1000;
var ALIVE_CELLS = [34, 45, 54, 56, 57];
var count = 100;
// var cells = [];
// for (var i = 0; i < count; i += 1) {
//     cells.push(i);
// }


function create () {
    for (var i = 1; i <= count; i += 1) {
        new cell(i, ALIVE_CELLS.indexOf(i) !== -1);
    }
}

module.exports = {
    init: create
};



setInterval(function () {
    var main = document.querySelector("main");
    var cells = main.querySelectorAll(".cell");
    var cell = cells[54];
    var index = parseInt(cell.getAttribute("data-index"), 10);
    // 44, 45, 46
    // 54,   , 56
    // 64, 65, 66
    var neighbors = [];
    if (index - 11) {
        neighbors.push(index - 11);
    }
    if (index - 10) {
        neighbors.push(index - 10);
    }
    if (index - 9) {
        neighbors.push(index - 9);
    }
    console.log(cell, index);
}, INSTANT);
// document.body.addEventListener("click", function (event) {
//     var target = event.target;
//     if (target.classList.contains("neuron")) {
//         var number = parseInt(target.getAttribute("data-index"), 10);
//         events.emit("number", number);
//         getInput("number").value = number;
//     }
// });