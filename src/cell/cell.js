"use strict";

// cell or unit

module.exports = function () {
    
    var activation = 0;


    var connections = [];

    // la forza del segnale (weight) è dato dall'attivazione
    // la funzione di output mappa l'attivazione attuale con un segnale di output
    // può essere a soglia o casuale
    function output () {
        return activation * 2;
    }

    var rules = {
        propagation: function () {
    
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