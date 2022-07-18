"use strict";

const utils = require("src/pages/car/utils.js");

class NeuralNetwork {
    constructor(neuronCounts){

        this.levels=[];
        for(let i=0;i<neuronCounts.length-1;i++){
            this.levels.push(new Level(
                neuronCounts[i],neuronCounts[i+1]
            ));
        }
    }

    feedForward (givenInputs, network) {
        return utils.networkFeedForward(givenInputs, network);
    }
}




class Level {
    constructor(inputCount, outputCount){
        this.inputs=new Array(inputCount);
        this.outputs=new Array(outputCount);
        this.biases=new Array(outputCount);

        this.weights=[];
        for(let i=0;i<inputCount;i++){
            this.weights[i]=new Array(outputCount);
        }

        utils.randomize(this);


    }

    randomize (level) {
        utils.randomize(level);
    }

    feedForward (givenInputs, level) {

        return utils.feedForward(givenInputs, level);

    }

}


module.exports = NeuralNetwork;
