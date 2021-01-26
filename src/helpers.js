"use strict";
module.exports = {
    // see https://flaviocopes.com/how-to-generate-random-number-between/
    getRandomBetween: function (min, max) {
        return Math.floor(Math.random() * max + min);
    }
};



