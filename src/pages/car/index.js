"use strict";

const Car = require("src/pages/car/car.js");
const Road = require("src/pages/car/road.js");

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.querySelector("canvas");


    const ctx = canvas.getContext("2d");
    const road = new Road(canvas.width / 2, canvas.width * 0.9);
    const car = new Car(road.getLaneCenter(1),0,30,50);

    animate();

    function animate () {
        car.update(road.borders);

        canvas.height = window.innerHeight;

        ctx.save();
        ctx.translate(0, -car.y + canvas.height * 0.75)

        road.draw(ctx);
        car.draw(ctx);

        ctx.restore();

        requestAnimationFrame(animate);
    }
});