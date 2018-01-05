import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {BaseComponent, baseOptions} from '../../base.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(baseOptions)
export class Rotate3Component extends BaseComponent {

    private balls: Ball[] = [];
    private numBalls = 10;
    // private vr = .05;

    constructor(a: Title) {
        super(a);
        this.title = 'Rotate3';
    }

    ngOnInit() {
        super.init();

        for (let i = 0; i < this.numBalls; i++) {
            const ball = new Ball();
            ball.x = Math.random() * this.stageWidth;
            ball.y = Math.random() * this.stageHeight;
            this.balls[i] = ball;
            this.stage.addChild(ball);
        }
    }

    onEnterFrame() {
        const angle = (this.stage.mouseX - this.stageWidth / 2) * .001;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        for (let i = 0; i < this.numBalls; i++) {
            const ball = this.balls[i];
            const x1 = ball.x - this.centerX;
            const y1 = ball.y - this.centerY;
            const x2 = cos * x1 - sin * y1;
            const y2 = cos * y1 + sin * x1;
            ball.x = this.centerX + x2;
            ball.y = this.centerY + y2;
        }

        this.stage.update();
    }
}
