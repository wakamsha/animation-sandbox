import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../../../base.component';
import {Ball} from '../../../../domains/entities/Ball';

@Component(baseOptions)
export class BubblesComponent extends BaseComponent {

    private centerBall: Ball;
    private balls: Ball[] = [];
    private numOfBall = 20;
    private bounce = -1;
    private spring = .2;

    constructor(a: Title) {
        super(a);
        this.title = 'Bubbles';
    }

    ngOnInit() {
        super.init();

        this.centerBall = new Ball(150, '#cccccc');
        this.centerBall.x = this.centerX;
        this.centerBall.y = this.centerY;
        this.stage.addChild(this.centerBall);

        for (let i = 0; i < this.numOfBall; i++) {
            const ball = new Ball(Math.random() * 40 + 5, `#${Math.floor(Math.random() * 16777215).toString(16)}`);
            ball.x = Math.random() * this.canvas.width;
            ball.y = Math.random() * this.canvas.height;
            ball.vx = Math.random() * 6 - 3;
            ball.vy = Math.random() * 6 - 3;
            this.balls[i] = ball;
            this.stage.addChild(ball);
        }
    }

    onEnterFrame() {
        for (let i = 0; i < this.numOfBall; i++) {
            const ball = this.balls[i];
            this.move(ball);
            const dx = ball.x - this.centerBall.x;
            const dy = ball.y - this.centerBall.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = ball.radius + this.centerBall.radius;
            if (dist < minDist) {
                const angle = Math.atan2(dy, dx);
                const tx = this.centerBall.x + Math.cos(angle) * minDist;
                const ty = this.centerBall.y + Math.sin(angle) * minDist;
                ball.vx += (tx - ball.x) * this.spring;
                ball.vy += (ty - ball.y) * this.spring;
            }
        }

        this.stage.update();
    }

    private move(ball: Ball) {
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x + ball.radius > this.right) {
            ball.x = this.right - ball.radius;
            ball.vx *= this.bounce;
        } else if (ball.x - ball.radius < this.left) {
            ball.x = this.left + ball.radius;
            ball.vx *= this.bounce;
        }
        if (ball.y + ball.radius > this.bottom) {
            ball.y = this.bottom - ball.radius;
            ball.vy *= this.bounce;
        } else if (ball.y - ball.radius < this.top) {
            ball.y = this.top + ball.radius;
            ball.vy *= this.bounce;
        }
    }
}
