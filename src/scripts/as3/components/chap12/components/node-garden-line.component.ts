import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../../../base.component';
import {Ball} from '../../../../domains/entities/Ball';

@Component(baseOptions)
export class NodeGardenLineComponent extends BaseComponent {

    private particles: Ball[];
    private numParticles = 30;
    private minDist = 100;
    private springAmount = .0005;
    private line: createjs.Shape;

    constructor(a: Title) {
        super(a);
        this.title = 'Node garden line';
    }

    ngOnInit() {
        super.init();

        this.particles = [];
        for (let i = 0; i < this.numParticles; i++) {
            const particle = new Ball(5, '#ffffff');
            particle.x = Math.random() * this.stageWidth;
            particle.y = Math.random() * this.stageHeight;
            particle.vx = Math.random() * 6 - 3;
            particle.vy = Math.random() * 6 - 3;
            this.particles[i] = particle;
            this.stage.addChild(particle);
        }
        this.line = new createjs.Shape();
        this.stage.addChild(this.line);
    }

    onEnterFrame() {
        this.line.graphics.clear();

        for (let i = 0; i < this.numParticles; i++) {
            const particle = this.particles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
            this.checkWalls(particle);
        }
        for (let i = 0; i < this.numParticles; i++) {
            const pA = this.particles[i];
            for (let j = i + 1; j < this.numParticles; j++) {
                const pB = this.particles[j];
                this.spring(pA, pB);
            }
        }
        this.stage.update();
    }

    private checkWalls(particle: Ball) {
        if (particle.x > this.stageWidth) {
            particle.x = 0;
        } else if (particle.x < 0) {
            particle.x = this.stageWidth;
        }
        if (particle.y > this.stageHeight) {
            particle.y = 0;
        } else if (particle.y < 0) {
            particle.y = this.stageHeight;
        }
    }

    private spring(pA: Ball, pB: Ball) {
        const dx = pB.x - pA.x;
        const dy = pB.y - pA.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.minDist) {
            this.line.graphics
                .beginStroke('white')
                .setStrokeStyle(1)
                .moveTo(pA.x, pA.y)
                .lineTo(pB.x, pB.y);
            this.line.alpha = 1 - dist / this.minDist;

            const ax = dx * this.springAmount;
            const ay = dy * this.springAmount;
            pA.vx += ax;
            pA.vy += ay;
            pB.vx += ax;
            pB.vy += ay;
        }
    }
}