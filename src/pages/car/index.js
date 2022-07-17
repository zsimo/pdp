"use strict";

const Car = require("src/pages/car/car.js");
const Road = require("src/pages/car/road.js");


document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.querySelector("canvas");


    const ctx = canvas.getContext("2d");
    const road = new Road(canvas.width / 2, canvas.width * 0.9);
    const car = new Car(road.getLaneCenter(1),100,30,50,"KEYS");
    const traffic=[
        new Car(road.getLaneCenter(1),-100,30,50,"DUMMY", 2)
    ];

    animate();

    function animate () {
        for(let i=0;i<traffic.length;i++){
            traffic[i].update(road.borders,[]);
        }
        car.update(road.borders, traffic);

        canvas.height = window.innerHeight;

        ctx.save();
        ctx.translate(0, -car.y + canvas.height * 0.75)

        road.draw(ctx);
        for(let i=0;i<traffic.length;i++){
            traffic[i].draw(ctx,"#7bb24d");
        }
        car.draw(ctx, "#de6717");

        ctx.restore();

        requestAnimationFrame(animate);
    }
});