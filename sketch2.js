const sketch2 = (p) => {
    let isDrawing = false;
    let oceanSound;

    p.preload = () => {
        oceanSound = p.loadSound('ocean.mp3');
    };

    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight / 3);
        canvas.parent('draw-section');
        p.background(203, 189, 147);
    };

    p.draw = () => {
        if (isDrawing) {
            p.stroke('#BEAD79');
            p.strokeWeight(7);
            p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
        }
    };

    p.mousePressed = () => {
        isDrawing = true;


        if (!oceanSound.isPlaying()) {
            oceanSound.loop();
            oceanSound.setVolume(1.0);
        }
    };

    p.mouseReleased = () => {
        isDrawing = false;

        oceanSound.amp(0, 2, 0);
        setTimeout(() => {
            if (!isDrawing) {
                oceanSound.stop();
            }
        }, 2000);

        p.background(203, 189, 147);
    };

    p.windowResized = () => {
        let previousCanvas = p.get();
        p.resizeCanvas(p.windowWidth, p.windowHeight / 3);
        p.background(203, 189, 147);
        p.image(previousCanvas, 0, 0);
    };
};

let myp5_2 = new p5(sketch2);
