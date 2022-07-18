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
    static mutate(network,amount=1){
        network.levels.forEach(level => {
            for(let i=0;i<level.biases.length;i++){
                level.biases[i]=utils.lerp(
                    level.biases[i],
                    Math.random()*2-1,
                    amount
                )
            }
            for(let i=0;i<level.weights.length;i++){
                for(let j=0;j<level.weights[i].length;j++){
                    level.weights[i][j]=utils.lerp(
                        level.weights[i][j],
                        Math.random()*2-1,
                        amount
                    )
                }
            }
        });
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
