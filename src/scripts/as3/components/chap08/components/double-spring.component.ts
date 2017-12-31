import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../../../base.component';
import {Ball} from '../../../../domains/entities/Ball';

@Component(baseOptions)
export class DoubleSpringComponent extends BaseComponent {

    private balls: Ball[] = [];
    private numOfBall = 2;
    private draggings: boolean[] = [];
    private spring = .05;
    private friction = .95;
    private springLength = 100;
    private line: createjs.Shape;

    constructor(a: Title) {
        super(a);
        this.title = 'Double spring';
    }

    ngOnInit() {
        super.init();

        this.line = new createjs.Shape();
        this.stage.addChild(this.line);

        for (let i = 0; i < this.numOfBall; i++) {
            const ball = new Ball(20, `#${Math.floor(Math.random() * 16777215).toString(16)}`);
            ball.x = Math.random() * this.canvas.width;
            ball.y = Math.random() * this.canvas.height;
            ball.addEventListener('mousedown', (event: MouseEvent) => this.onPress(event));
            this.balls[i] = ball;
            this.stage.addChild(ball);
            this.draggings[i] = false;
        }
        this.stage.addEventListener('pressup', () => this.onRelease());
    }

    onEnterFrame() {
        if (!this.draggings[0]) {
            this.springTo(this.balls[0], this.balls[1]);
        }
        if (!this.draggings[1]) {
            this.springTo(this.balls[1], this.balls[0]);
        }

        this.line.graphics
            .clear()
            .beginStroke('white')
            .setStrokeStyle(1)
            .moveTo(this.balls[0].x, this.balls[0].y);
        for (let i = 1; i < this.numOfBall; i++) {
            this.line.graphics
                .lineTo(this.balls[i].x, this.balls[i].y);
        }

        this.stage.update();
    }

    private springTo(ballA: Ball, ballB: Ball) {
        const dx = ballB.x - ballA.x;
        const dy = ballB.y - ballA.y;
        const angle = Math.atan2(dy, dx);
        const targetX = ballB.x - Math.cos(angle) * this.springLength;
        const targetY = ballB.y - Math.sin(angle) * this.springLength;
        ballA.vx += (targetX - ballA.x) * this.spring;
        ballA.vy += (targetY - ballA.y) * this.spring;
        ballA.vx *= this.friction;
        ballA.vy *= this.friction;
        ballA.x += ballA.vx;
        ballA.y += ballA.vy;
    }

    private onPress(event: MouseEvent) {
        const ball = <Ball>event.target;
        ball.startDrag();
        for (let i = 0; i < this.numOfBall; i++) {
            if (ball === this.balls[i]) {
                this.draggings[i] = true;
            }
        }
    }

    private onRelease() {
        for (let i = 0; i < this.numOfBall; i++) {
            this.balls[i].stopDrag();
            this.draggings[i] = false;
        }
    }
}
