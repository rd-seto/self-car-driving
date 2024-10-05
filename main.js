// Define state and action sizes based on your implementation needs
const stateSize = 4;  // Example: number of features from sensors, adjust accordingly
const actionSize = 3; // Example: number of actions (e.g., accelerate, brake, steer left/right)

// Get canvas elements and set their widths
const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;  // Set the width for the car canvas
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300; // Set the width for the network canvas

// Initialize DQN Agent
const dqnAgent = new DQNAgent(stateSize, actionSize);

// Get canvas contexts
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

// Create a new road object
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

// Generate cars for simulation
const N = 200; // Number of AI cars
let cars = generateCars(N);
let bestCar = cars[0];

// Load the best brain if it exists in local storage
if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
        if (i != 0) {
            NeuralNetwork.mutate(cars[i].brain, 0.1); // Mutate the brains of AI cars
        }
    }
}

// Create dummy traffic cars
let traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2, getRandomColor()),
];

let startTime = Date.now();

// Start the animation
animate();

// Function to save the best brain to local storage
function save() {
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

// Function to discard the best brain from local storage
function discard() {
    localStorage.removeItem("bestBrain");
}

// Function to generate AI cars
function generateCars(N) {
    const cars = [];
    for (let i = 1; i <= N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
    }
    return cars;
}

// Function to reset the simulation
function resetSimulation() {
    save(); // Save the best brain before resetting
    cars = generateCars(N); // Generate new cars
    traffic = [
        new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2, getRandomColor()),
        new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2, getRandomColor()),
        new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2, getRandomColor()),
        new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2, getRandomColor()),
        new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2, getRandomColor()),
        new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2, getRandomColor()),
        new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2, getRandomColor()),
    ];
    bestCar = cars[0];
    
    // Load the best brain for the new cars
    if (localStorage.getItem("bestBrain")) {
        for (let i = 0; i < cars.length; i++) {
            cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
            if (i != 0) {
                NeuralNetwork.mutate(cars[i].brain, 0.1);
            }
        }
    }
    
    startTime = Date.now(); // Reset the start time
}

// Animation function
function animate(time) {
    // Check if 60 seconds have passed
    if (Date.now() - startTime > 60000) {
        resetSimulation();
    }

    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []); // Update traffic cars
    }
    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic); // Update AI cars
    }
    // Find the best car based on the position
    bestCar = cars.find(c => c.y == Math.min(...cars.map(c => c.y)));

    // Resize canvases based on window height
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    // Draw the best car and the road
    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7); // Center the view on the best car

    road.draw(carCtx); // Draw the road
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx); // Draw traffic cars
    }
    carCtx.globalAlpha = 0.2; // Set transparency for AI cars
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx); // Draw AI cars
    }
    carCtx.globalAlpha = 1; // Reset transparency
    bestCar.draw(carCtx, true); // Draw the best car with full opacity

    carCtx.restore();

    // Draw the neural network visualization
    networkCtx.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain); // Visualize the brain
    requestAnimationFrame(animate); // Request the next animation frame
}