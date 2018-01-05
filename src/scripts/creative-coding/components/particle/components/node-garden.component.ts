import {Component} from '@angular/core';
import {BaseComponent, baseOptions} from '../../base.component';
import {Title} from '@angular/platform-browser';
import {Ball} from '../domains/entities/Ball';

@Component(baseOptions)
export class NodeGardenComponent extends BaseComponent {

    private NUM_NODES = 30;
    private MIN_DIST = 200;
    private SPRING_AMOUNT = 0.000001;
    private NODE_COLOR = '#c8cbce';

    private particles: Ball[];

    constructor(a: Title) {
        super(a);
        this.title = 'Node Garden';
    }

    ngOnInit() {
        super.init();
        this.particles = [];
        for (let i = 0; i < this.NUM_NODES; i++) {
            const ball = this.createParticle(3);
            this.drawParticle(ball);
            this.particles[i] = ball;
        }
        this.ctx.lineWidth = 1.5;
    }

    protected onEnterFrame() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        // 移動させる
        for (let i=0; i < this.NUM_NODES; i++) {
            const pA = this.particles[i];
            pA.x += pA.vx;
            pA.y += pA.vy;
            this.checkWalls(pA);
            this.drawParticle(pA);

            // 同じnode同士にならないように1つずらして総当たり
            for (let j = i + 1; j < this.NUM_NODES; j++) {
                const pB = this.particles[j];
                this.spring(pA, pB);
            }
        }
    }

    private createParticle(radius: number): Ball {
        const ball = new Ball(radius);
        ball.x = Math.round(Math.random() * this.stageWidth);
        ball.y = Math.round(Math.random() * this.stageHeight);
        ball.vx = Math.random() * 6 - 3;
        ball.vy = Math.random() * 6 - 3;
        return ball;
    }

    private drawParticle(ball: Ball) {
        this.ctx.fillStyle = this.NODE_COLOR;
        this.ctx.beginPath();
        this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
    }

    private checkWalls(ball: Ball) {
        if (ball.x > this.stageWidth) {
            ball.x = 0;
        } else if (ball.x < 0) {
            ball.x = this.stageWidth;
        }
        if (ball.y > this.stageHeight) {
            ball.y = 0;
        } else if (ball.y < 0) {
            ball.y = this.stageHeight;
        }
    }

    private spring(pA: Ball, pB: Ball) {
        // node同士の距離を求める
        const dx = pA.x - pB.x;
        const dy = pA.y - pB.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // 2つのnodeの距離が閾値を下回ったらつなげる
        if (dist < this.MIN_DIST) {
            // 2つの間に線を引く
            this.ctx.beginPath();
            // 距離が近いほど透明度を下げる
            this.ctx.strokeStyle = 'rgba(200 ,203, 206,' + (1 - dist / this.MIN_DIST) + ')';
            this.ctx.moveTo(pA.x, pA.y);
            this.ctx.lineTo(pB.x, pB.y);
            this.ctx.stroke();
            this.ctx.closePath();

            // お互いに逃げる
            const ax = dx * this.SPRING_AMOUNT;
            const ay = dy * this.SPRING_AMOUNT;
            pA.vx += ax;
            pA.vy += ay;
            pB.vx -= ax;
            pB.vy -= ay;
        }
    }
}
