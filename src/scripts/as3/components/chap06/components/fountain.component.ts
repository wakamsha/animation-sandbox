import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(abstractOptions)
export class FountainComponent extends AbstractComponent {

    private count = 100;
    private gravity = .5;
    private wind = .1;
    private balls: Ball[];

    constructor(a: Title) {
        super(a);
        this.title = 'Fountain';
    }

    ngOnInit() {
        super.init();

        this.balls = [];
        for (let i = 0; i < this.count; i++) {
            const ball = new Ball(4, `#${Math.floor(Math.random() * 16777215).toString(16)}`);
            ball.x = this.centerX;
            ball.y = this.bottom;
            ball.vx = Math.random() * 2 - 1;
            ball.vy = Math.random() * -10 - 10;
            this.balls[i] = ball;
            this.stage.addChild(ball);
        }
    }

    onEnterFrame() {
        for (let i = 0; i < this.balls.length; i++) {
            const ball = this.balls[i];
            ball.vx += this.wind;
            ball.vy += this.gravity;
            ball.x += ball.vx;
            ball.y += ball.vy;

            if (ball.x - ball.radius > this.stageWidth ||
                ball.x + ball.radius < 0 ||
                ball.y - ball.radius > this.stageHeight ||
                ball.y + ball.radius < 0) {
                ball.x = this.centerX;
                ball.y = this.bottom;
                ball.vx = Math.random() * 2 - 1;
                ball.vy = Math.random() * -10 - 10;
            }
        }
        this.stage.update();
    }
}
