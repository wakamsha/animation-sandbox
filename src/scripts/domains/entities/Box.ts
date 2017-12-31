import MouseEvent = createjs.MouseEvent;

export class Box extends createjs.Shape {

    public vx = 0;
    public vy = 0;

    constructor(public width = 50,
                public height = 50,
                private color = '#ff0000') {
        super();
        this.graphics
            .beginFill(this.color)
            .drawRect(-this.width / 2, -this.height / 2, this.width, this.height)
            .endFill();
    }

    public get isDragging(): boolean {
        return this.hasEventListener('pressmove');
    }

    public enableDrag() {
        if (this.hasEventListener('mousedown')) return;
        this.addEventListener('mousedown', () => this.startDrag());
    }

    private startDrag() {
        this.addEventListener('pressmove', (event: MouseEvent) => this.drag(event));
        this.addEventListener('pressup', () => this.stopDrag());
    }

    private stopDrag() {
        this.removeAllEventListeners('pressmove');
        this.removeAllEventListeners('pressup');
    }

    private drag(event: MouseEvent) {
        this.x = event.stageX;
        this.y = event.stageY;
    }
}
