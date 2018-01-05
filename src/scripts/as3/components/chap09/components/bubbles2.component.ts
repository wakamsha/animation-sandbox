import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {BaseComponent, baseOptions} from '../../base.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(baseOptions)
export class bubbles2Component extends BaseComponent {

    private balls: Ball[] = [];
    private numOfBall = 40;
    private bounce = -.5;
    private spring = .05;
    private gravity = .1;

    constructor(a: Title) {
        super(a);
        this.title = 'Bubbles2';
    }

    ngOnInit() {
        super.init();

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
        for (let i = 0; i < this.numOfBall - 1; i++) {
            const ball0 = this.balls[i];
            for (let j = i + 1; j < this.numOfBall; j++) {
                const ball1 = this.balls[j];
                const dx = ball1.x - ball0.x;
                const dy = ball1.y - ball0.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const minDist = ball0.radius + ball1.radius;
                if (dist < minDist) {
                    const angle = Math.atan2(dy, dx);
                    const tx = ball0.x + Math.cos(angle) * minDist;
                    const ty = ball0.y + Math.sin(angle) * minDist;
                    const ax = (tx - ball1.x) * this.spring;
                    const ay = (ty - ball1.y) * this.spring;
                    ball0.vx -= ax;
                    ball0.vy -= ay;
                    ball1.vx += ax;
                    ball1.vy += ay;
                }
            }
        }

        for (let i = 0; i < this.numOfBall; i++) {
            const ball = this.balls[i];
            this.move(ball);
        }

        this.stage.update();
    }

    private move(ball: Ball) {
        ball.vy += this.gravity;
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
