"use strict";

// cell or unit

module.exports = function () {
    
    var activation = 0;


    var connections = [];

    function output () {
        return activation * 2;
    }

    var rules = {
        propagation: function {
    
        },
        activation: function (input) {
            activation = input * activation;
            return activation;
        },
        learning: function () {
            // come i pattern di connettività cambiano
        }
    };


    return function (input) {
        rules.activation(input);
        return output();
    }
};


// connession unidirezionali con pesi diversi


// vettore con tutte le attivationi delle unità
var activations = [];