"use strict";

const SIZE = 300;
const INTERVAL = 42;
var canvas;

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
        updateCanvas(matrix);
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