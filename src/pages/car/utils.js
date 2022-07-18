"use strict";

const utils = {
    lerp: function (A,B,t){
        return A+(B-A)*t;
    },
    getIntersection: function(A,B,C,D){
        const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
        const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
        const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);

        if(bottom!=0){
            const t=tTop/bottom;
            const u=uTop/bottom;
            if(t>=0 && t<=1 && u>=0 && u<=1){
                return {
                    x: utils.lerp(A.x,B.x,t),
                    y: utils.lerp(A.y,B.y,t),
                    offset:t
                }
            }
        }

        return null;
    },
    polysIntersect: function(poly1, poly2){
        for(let i=0;i<poly1.length;i++){
            for(let j=0;j<poly2.length;j++){
                const touch=utils.getIntersection(
                    poly1[i],
                    poly1[(i+1)%poly1.length],
                    poly2[j],
                    poly2[(j+1)%poly2.length]
                );
                if(touch){
                    return true;
                }
            }
        }
        return false;
    },
    feedForward: function (givenInputs, level) {
        for(let i=0;i<level.inputs.length;i++){
            level.inputs[i]=givenInputs[i];
        }

        for(let i=0;i<level.outputs.length;i++){
            let sum=0
            for(let j=0;j<level.inputs.length;j++){
                sum+=level.inputs[j]*level.weights[j][i];
            }

            if(sum>level.biases[i]){
                level.outputs[i]=1;
            }else{
                level.outputs[i]=0;
            }
        }

        return level.outputs;
    },

    networkFeedForward: function (givenInputs, network) {
        let outputs= utils.feedForward(
            givenInputs,network.levels[0]);
        for(let i=1;i<network.levels.length;i++){
            outputs=utils.feedForward(
                outputs,network.levels[i]);
        }
        return outputs;
    },
    randomize: function (level) {
        for(let i=0;i<level.inputs.length;i++){
            for(let j=0;j<level.outputs.length;j++){
                level.weights[i][j]=Math.random()*2-1;
            }
        }

        for(let i=0;i<level.biases.length;i++){
            level.biases[i]=Math.random()*2-1;
        }
    }
};

module.exports = utils;