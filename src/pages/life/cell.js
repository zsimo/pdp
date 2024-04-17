"use strict";

var events = require("src/events");


module.exports = function (index, alive) {
    alive = !!alive;

    var me = document.createElement("td");

    me.className = "cell";
    if (alive) {
        me.classList.add("alive");
    }
    me.innerText = index;
    me.setAttribute("data-index", index);

    const table = document.querySelector("table");
    const rows = table.tBodies[0].rows;
    let row = rows[rows.length - 1];
    if (!row) {
        const tr = document.createElement("tr");
        table.tBodies[0].appendChild(tr);
        row = tr;

    }
    row.appendChild(me);
    if (me.offsetLeft > window.innerWidth - 49) {
        row.removeChild(me);
        const tr = document.createElement("tr");
        table.tBodies[0].appendChild(tr);
    }
    //console.log(table.tBodies[0].rows)
    //document.querySelector("main").appendChild(me);

};