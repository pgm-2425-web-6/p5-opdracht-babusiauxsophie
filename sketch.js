function setup() {
    createCanvas(windowWidth, windowHeight); // Create a responsive canvas
    background(220); // Light grey background
}

function draw() {
    // For now, just display some placeholder text
    fill(0); 
    textSize(24);
    textAlign(CENTER, CENTER);
    text('Breathe and interact with the canvas', width / 2, height / 2);
}
