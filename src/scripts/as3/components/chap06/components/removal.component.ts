import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(abstractOptions)
export class RemovalComponent extends AbstractComponent {

    private count = 20;
    private balls: Ball[];

    constructor(a: Title) {
        super(a);
        this.title = 'Removal';
    }

    ngOnInit() {
        super.init();

        this.balls = [];
        for (let i = 0; i < this.count; i++) {
            const ball= new Ball(10);
            ball.x = Math.random() * this.canvas.width;
            ball.y = Math.random() * this.canvas.height;
            ball.vx = Math.random() * 2 - 1;
            ball.vy = Math.random() * 2 - 1;
            this.stage.addChild(ball);
            this.balls[i] = ball;
        }
    }

    onEnterFrame() {
        for (let i = 0; i < this.balls.length; i++) {
            const ball = this.balls[i];
            ball.x += ball.vx;
            ball.y += ball.vy;
            if (ball.x - ball.radius > this.canvas.width ||
                ball.x + ball.radius < 0 ||
                ball.y - ball.radius > this.canvas.height ||
                ball.y + ball.radius < 0) {
                this.stage.removeChild(ball);
                this.balls.splice(i, 1);
                if (!this.balls.length) {
                    createjs.Ticker.removeAllEventListeners('tick');
                    console.log('complete');
                }
            }
        }
        this.stage.update();
    }
}
