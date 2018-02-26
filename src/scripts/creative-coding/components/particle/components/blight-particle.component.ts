import {Component} from '@angular/core';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Title} from '@angular/platform-browser';
import {Particle} from '../domains/entities/Particle';

@Component(abstractOptions)
export class BlightParticleComponent extends AbstractComponent {

    private NUM_OF_PARTICLE = 60;
    private particles: Particle[] = [];

    constructor(a: Title) {
        super(a);
        this.title = 'Blight particle';
    }

    ngOnInit() {
        super.init();
        for (let i = 0; i < this.NUM_OF_PARTICLE; i++) {
            const x = Math.random() * this.stageWidth;
            const y = Math.random() * this.stageHeight;
            this.particles[i] = this.createParticle(x, y);
        }
    }

    ngOnDestroy() {
        super.destroy();
    }

    protected onEnterFrame() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.ctx.globalAlpha = .8;
        this.ctx.globalCompositeOperation = 'lighter';

        for (let particle of this.particles) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            this.checkWalls(particle);
            this.drawParticle(particle);
        }
    }

    private createParticle(x: number, y: number): Particle {
        const particle = new Particle(x, y);
        particle.radians = Math.random() * this.stageWidth / 3;
        particle.vx = Math.random() * 6 - 3;
        particle.vy = Math.random() * 6 - 3;
        return particle;
    }

    private drawParticle(particle: Particle) {
        const gradient = this.ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radians);
        gradient.addColorStop(0, particle.getColorHex(particle.radians));
        gradient.addColorStop(1, 'transparent');

        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radians, 0, Math.PI * 2, false);
        this.ctx.closePath();
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }

    private checkWalls(particle: Particle) {
        if (particle.x > this.stageWidth || particle.x < 0) {
            particle.vx *= -1;
        }
        if (particle.y > this.stageHeight || particle.y < 0) {
            particle.vy *= -1;
        }
    }
}
