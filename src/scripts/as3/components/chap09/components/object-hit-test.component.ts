import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {BaseComponent, baseOptions} from '../../base.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(baseOptions)
export class ObjectHitTestComponent extends BaseComponent {

    private ball1: Ball;
    private ball2: Ball;

    constructor(a: Title) {
        super(a);
        this.title = 'Object hit test';
    }

    ngOnInit() {
        super.init();

        this.ball1 = new Ball();
        this.ball1.alpha = .2;
        this.ball1.x = this.centerX;
        this.ball1.y = this.centerY;
        this.stage.addChild(this.ball1);

        this.ball2 = new Ball(40, '#0000ff');
        this.ball2.x = 100;
        this.ball2.y = 100;
        this.stage.addChild(this.ball2);
        this.ball2.addEventListener('mousedown', (event: MouseEvent) => this.onPress(event));
        this.ball2.addEventListener('pressup', (event: MouseEvent) => this.onRelease(event));
    }

    onEnterFrame() {
        const point = this.ball2.localToLocal(0, 0, this.ball1);
        if (this.ball1.hitTest(point.x, point.y)) {
            this.ball1.alpha = 1;
        } else {
            this.ball1.alpha = .2;
        }

        this.stage.update();
    }

    private onPress(event: MouseEvent) {
        const ball = <Ball>event.target;
        ball.startDrag();
    }

    private onRelease(event: MouseEvent) {
        const ball = <Ball>event.target;
        ball.stopDrag();
    }
}
