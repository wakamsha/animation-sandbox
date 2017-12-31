import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../../../base.component';
import {Ball} from '../../../../domains/entities/Ball';

@Component(baseOptions)
export class ChainComponent extends BaseComponent {

    private balls: Ball[];
    private numOfBalls = 5;
    private line: createjs.Shape;
    private spring = .05;
    private friction = .8;
    private gravity = 3;

    constructor(a: Title) {
        super(a);
        this.title = 'Chain';
    }

    ngOnInit() {
        super.init();

        this.balls = [];
        for (let i = 0; i < this.numOfBalls; i++) {
            const ball = new Ball(20);
            this.balls[i] = ball;
            this.stage.addChild(ball);
        }

        this.line = new createjs.Shape();
        this.stage.addChildAt(this.line, 0);
    }

    onEnterFrame() {
        this.line.graphics
            .clear()
            .beginStroke('white')
            .setStrokeStyle(1)
            .moveTo(this.stage.mouseX, this.stage.mouseY);
        this.moveBall(this.balls[0], this.stage.mouseX, this.stage.mouseY);

        for (let i = 1; i < this.numOfBalls; i++) {
            const ballA = this.balls[i - 1];
            const ballB = this.balls[i];
            this.moveBall(ballB, ballA.x, ballA.y);

            this.line.graphics
                .moveTo(ballA.x, ballA.y)
                .lineTo(ballB.x, ballB.y);
        }

        this.stage.update();
    }

    private moveBall(ball: Ball, targetX: number, targetY: number) {
        ball.vx += (targetX - ball.x) * this.spring;
        ball.vy += (targetY - ball.y) * this.spring;
        ball.vy += this.gravity;
        ball.vx *= this.friction;
        ball.vy *= this.friction;
        ball.x += ball.vx;
        ball.y += ball.vy;
    }
}
