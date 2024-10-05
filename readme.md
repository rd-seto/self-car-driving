[# Self-Driving Car AI Simulation

[![Video](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://github.com/rd-seto/self-car-driving/raw/main/October%205,%202024.mp4)


## 🚗 Overview

This project demonstrates a self-driving car AI simulation using neural networks and evolutionary algorithms. The cars learn to navigate through traffic and avoid obstacles, improving their performance over time.

## 🚀 Features

- Neural network-controlled AI cars
- Ray-casting sensor system for environment detection
- Evolutionary learning through natural selection and mutation
- Traffic simulation with obstacle vehicles
- Real-time visualization of the learning process
- DQN (Deep Q-Network) agent implementation

## 🛠 Technologies Used

- JavaScript (ES6+)
- HTML5 Canvas for rendering
- TensorFlow.js for DQN implementation
- Custom Neural Network implementation
- Evolutionary Algorithms

## 🏁 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Basic understanding of HTML and JavaScript (for customization)

### Installation

1. Clone the repository:
2. Navigate to the project directory:
3. Open `index.html` in your web browser.

## 🎮 How to Use

1. Open `index.html` in your browser to start the simulation.
2. Watch as the cars learn to navigate through traffic.
3. Use the "💾" button to save the best performing neural network.
4. Use the "🗑️" button to discard the saved neural network.

## 🧠 How It Works

1. Cars are initialized with random neural networks.
2. Each car uses sensors to detect obstacles and road boundaries.
3. The neural network processes sensor data to control the car.
4. Cars are evaluated based on distance traveled, time spent, and collision avoidance.
5. The best-performing cars' "brains" are selected for the next generation.
6. Mutations are applied to create variety in the population.
7. The process repeats, with cars improving over generations.

## 🔑 Key Components

- `Car`: Represents the self-driving car with its neural network "brain".
- `Sensor`: Implements the ray-casting system for obstacle detection.
- `NeuralNetwork`: Custom implementation of a neural network.
- `Road`: Defines the road structure and boundaries.
- `DQNAgent`: Implements a Deep Q-Network agent for reinforcement learning.

## 🛠 Customization

You can customize various aspects of the simulation:

- Adjust the `N` variable in `main.js` to change the population size.
- Modify `rayCount` in `sensor.js` to change the number of sensors.
- Experiment with the neural network architecture in `network.js`.
- Adjust the `stateSize` and `actionSize` in `main.js` for the DQN agent.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License
-

## 🙏 Acknowledgements

- Inspired by various online tutorials and open-source projects on self-driving car simulations.
- TensorFlow.js community for machine learning resources.

---

Happy coding, and may your AI cars drive safely! 🚗💨
](https://youtu.be/-WbLeueDsLU)
