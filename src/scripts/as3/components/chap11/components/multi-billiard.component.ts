import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(abstractOptions)
export class MultiBilliardComponent extends AbstractComponent {

    private balls: Ball[];
    private numBalls = 16;
    private bounce = -1.0;

    constructor(a: Title) {
        super(a);
        this.title = 'Multi Billiard';
    }

    ngOnInit() {
        super.init();
        this.balls = [];
        for (let i = 0; i < this.numBalls; i++) {
            const radius = Math.random() * 20 + 20;
            const ball = new Ball(radius);
            ball.mass = radius;
            ball.x = i * 100;
            ball.y = i * 50;
            ball.vx = Math.random() * 10 - 5;
            ball.vy = Math.random() * 10 - 5;
            this.stage.addChild(ball);
            this.balls.push(ball);
        }
    }

    onEnterFrame() {
        for (let i = 0; i < this.numBalls; i++) {
            const ball = this.balls[i];
            ball.x += ball.vx;
            ball.y += ball.vy;
            this.checkWalls(ball);
        }
        for (let i = 0; i < this.numBalls; i++) {
            const ballA = this.balls[i];
            for (let j = i + 1; j < this.numBalls; j++) {
                const ballB = this.balls[j];
                this.checkCollision(ballA, ballB);
            }
        }
        this.stage.update();
    }

    private checkWalls(ball: Ball) {
        if (ball.x + ball.radius > this.stageWidth) {
            ball.x = this.stageWidth - ball.radius;
            ball.vx *= this.bounce;
        } else if (ball.x - ball.radius < 0) {
            ball.x = ball.radius;
            ball.vx *= this.bounce;
        }
        if (ball.y + ball.radius > this.stageHeight) {
            ball.y = this.stageHeight - ball.radius;
            ball.vy *= this.bounce;
        } else if (ball.y - ball.radius < 0) {
            ball.y = ball.radius;
            ball.vy *= this.bounce;
        }
    }

    private checkCollision(ball0: Ball, ball1: Ball) {
        const dx = ball1.x - ball0.x;
        const dy = ball1.y - ball0.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < ball0.radius + ball1.radius) {
            // 角度とサイン、コサインの計算
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);
            // ball0 の位置の回転
            let   x0 = 0;
            const y0 = 0;
            // ball1 の位置の回転
            let   x1 = dx * cos + dy * sin;
            const y1 = dy * cos - dx * sin;
            // ball0 の速度の回転
            let   vx0 = ball0.vx * cos + ball0.vy * sin;
            const vy0 = ball0.vy * cos - ball0.vx * sin;
            // ball1 の速度の回転
            let   vx1 = ball1.vx * cos + ball1.vy * sin;
            const vy1 = ball1.vy * cos - ball1.vx * sin;
            // 衝突反応
            const vxTotal = vx0 - vx1;
            vx0 = ((ball0.mass - ball1.mass) * vx0 + 2 * ball1.mass * vx1) / (ball0.mass + ball1.mass);
            vx1 = vxTotal + vx0;
            x0 += vx0;
            x1 += vx1;
            // 位置を回転
            const x0Final = x0 * cos - y0 * sin;
            const y0Final = y0 * cos + x0 * sin;
            const x1Final = x1 * cos - y1 * sin;
            const y1Final = y1 * cos + x1 * sin;
            // 実際の画面位置に調整
            ball1.x = ball0.x + x1Final;
            ball1.y = ball0.y + y1Final;
            ball0.x = ball0.x + x0Final;
            ball0.y = ball0.y + y0Final;
            // 速度を回転
            ball0.vx = vx0 * cos - vy0 * sin;
            ball0.vy = vy0 * cos + vx0 * sin;
            ball1.vx = vx1 * cos - vy1 * sin;
            ball1.vy = vy1 * cos + vx1 * sin;
        }
    }
}
