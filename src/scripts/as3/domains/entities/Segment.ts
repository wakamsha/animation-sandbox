export class Segment extends createjs.Shape {

    constructor(private segmentWidth: number,
                private segmentHeight: number,
                private color: string) {
        super();
        this.graphics
            .beginStroke(this.color)
            .drawRoundRect(
                -this.segmentHeight / 2,
                -this.segmentHeight / 2,
                this.segmentWidth + this.segmentHeight,
                this.segmentHeight,
                this.segmentHeight)
            .endFill();
        // ２つのピンの描画
        this.graphics.drawCircle(0, 0, 2);
        this.graphics.drawCircle(this.segmentWidth, 0, 2);
    }

    public getPin(): createjs.Point {
        const angle = this.rotation * Math.PI / 180;
        const xPos = this.x + Math.cos(angle) * this.segmentWidth;
        const yPos = this.y + Math.sin(angle) * this.segmentWidth;
        return new createjs.Point(xPos, yPos);
    }
}