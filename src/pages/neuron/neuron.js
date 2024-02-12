"use strict";

function Neuron(bias) {
    this.id = crypto.randomUUID();
    /**
     * Much like people, each neuron will put a “spin” on the information it receives
     * (i.e. bias) before processing it and passing it along
     * @type {number|*}
     */
    this.bias = bias == undefined ? Math.random() * 2 - 1 : bias;

    /**
     * Much like a human organization, neural networks frequently have a “hierarchy” to them;
     * “you get information from different sources, you weigh the information based on who told you it,
     * you create your conclusion, and you pass it along to your superiors” — neural networks work almost identically to this.
     * In these variables we store information regarding which neurons (if any)
     * a particular neuron listens to, how much they value the “incoming” neuron’s input,
     * and which neurons the particular neuron has to forward information to
     * @type {{weights: {}, neurons: {}}}
     */
    this.incoming = {
        neurons: {}, // new Map()
        weights: {} // new Map()
    }
    // Outgoing Connections
    this.outgoing = {
        neurons: {}, // new Map()
        weights: {} // new Map()
    }
    /**
     * this._output let’s us know what “percentage” of the “wrongness” in the previous action
     * taken was a particular neurons fault for that action
     */
    this._output; // f'(x)
    /**
     *  this.output gives us the last result (i.e. conclusion) that a particular neuron came to given the last set of inputs.
     */
    this.output; // f(x)
    /**
     * this.error let’s us know what “percentage” of the “wrongness” in the previous actions taken was “internalized”
     * by a particular neuron — and should be passed on “down the chain”
     */
    this.error; // E'(f(x))

    this.connect = function(neuron, weight) {
        this.outgoing.neurons[neuron.id] = neuron;
        neuron.incoming.neurons[this.id] = this;
        this.outgoing.weights[neuron.id] = neuron.incoming.weights[this.id] = weight == undefined ? Math.random() * 2 - 1 : weight; // weight ∈ ℝ && -1 < weight < 1
    }

    this.activate = function(input) {
        const self = this;

        function sigmoid(x) { return 1 / (1 + Math.exp(-x)) } // f(x) = 1 / (1 + e^(-x))
        function _sigmoid(x) { return sigmoid(x) * (1 - sigmoid(x)) } // f'(x) = f(x) * (1 - f(x))

        // Input Neurons
        if(input) {
            this._output = 1; // f'(x)
            this.output = input; // f(x)
        }
        // Hidden/Output Neurons
        else {
            // Σ (x • w)
            const sum = Object.keys(this.incoming.targets).reduce(function(total, target, index) {
                return total += self.incoming.targets[target].output * self.incoming.weights[target];
            }, this.bias);

            this._output = _sigmoid(sum); // f'(x)
            this.output = sigmoid(sum); // f(x)
        }

        return this.output;
    }

    this.propagate = function(target, rate=0.3) {
        const self = this;

        //𝛿E /𝛿squash
        const sum = target == undefined ? Object.keys(this.outgoing.targets).reduce(function(total, target, index) {
            // Δweight
            self.outgoing.targets[target].incoming.weights[self.id] = self.outgoing.weights[target] -= rate * self.outgoing.targets[target].error * self.output;

            return total += self.outgoing.targets[target].error * self.outgoing.weights[target];
        }, 0) : this.output - target;

        // 𝛿squash/𝛿sum
        this.error = sum * this._output

        // Δbias
        this.bias -= rate * this.error;

        return this.error;
    }
    console.log(this)
}

module.exports = Neuron;