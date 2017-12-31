import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../../../base.component';
import {Ball} from '../../../../domains/entities/Ball';
import MouseEvent = createjs.MouseEvent;

@Component(baseOptions)
export class DistanceComponent extends BaseComponent {

    private ball1: Ball;
    private ball2: Ball;

    constructor(a: Title) {
        super(a);
        this.title = 'Distance';
    }

    ngOnInit() {
        super.init();

        this.ball1 = new Ball();
        this.ball1.x = this.centerX;
        this.ball1.y = this.centerY;
        this.ball1.alpha = .5;
        this.stage.addChild(this.ball1);

        this.ball2 = new Ball(40, '#0000ff');
        this.ball2.x = 50;
        this.ball2.y = 100;
        this.ball2.addEventListener('mousedown', (event: MouseEvent) => this.onPress(event));
        this.ball2.addEventListener('pressup', (event: MouseEvent) => this.onRelease(event));
        this.stage.addChild(this.ball2);
    }

    onEnterFrame() {
        const dx = this.ball2.x - this.ball1.x;
        const dy = this.ball2.y - this.ball1.y;
        const dist = Math.sqrt(dy * dy + dx * dx);
        if (dist < this.ball1.radius + this.ball2.radius) {
            this.ball1.alpha = 1;
        } else {
            this.ball1.alpha = .5;
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
