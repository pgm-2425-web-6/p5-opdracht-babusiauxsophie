const sketch = (p) => {
    let ball;
    let isAnimating = false;
    let animationStartTime;

    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight / 3);
        canvas.parent('breath-section'); 
        p.background("whitesmoke");

        ball = {
            x: p.width / 2,
            y: p.height / 3,
            size: 80,
            color: "#92a7fe",
            originalSize: 50,
            originalColor: "#92a7fe"
        };
    };

    p.draw = () => {
        p.background("whitesmoke");

        let elapsedTime = 0;
        if (isAnimating) {
            elapsedTime = p.millis() - animationStartTime;

            if (elapsedTime <= 3000) {
                ball.size = p.lerp(ball.originalSize, 120, elapsedTime / 3000);
                ball.color = p.lerpColor(p.color(ball.originalColor), p.color("#5778ff"), elapsedTime / 3000);
            } else if (elapsedTime <= 6000) {
                ball.size = p.lerp(120, ball.originalSize, (elapsedTime - 3000) / 3000);
                ball.color = p.lerpColor(p.color("#5778ff"), p.color(ball.originalColor), (elapsedTime - 3000) / 3000);
            } else {
                animationStartTime = p.millis();
            }
        }

        p.noFill();
        p.stroke("whitesmoke");
        p.strokeWeight(4);
        p.ellipse(ball.x, ball.y, ball.size + 10);

        p.noStroke();
        p.fill(ball.color);
        p.ellipse(ball.x, ball.y, ball.size);

        let innerText = "Inhale";
        if (elapsedTime > 3000 && elapsedTime <= 6000) {
            innerText = "Exhale";
        }

        let textSizeFactor = p.lerp(15, 25, (ball.size - ball.originalSize) / 70);
        p.fill("whitesmoke");
        p.textSize(textSizeFactor);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(innerText, ball.x, ball.y);
        p.fill(ball.originalColor);
        p.textSize(20);
        p.textAlign(p.CENTER, p.CENTER);
        p.text("Click and Breathe", p.width / 2, p.height - 30);
    };

    p.mousePressed = () => {
        let d = p.dist(p.mouseX, p.mouseY, ball.x, ball.y);
        if (d < ball.size / 2) {
            isAnimating = !isAnimating;
            if (isAnimating) {
                animationStartTime = p.millis();
            }
        }
    };
};

let myp5 = new p5(sketch);
