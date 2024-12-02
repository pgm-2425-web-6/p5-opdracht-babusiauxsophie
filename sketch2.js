const sketch2 = (p) => {
    let isDrawing = false; 

    p.setup = () => {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight/3);
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
    };

    p.mouseReleased = () => {
        isDrawing = false;
    };
};

let myp5_2 = new p5(sketch2);
