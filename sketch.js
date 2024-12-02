let ball;
let isAnimating = false;
let animationStartTime;

function setup() {
    createCanvas(windowWidth, windowHeight / 3);
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

    noFill();
    stroke("whitesmoke");
    strokeWeight(4);
    ellipse(ball.x, ball.y, ball.size + 10);

    noStroke();
    fill(ball.color);
    ellipse(ball.x, ball.y, ball.size); 

    let innerText = "Inhale";
    if (elapsedTime > 3000 && elapsedTime <= 6000) {
        innerText = "Exhale";
    }

    let textSizeFactor = lerp(15, 25, (ball.size - ball.originalSize) / 70);
    fill("whitesmoke");
    textSize(textSizeFactor);
    textAlign(CENTER, CENTER);
    text(innerText, ball.x, ball.y);

    fill(ball.originalColor);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Click and Breathe", width / 2, height - 30);
}

function mousePressed() {
    let d = dist(mouseX, mouseY, ball.x, ball.y);
    if (d < ball.size / 2) {
        isAnimating = !isAnimating;
        if (isAnimating) {
            animationStartTime = millis();
        }
    }
}
