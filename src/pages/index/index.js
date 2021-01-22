"use strict";

var main = document.querySelector("main");

var pages = [
    "cell",
    "analaogic"
];

var ul = document.createElement("ul");
pages.forEach(function (page) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = window.location.href + page;
    a.innerText = "page #" + page;
    li.appendChild(a);
    ul.appendChild(li);
});

main.appendChild(ul);