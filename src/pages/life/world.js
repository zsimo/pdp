"use strict";

var events = require("src/events");
var cell = require("src/pages/life/cell");

const ALIVE = "alive";
var INSTANT = 100;
var ALIVE_CELLS = [];
// var cells = [];
// for (var i = 0; i < count; i += 1) {
//     cells.push(i);
// }


function create () {
    const table = document.querySelector("table");
    const header = document.querySelector("header");
    const padding = 10;
    let tableBottom = table.offsetHeight + header.getBoundingClientRect().height + padding;
    let counter = 1;
    while (tableBottom <= window.innerHeight) {
        new cell(counter, ALIVE_CELLS.indexOf(counter) !== -1);
        counter += 1;
        tableBottom = table.offsetHeight + header.getBoundingClientRect().height + padding;
    }
    const rows = table.tBodies[0].rows;
    table.tBodies[0].removeChild(rows[rows.length - 1]);

    table.addEventListener("click", function (e) {
        const target = e.target;
        target.classList.toggle(ALIVE);
    });
}

module.exports = {
    init: create
};



const start = document.querySelector("button");
start.addEventListener("click", function () {
    setInterval(function () {

        const main = document.querySelector("main");
        const cells = main.querySelectorAll(".cell");
        for (const cell of cells) {
            let activeCount = 0;
            const neighbors = [];
            const rowAbove = cell.parentElement.previousSibling;
            const rowBelow = cell.parentElement.nextSibling;
            if (rowAbove) {
                // topLeft
                neighbors.push(rowAbove.cells[cell.cellIndex - 1]);
                // top
                neighbors.push(rowAbove.cells[cell.cellIndex]);
                // topRight
                neighbors.push(rowAbove.cells[cell.cellIndex + 1]);
            }

            // left
            neighbors.push(cell.previousSibling);
            // right
            neighbors.push(cell.nextSibling);
            if (rowBelow) {
                // belowLeft
                neighbors.push(rowBelow.cells[cell.cellIndex - 1]);
                // below
                neighbors.push(rowBelow.cells[cell.cellIndex]);
                // belowRight
                neighbors.push(rowBelow.cells[cell.cellIndex + 1]);
            }


            for (const neighbor of neighbors) {
                if (neighbor && neighbor.classList.contains(ALIVE)) {
                    activeCount += 1;
                }
            }
            if (activeCount === 2 || activeCount === 3) {
                cell.classList.add("alive");
            } else {
                cell.classList.remove("alive");
            }

        }

    }, INSTANT);
})

