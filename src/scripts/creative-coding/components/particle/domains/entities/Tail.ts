import {Position} from '../../../../../declares/interface';

export class Tail {
    public position: Position;
    public shift: Position;
    public size = 1;
    public angle = 0;
    public speed = Math.random() * 0.06 + 0.01;
    public targetSize = 1;
    public orbit = 0;
    public color: string;

    constructor(radius: number) {
        this.position = this.shift = { x: 0, y: 0 };
        this.orbit = radius * .2 + (radius  * .2 * Math.random());
        this.color = this.getColorHex(Math.random() * 90);
    }

    private getColorHex(radians: number): string {
        const r = this.getChannel(radians);
        const g = this.getChannel(radians + Math.PI * 2 / 3);
        const b = this.getChannel(radians + Math.PI * 2 / 3 * 2);
        return `rgb(${r}, ${g}, ${b})`;
    }

    private getChannel(angle: number): number {
        return Math.round(Math.cos(angle) * 127 + 128);
    }
}
