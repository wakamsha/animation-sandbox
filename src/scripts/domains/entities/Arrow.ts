export class Arrow extends createjs.Shape {

    constructor() {
        super();
        this.graphics
            .setStrokeStyle(1)
            .beginStroke('white')
            .beginFill('#ffff00')
            .moveTo(-50, -25)
            .lineTo(0, -25)
            .lineTo(0, -50)
            .lineTo(50, 0)
            .lineTo(0, 50)
            .lineTo(0, 25)
            .lineTo(-50, 25)
            .endFill();
    }
}