"use strict";

var events = require("src/pages/analogic/events");


var DEFAULT_HEIGHT = 31;
var DEFAULT_BACKGROUND = {
    red: 58,
    green: 72,
    blue: 96
};
var ACTIVE_BACKGROUND = {
    red: 123,
    green: 178,
    blue: 77 
};

function getInput (name) {
    return document.querySelector('input[name="'+ name +'"]');
}
function difference(a, b) {
    return Math.abs(a - b);
  }
function calculateActivation (a, b, factor) {
    return -(difference(a, b) - factor);
}

function colorGradient(rgbColor1, rgbColor2, fadeFraction) {
    var color1 = rgbColor1;
    var color2 = rgbColor2;
    var fade = fadeFraction;

    var diffRed = color2.red - color1.red;
    var diffGreen = color2.green - color1.green;
    var diffBlue = color2.blue - color1.blue;

    var gradient = {
      red: parseInt(Math.floor(color1.red + (diffRed * fade)), 10),
      green: parseInt(Math.floor(color1.green + (diffGreen * fade)), 10),
      blue: parseInt(Math.floor(color1.blue + (diffBlue * fade)), 10),
    };

    return 'rgb(' + gradient.red + ',' + gradient.green + ',' + gradient.blue + ')';
  }

module.exports = function (index) {

    var me = document.createElement("div");

    var unbindNumber = events.on('number', function (number) {

        var factor = getInput("factor").value;
        var activation = calculateActivation(number, index, factor);

        me.style.borderRadius = "0";
        if (activation > 0) {
            me.classList.add("activated")
            // me.style.height = (DEFAULT_HEIGHT * activation) + "px";        
            //me.style.borderRadius = (activation * 10 )+ "%";
            me.style.background = colorGradient(DEFAULT_BACKGROUND, ACTIVE_BACKGROUND, activation);
            if (index === number) {
                me.style.borderRadius = "50%";
            }
        } else {
            me.classList.remove("activated");
            // me.style.height = DEFAULT_HEIGHT + "px";
            me.style.background = "rgb(58, 72, 96)";
        }

        
    });

    
    var unbindDestroy = events.on('destroy', function (number) {

        unbindNumber();
        unbindDestroy();

        document.querySelector("main").removeChild(me);
        
    });
    

    me.className = "neuron";
    me.innerText = index;
    me.setAttribute("data-index", index);
    document.querySelector("main").appendChild(me);

};