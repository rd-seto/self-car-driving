# Self-Driving Car AI Simulation

![Self-Driving Car AI Demo](https://via.placeholder.com/468x300.png?text=Self-Driving+Car+AI+Demo)

## 🚗 Overview

Welcome to the Self-Driving Car AI Simulation project! This project demonstrates the power of machine learning and neural networks in teaching a virtual car to navigate through traffic and avoid obstacles. Using evolutionary algorithms, our AI cars learn and improve their driving skills over multiple generations.

## 🚀 Features

- **Neural Network-powered AI**: Each car is controlled by its own neural network "brain".
- **Sensor System**: Cars use ray-casting sensors to detect their environment.
- **Evolutionary Learning**: Cars improve over generations through natural selection and mutation.
- **Traffic Simulation**: Includes other vehicles as obstacles for a more realistic scenario.
- **Real-time Visualization**: Watch the learning process unfold with our intuitive GUI.

## 🛠 Technologies Used

- JavaScript (ES6+)
- HTML5 Canvas for rendering
- Custom Neural Network implementation
- Evolutionary Algorithms

## 🏁 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Basic understanding of HTML and JavaScript (for customization)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/self-driving-car-ai.git
   ```
2. Navigate to the project directory:
   ```
   cd self-driving-car-ai
   ```
3. Open `index.html` in your web browser.

## 🎮 How to Use

1. **Start the Simulation**: Open `index.html` in your browser to begin.
2. **Watch and Learn**: Observe as cars learn to navigate through traffic.
3. **Save the Best**: Click the "Save" button to store the best performing neural network.
4. **Load and Continue**: Use the "Load" button to continue training from a saved state.

## 🧠 How It Works

1. **Initialization**: A population of cars with random neural networks is created.
2. **Sensing**: Each car uses ray-casting to detect obstacles and road boundaries.
3. **Decision Making**: The neural network processes sensor data to control the car.
4. **Evaluation**: Cars are scored based on distance traveled and collision avoidance.
5. **Evolution**: The best-performing cars' "brains" are selected for the next generation.
6. **Mutation**: Small random changes are applied to create variety in the population.
7. **Repeat**: The process continues, with cars improving over generations.

## 🔑 Key Functions

### Neural Network

The neural network is the "brain" of each car. Here are some key functions:

1. **Constructor**:
   ```javascript
   constructor(neuronCounts) {
       this.levels = [];
       for (let i = 0; i < neuronCounts.length - 1; i++) {
           this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
       }
   }
   ```
   This function initializes the neural network with specified layers.

2. **Feedforward**:
   ```javascript
   static feedForward(givenInputs, network) {
       let outputs = Level.feedForward(givenInputs, network.levels[0]);
       for (let i = 1; i < network.levels.length; i++) {
           outputs = Level.feedForward(outputs, network.levels[i]);
       }
       return outputs;
   }
   ```
   This function processes inputs through the network to produce outputs.

### Sensor System

The sensor system helps the car "see" its environment:

```javascript
update(roadBorders, traffic) {
    this.#castRays();
    this.readings = [];
    for (let i = 0; i < this.rays.length; i++) {
        this.readings.push(
            this.#getReading(this.rays[i], roadBorders, traffic)
        );
    }
}
```
This function updates the sensor readings based on the environment.

### Fitness Function

The fitness function evaluates how well a car is performing:

```javascript
#calculateFitness() {
    const distanceTraveled = Math.hypot(this.x - this.startX, this.y - this.startY);
    this.fitness = distanceTraveled / this.lifetime;
}
```
This function calculates fitness based on the distance traveled and the car's lifetime. Cars that travel further in less time are considered fitter.

### Mutation

Mutation introduces small changes to the neural networks:

```javascript
static mutate(network, amount = 1) {
    network.levels.forEach(level => {
        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = lerp(
                level.biases[i],
                Math.random() * 2 - 1,
                amount
            )
        }
        for (let i = 0; i < level.weights.length; i++) {
            for (let j = 0; j < level.weights[i].length; j++) {
                level.weights[i][j] = lerp(
                    level.weights[i][j],
                    Math.random() * 2 - 1,
                    amount
                )
            }
        }
    });
}
```
This function slightly alters the weights and biases of the neural network, allowing for exploration of new behaviors.

## 🛠 Customization

You can customize various aspects of the simulation:

- Adjust the `N` variable in `main.js` to change the population size.
- Modify `rayCount` in `sensor.js` to change the number of sensors.
- Experiment with the neural network architecture in `network.js`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgements

- Inspired by [The Coding Train's](https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw) neural network tutorials.
- Special thanks to the open-source community for various algorithms and inspiration.

---

Happy coding, and may your AI cars drive safely! 🚗💨