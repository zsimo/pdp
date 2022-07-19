"use strict";

const SIZE = 300;
const INTERVAL = 42;
const THRESHOLD = 90;
var canvas;
var OBJECT_PROP;

document.addEventListener('DOMContentLoaded', function () {

        canvas = document.querySelector("canvas");
        canvas.width = SIZE;
        canvas.height = SIZE;

        const permission = navigator.mediaDevices.getUserMedia({
                video: true
        });
        permission.then(function (stream) {
                const video = document.createElement("video");
                video.srcObject = stream;
                video.play();
                setInterval(updateImage, INTERVAL, video)

        }).catch(function (error) {
                console.log(error);
                alert("camera error");
        });
        console.log(canvas)
});


function updateImage(video) {
        const context = canvas.getContext("2d");
        const minSize = Math.min(video.videoWidth, video.videoHeight);
        const startX = (video.videoWidth - minSize) / 2;
        const startY = (video.videoHeight - minSize) / 2;
        context.drawImage(video, startX, startY, minSize, minSize, 0, 0, SIZE, SIZE);

        const image = context.getImageData(0, 0, SIZE, SIZE);
        var matrix = getPixelMatrix(image.data);
        processMatrix(matrix);
}

function getPixelMatrix (dataArray) {

        const matrix = [];
        for (var i = 1; i <= SIZE; i++) {
                matrix[i] = [];
                for (var j = 1; j <= SIZE; j++) {
                        const groupIndex = (i - 1) * SIZE * 4 + (j - 1) * 4;
                        const red = dataArray[groupIndex + 0];
                        const green = dataArray[groupIndex + 1];
                        const blue = dataArray[groupIndex + 2];
                        matrix[i][j] = (red + green + blue) / 3;
                }
        }
        return matrix;

}

function processMatrix (matrix) {
        isolateObject(matrix);
        const box = getBoundingBox(matrix);
        const boxProp = getBoxProperty(box);
        OBJECT_PROP = boxProp.aspectRatio;
        document.getElementById("output").innerHTML = "Aspect ratio: " + OBJECT_PROP.toFixed(2);

        updateCanvas(matrix);
        drawBox(box);


}

function getBoxProperty (box) {
        const prop = {
                length: 0,
                width: 0,
                aspectRatio: 0
        };

        const deltaX = box.xMax - box.xMin + 1;
        const deltaY = box.yMax - box.yMin + 1;

        prop.length = Math.max(deltaX, deltaY);
        prop.width = Math.min(deltaX, deltaY);
        prop.aspectRatio = prop.width / prop.length;

        return prop;
}

function drawBox (box) {
        const context = canvas.getContext("2d");
        context.beginPath();
        const deltaX = box.xMax - box.xMin;
        const deltaY = box.yMax - box.yMin;
        context.rect(box.xMin, box.yMin, deltaX, deltaY);
        context.stroke();
}

function getBoundingBox (matrix) {
        const bbox = {
                xMin: SIZE + 1,
                xMax: 0,
                yMin: SIZE + 1,
                yMax: 0
        };
        for (var y = 1; y <= SIZE; y++) {
                for (var x = 1; x <= SIZE; x++) {
                        if (matrix[y][x] == 0) {
                                bbox.yMin = Math.min(y, bbox.yMin);
                                bbox.yMax = Math.max(y, bbox.yMax);
                                bbox.xMin = Math.min(x, bbox.xMin);
                                bbox.xMax = Math.max(x, bbox.xMax);
                        }
                }
        }

        return bbox;
}

function isolateObject (matrix) {
        for (var i = 1; i <= SIZE; i++) {
                for (var j = 1; j <= SIZE; j++) {
                        if (matrix[i][j] < THRESHOLD) {
                                matrix[i][j] = 0;
                        } else {
                                matrix[i][j] = 255
                        }
                }
        }
}

function updateCanvas (matrix) {
        const context = canvas.getContext("2d");
        const image = context.getImageData(0, 0, SIZE, SIZE);
        for (var i = 1; i <= SIZE; i++) {
                for (var j = 1; j <= SIZE; j++) {
                        const groupIndex = (i - 1) * SIZE * 4 + (j - 1) * 4;
                        image.data[groupIndex + 0] = matrix[i][j];
                        image.data[groupIndex + 1] = matrix[i][j];
                        image.data[groupIndex + 2] = matrix[i][j];
                }
        }
        context.putImageData(image, 0, 0);

}