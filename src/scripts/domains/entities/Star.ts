import MouseEvent = createjs.MouseEvent;

export class Star extends createjs.Shape {

    constructor(radius: number,
                color: string) {
        super();
        this.graphics
            .setStrokeStyle(1)
            .beginFill(color);
        for (let i = 0; i < 11; i++) {
            const radius2 = i % 2 > 0 ? radius / 2 : radius;
            const angle = Math.PI * 2 / 10 * i;
            this.graphics.lineTo(Math.cos(angle) * radius2, Math.sin(angle) * radius2);
        }
        this.graphics.endFill();
    }

    public get isDragging(): boolean {
        return this.hasEventListener('pressmove');
    }

    public enableDrag() {
        if (this.hasEventListener('mousedown')) return;
        this.addEventListener('mousedown', () => this.startDrag());
    }

    public startDrag() {
        this.addEventListener('pressmove', (event: MouseEvent) => this.drag(event));
        this.addEventListener('pressup', () => this.stopDrag());
    }

    public stopDrag() {
        this.removeAllEventListeners('pressmove');
        this.removeAllEventListeners('pressup');
    }

    private drag(event: MouseEvent) {
        this.x = event.stageX;
        this.y = event.stageY;
    }
}
