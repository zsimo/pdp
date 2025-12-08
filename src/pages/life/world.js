"use strict";

var events = require("src/events");
var cell = require("src/pages/life/cell");

let generation = 0;
const main = document.querySelector("main");
const generationLabel = document.querySelector("#generation");
const ALIVE = "alive";
const INSTANT = 100;
const X = 0;
const Y = 1;
const ALIVE_CELLS = [
    // 1358, 1428, 1498, 1429, 1360

    // 1, 23, 4, 56, 6, 7, 8, 9, 10,
    // 20, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    // 30, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    // 40, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    // 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    // 60, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60
];
const PATTERNS = {
    blinker: [
        [5, 5],
        [5, 6],
        [5, 7],
    ],
    glider: [
        [5, 5],
        [6, 6],
        [7, 6],
        [7, 5],
        [7, 4],
    ],
    pentadecathlon: [
        [15, 5],
        [15, 6],
        [15, 7],
        [16, 7],
        [17, 6],

        [11, 9],
        [10, 9],
        [9, 9],
        [11, 10],
        [10, 11],

        [16, 11],
        [17, 11],
        [17, 12],
        [18, 12],
        [16, 13],
    ]
};
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

    main.addEventListener("click", function (e) {
        const target = e.target;
        if (target.tagName === "TD") {
            target.classList.toggle(ALIVE);
        }
    });
}

module.exports = {
    init: create
};


function _iterate () {

    let start = Date.now();
    const cells = main.querySelectorAll(".cell");

    // const fragment = new DocumentFragment();
    const newTable = document.createElement("table");
    const newTbody = newTable.createTBody();
    //const newTbody = document.createElement("tbody");
    // fragment.appendChild(newTable);
    let tr;
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
        const newCell = cell.cloneNode(true);
        if (activeCount < 2 || activeCount > 3) {
            newCell.classList.remove("alive");
        } else if (activeCount === 3) {
            newCell.classList.add("alive");
        }
        //console.log(cell.parentElement.rowIndex);
        // const tr = tbody.insertRow(-1);
        if (!newTbody.rows[cell.parentElement.rowIndex]) {
            //tr = document.createElement("tr");
            tr = newTbody.insertRow(-1);
            // newTbody.appendChild(tr);
        }
        if (activeCount) {
            //newCell.innerText = activeCount;
        }

        tr.appendChild(newCell);

    }

    // //table.replaceChild(table.tBodies[0], newTbody)
    // table.tBodies[0] = newTbody;


    //main.replaceChild(main.querySelector("table"), newTable);

    main.replaceChildren(newTable);

    console.log(Date.now()-start);

    generation ++;

    generationLabel.innerText = "Generation: " + generation;

    if (document.querySelectorAll(".cell.alive").length === 0) {
        clearInterval(intervalId);
    }

}

var intervalId;
const start = document.querySelector("button#start");
start.addEventListener("click", function () {
    intervalId = setInterval(_iterate, INSTANT);
});
const stop = document.querySelector("button#stop");
stop.addEventListener("click", function () {
    clearInterval(intervalId);
});
const clear = document.querySelector("button#clear");
function _clear () {
    clearInterval(intervalId);
    generation = 0;
    generationLabel.innerText = "";
    const liveCells = document.querySelectorAll(".cell.alive");
    for (const cell of liveCells) {
        cell.classList.remove("alive");
    }
}
clear.addEventListener("click", _clear);
const patterns = document.querySelector("select");
patterns.addEventListener("change", function (event) {
    const patterName = this.value;
    _clear();
    _setPattern(patterName);
    console.log(patterName);
});
function _setPattern (patterName) {
    const table = document.querySelector("table");
    if (PATTERNS[patterName]) {
        for (const coordinate of PATTERNS[patterName]) {
            table.rows[coordinate[Y]].cells[coordinate[X]].classList.add("alive");
        }
    }
}
