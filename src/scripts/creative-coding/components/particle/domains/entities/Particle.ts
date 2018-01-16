export class Particle {
    public x: number;
    public y: number;
    public vx = 0;
    public vy = 0;
    public fx = 0;
    public fy = 0;
    public ox: number;
    public oy: number;
    public mass: number;
    // public minDist = 10;
    public radians = Math.random() * 90;
    public minDistSq: number;

    constructor(x: number, y: number) {
        this.x = this.ox = x || 0;
        this.y = this.oy = y || 0;
        this.mass = .05 + Math.random() * .9;
        this.minDistSq = 100;
    }

    public getColorHex(radians: number): string {
        const r = this.getChannel(radians);
        const g = this.getChannel(radians + Math.PI * 2 / 3);
        const b = this.getChannel(radians + Math.PI * 2 / 3 * 2);
        return `rgb(${r}, ${g}, ${b})`;
    }

    private getChannel(angle: number): number {
        return Math.round(Math.cos(angle) * 127 + 128);
    }
}
