import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../../../base.component';
import {Ball} from '../../../../domains/entities/Ball';

@Component(baseOptions)
export class GravityBounceComponent extends BaseComponent {

    private particles: Ball[];
    private numParticle = 30;

    constructor(a: Title) {
        super(a);
        this.title = 'Gravity bounce';
    }

    ngOnInit() {
        super.init();
        this.particles = [];
        for (let i = 0; i < this.numParticle; i++) {
            const particle = new Ball(5);
            particle.x = Math.random() * this.stageWidth;
            particle.y = Math.random() * this.stageHeight;
            particle.mass = 1;
            this.particles[i] = particle;
            this.stage.addChild(particle);
        }
    }

    onEnterFrame() {
        for (let i = 0; i < this.numParticle; i++) {
            const particle = this.particles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
        }
        for (let i = 0; i < this.numParticle; i++) {
            const pA = this.particles[i];
            for (let j = i + 1; j < this.numParticle; j++) {
                const pB = this.particles[j];
                this.checkCollision(pA, pB);
                this.gravitate(pA, pB);
            }
        }
        this.stage.update();
    }

    private gravitate(particleA: Ball, particleB: Ball) {
        const dx = particleB.x - particleA.x;
        const dy = particleB.y - particleA.y;
        const distSQ = dx * dx + dy * dy;
        const dist = Math.sqrt(distSQ);
        const force = particleA.mass * particleB.mass / distSQ;
        const ax = force * dx / dist;
        const ay = force * dy / dist;
        particleA.vx += ax / particleA.mass;
        particleA.vy += ay / particleA.mass;
        particleB.vx -= ax / particleB.mass;
        particleB.vy -= ay / particleB.mass;
    }

    private checkCollision(particleA: Ball, particleB: Ball) {
        const dx = particleB.x - particleA.x;
        const dy = particleB.y - particleA.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < particleA.radius + particleB.radius) {
            // 角度とサイン、コサインの計算
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);
            // particleA の位置の回転
            const pos0 = new createjs.Point(0, 0);
            // particleB の位置の回転
            const pos1 = this.rotate(dx, dy, sin, cos, true);
            // particleA の速度の回転
            const vel0 = this.rotate(particleA.vx, particleA.vy, sin, cos, true);
            // particleB の速度の回転
            const vel1 = this.rotate(particleB.vx, particleB.vy, sin, cos, true);
            // 衝突反応
            const vxTotal = vel0.x - vel1.x;
            vel0.x = ((particleA.mass - particleB.mass) * vel0.x + 2 * particleB.mass * vel1.x) / (particleA.mass + particleB.mass);
            vel1.x = vxTotal + vel0.x;
            // 位置の更新
            pos0.x += vel0.x;
            pos1.x += vel1.x;
            // 位置の回転
            const pos0Final = this.rotate(pos0.x, pos0.y, sin, cos, false);
            const pos1Final = this.rotate(pos1.x, pos1.y, sin, cos, false);
            // 実際の画面位置への調整
            particleB.x = particleA.x + pos1Final.x;
            particleB.y = particleA.y + pos1Final.y;
            particleA.x = particleA.x + pos0Final.x;
            particleA.y = particleA.y + pos0Final.y;
            // 速度の回転
            const vel0Final = this.rotate(vel0.x, vel0.y, sin, cos, false);
            const vel1Final = this.rotate(vel1.x, vel1.y, sin, cos, false);

            particleA.vx = vel0Final.x;
            particleA.vy = vel0Final.y;
            particleB.vx = vel1Final.x;
            particleB.vy = vel1Final.y;
        }
    }

    private rotate(x: number, y: number, sin: number, cos: number, reverse: boolean): createjs.Point {
        const result = new createjs.Point();
        if (reverse) {
            result.x = x * cos + y * sin;
            result.y = y * cos - x * sin;
        } else {
            result.x = x * cos - y * sin;
            result.y = y * cos + x * sin;
        }
        return result;
    }
}
