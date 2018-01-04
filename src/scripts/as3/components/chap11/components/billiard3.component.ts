import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {BaseComponent, baseOptions} from '../../base.component';
import {Ball} from '../../../../domains/entities/Ball';

@Component(baseOptions)
export class Billiard3Component extends BaseComponent {

    private ball0: Ball;
    private ball1: Ball;
    private bounce = -1.0;

    constructor(a: Title) {
        super(a);
        this.title = 'Billiard3';
    }

    ngOnInit() {
        super.init();

        this.ball0 = new Ball(150);
        this.ball0.mass = 2;
        this.ball0.x = this.stageWidth - 200;
        this.ball0.y = this.stageHeight - 200;
        this.ball0.vx = Math.random() * 10 - 5;
        this.ball0.vy = Math.random() * 10 - 5;
        this.stage.addChild(this.ball0);

        this.ball1 = new Ball(90);
        this.ball1.mass = 1;
        this.ball1.x = 100;
        this.ball1.y = 100;
        this.ball1.vx = Math.random() * 10 - 5;
        this.ball1.vy = Math.random() * 10 - 5;
        this.stage.addChild(this.ball1);
    }

    onEnterFrame() {
        this.ball0.x += this.ball0.vx;
        this.ball0.y += this.ball0.vy;
        this.ball1.x += this.ball1.vx;
        this.ball1.y += this.ball1.vy;
        this.checkCollision(this.ball0, this.ball1);
        this.checkWalls(this.ball0);
        this.checkWalls(this.ball1);

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
            // 位置の回転
            const x0Final = x0 * cos - y0 * sin;
            const y0Final = y0 * cos + x0 * sin;
            const x1Final = x1 * cos - y1 * sin;
            const y1Final = y1 * cos + x1 * sin;
            // 実際の画面位置への調整
            ball1.x = ball0.x + x1Final;
            ball1.y = ball0.y + y1Final;
            ball0.x = ball0.x + x0Final;
            ball0.y = ball0.y + y0Final;
            // 速度の回転
            ball0.vx = vx0 * cos - vy0 * sin;
            ball0.vy = vy0 * cos + vx0 * sin;
            ball1.vx = vx1 * cos - vy1 * sin;
            ball1.vy = vy1 * cos + vx1 * sin;
        }
    }
}
