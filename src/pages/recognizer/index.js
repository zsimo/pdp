"use strict";

const SIZE = 300;
const INTERVAL = 42;
const THRESHOLD = 90;
var canvas;
var OBJECT_PROP;
var OBSERVATIONS = [];
var OBS_COUNT = 0;
const DIMENSION = 2;

document.addEventListener('DOMContentLoaded', function () {

        document.querySelector("button").addEventListener("click", learn);
        document.querySelector("#objectName").addEventListener("keypress", checkKeyPress);

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


function learn () {
        const name = document.getElementById("objectName").value;
        if (!name) {
                alert("enter a name");
                return;
        }
        OBS_COUNT ++;
        OBSERVATIONS[OBS_COUNT] = {
                name : name,
                prop: OBJECT_PROP
        };
        document.getElementById("objectName").value = "";
}
function checkKeyPress (event) {
        if (event.key === "Enter") {
                learn();
        }
}

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

function countBlackPixels (matrix) {
        var count = 0;
        for (var i = 1; i <= SIZE; i ++ ) {
                for (var j = 1; j <= SIZE; j ++ ) {
                        if (matrix[i][j] == 0) {
                                count ++;
                        }
                }
        }
        return count;
}


function processMatrix (matrix) {
        isolateObject(matrix);
        const box = getBoundingBox(matrix);
        const boxProp = getBoxProperty(box);
        const blackPixels = countBlackPixels(matrix);
        const boxArea = boxProp.width * boxProp.length;
        const fullness = blackPixels / boxArea;

        OBJECT_PROP = [];
        OBJECT_PROP[1] = boxProp.aspectRatio;
        OBJECT_PROP[2] = fullness;

        recognize(OBJECT_PROP);

        updateCanvas(matrix);
        drawBox(box);

}

function recognize (currentObject) {
        var name;
        if (OBS_COUNT === 0) {
                name = "?";
        } else {
                var neighbor = getNearestNeighbor(currentObject);
                name = neighbor.name;
        }
        document.getElementById("output").innerHTML = name;
}

function distance (p1, p2) {
        var distance = 0;
        for (var i = 1; i <= DIMENSION; i ++) {
                distance += (p1[i] - p2[i]) * (p1[i] - p2[i]);
        }
        return Math.sqrt(distance);
}
function getNearestNeighbor (currentObject) {
        var neighbor;
        var minDist;
        for (var i = 1; i <= OBS_COUNT; i++ ) {
                var dist = distance(currentObject, OBSERVATIONS[i].prop);
                if (!minDist || minDist > dist) {
                        minDist = dist;
                        neighbor = OBSERVATIONS[i];
                }
        }

        return neighbor;
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