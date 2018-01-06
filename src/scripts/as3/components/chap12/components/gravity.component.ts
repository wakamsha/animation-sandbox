import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(abstractOptions)
export class GravityComponent extends AbstractComponent {

    private particles: Ball[];
    private numParticle = 30;

    constructor(a: Title) {
        super(a);
        this.title = 'Gravity';
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
}
