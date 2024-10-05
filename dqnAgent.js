class DQNAgent {
    constructor(stateSize, actionSize) {
        this.stateSize = stateSize;
        this.actionSize = actionSize;

        this.memory = [];
        this.gamma = 0.95;    // discount rate
        this.epsilon = 1.0;   // exploration rate
        this.epsilonMin = 0.01;
        this.epsilonDecay = 0.995;
        this.learningRate = 0.001;

        this.model = this.createModel();
        console.log("DQN Agent created with state size:", this.stateSize, "and action size:", this.actionSize);
    }

    createModel() {
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 24, activation: 'relu', inputShape: [this.stateSize] }));
        model.add(tf.layers.dense({ units: 24, activation: 'relu' }));
        model.add(tf.layers.dense({ units: this.actionSize, activation: 'linear' }));
        model.compile({
            optimizer: tf.train.adam(this.learningRate),
            loss: 'meanSquaredError'
        });
        console.log("Model created.");
        return model;
    }

    act(state) {
        if (Math.random() <= this.epsilon) {
            const randomAction = Math.floor(Math.random() * this.actionSize);
            console.log("Exploration: selected random action", randomAction);
            return randomAction;
        }

        return tf.tidy(() => {
            const stateTensor = tf.tensor2d([state], [1, this.stateSize]);
            const prediction = this.model.predict(stateTensor);
            const action = prediction.argMax(1).dataSync()[0];
            stateTensor.dispose();  // Dispose the tensor after usage
            console.log("Exploitation: selected action", action);
            return action;
        });
    }

    remember(state, action, reward, nextState, done) {
        this.memory.push([state, action, reward, nextState, done]);
        console.log("State remembered:", { state, action, reward, nextState, done });
    }

    async replay(batchSize) {
        if (this.memory.length < batchSize) {
            return;
        }
    
        const minibatch = this.getRandomSample(this.memory, batchSize);
    
        const states = tf.tensor2d(minibatch.map(e => e[0]));  // states should be a 2D array
        const nextStates = tf.tensor2d(minibatch.map(e => e[3]));  // nextStates should also be a 2D array
    
        const predictions = this.model.predict(states);
        const nextStatePredictions = this.model.predict(nextStates);
    
        for (let i = 0; i < batchSize; i++) {
            await tf.tidy(async () => {  // Ensure the callback here is also async
                const [state, action, reward, , done] = minibatch[i];
                let target = reward;

                if (!done) {
                    const futureReward = nextStatePredictions.slice([i, 0], [1, this.actionSize]).max().arraySync()[0];
                    target = reward + this.gamma * futureReward;
                }

                const targetF = predictions.slice([i, 0], [1, this.actionSize]).arraySync()[0]; // Get as array
                targetF[action] = target;

                // Check the length of state and targetF
                console.log('state:', state, 'targetF:', targetF);

                if (!Array.isArray(state) || state.length !== this.stateSize) {
                    throw new Error(`State should be an array of length ${this.stateSize}. Current state: ${JSON.stringify(state)}`);
                }

                const stateTensor = tf.tensor2d([state]);  // Ensure state is a 2D array
                const targetTensor = tf.tensor2d([targetF]);  // Ensure targetF is a proper 2D array

                await this.model.fit(stateTensor, targetTensor, { epochs: 1, verbose: 0 });
                stateTensor.dispose();
                targetTensor.dispose();
            });
        }
    
        states.dispose();
        nextStates.dispose();
        predictions.dispose();
        nextStatePredictions.dispose();
    
        if (this.epsilon > this.epsilonMin) {
            this.epsilon *= this.epsilonDecay;
        }
    }

    getRandomSample(array, size) {
        const shuffled = array.slice(0);
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        console.log("Random sample taken from memory.");
        return shuffled.slice(0, size);
    }
}
