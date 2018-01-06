import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(abstractOptions)
export class NodeGardenComponent extends AbstractComponent {

    private particles: Ball[];
    private numParticles = 30;
    private minDist = 100;
    private springAmount = 0.000001;

    constructor(a: Title) {
        super(a);
        this.title = 'Node garden';
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
    }

    onEnterFrame() {
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
            const ax = dx * this.springAmount;
            const ay = dy * this.springAmount;
            pA.vx += ax;
            pA.vy += ay;
            pB.vx += ax;
            pB.vy += ay;
        }
    }
}
