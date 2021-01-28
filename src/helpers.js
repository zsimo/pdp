"use strict";
module.exports = {
    getRandomBetween: function (min, max) {
        return  Math.floor(Math.random() * (max - min) + min);
    }
};



