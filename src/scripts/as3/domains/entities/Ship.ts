export class Ship extends createjs.Shape {

    constructor() {
        super();
        this.drawShip(false);
    }

    public drawShip(showFlame: boolean) {
        this.graphics.clear();
        this.graphics
            .beginStroke('white')
            .setStrokeStyle(1)
            .moveTo(10, 0)
            .lineTo(-10, 10)
            .lineTo(-5, 0)
            .lineTo(-10, -10)
            .lineTo(10, 0);

        if (showFlame) {
            this.graphics
                .moveTo(-7.5, -5)
                .lineTo(-15, 0)
                .lineTo(-7.5, 5);
        }
        this.setBounds(0, 0, 25, 20);
    }
}
