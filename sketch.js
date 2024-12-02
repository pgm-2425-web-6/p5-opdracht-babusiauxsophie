let ball;
let isAnimating = false;
let animationStartTime;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight / 3);
    canvas.parent('breath-section'); 
    background("whitesmoke");

    ball = {
        x: width / 2,
        y: height / 3,
        size: 80,
        color: "#92a7fe",
        originalSize: 50,
        originalColor: "#92a7fe"
    };
    
}

function draw() {
    background("whitesmoke");

    let elapsedTime = 0;
    if (isAnimating) {
        elapsedTime = millis() - animationStartTime;

        if (elapsedTime <= 3000) {
            ball.size = lerp(ball.originalSize, 120, elapsedTime / 3000);
            ball.color = lerpColor(color(ball.originalColor), color("#5778ff"), elapsedTime / 3000);
        } else if (elapsedTime <= 6000) {
            ball.size = lerp(120, ball.originalSize, (elapsedTime - 3000) / 3000);
            ball.color = lerpColor(color("#5778ff"), color(ball.originalColor), (elapsedTime - 3000) / 3000);
        } else {
            animationStartTime = millis();
        }
    }

    // Draw the ball with a stroke effect for the outer circle
    noFill();
    stroke("whitesmoke");
    strokeWeight(4);
    ellipse(ball.x, ball.y, ball.size + 10);

    // Fill the ball with the dynamic color
    noStroke();
    fill(ball.color);
    ellipse(ball.x, ball.y, ball.size);

    // Show "Inhale" or "Exhale" text based on the elapsed time
    let innerText = "Inhale";
    if (elapsedTime > 3000 && elapsedTime <= 6000) {
        innerText = "Exhale";
    }

    // Dynamic text size based on ball size
    let textSizeFactor = lerp(15, 25, (ball.size - ball.originalSize) / 70);
    fill("whitesmoke");
    textSize(textSizeFactor);
    textAlign(CENTER, CENTER);
    text(innerText, ball.x, ball.y);

    // Static instructions text at the bottom of the canvas
    fill(ball.originalColor);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Click and Breathe", width / 2, height - 30);
}

function mousePressed() {
    // Check if the mouse click is within the ball's area and toggle animation
    let d = dist(mouseX, mouseY, ball.x, ball.y);
    if (d < ball.size / 2) {
        isAnimating = !isAnimating;
        if (isAnimating) {
            animationStartTime = millis();
        }
    }
}
