import {Component} from '@angular/core';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Title} from '@angular/platform-browser';
import {Particle} from '../domains/entities/Particle';
import {Position} from '../../../../declares/interface';

@Component(abstractOptions)
export class BlindingLightComponent extends AbstractComponent {

    private numOfParticle = 200;
    private particles: Particle[] = [];
    private repel = true;
    private viscosity = .007;
    private toggle = true;

    private mouse: Position;

    constructor(a: Title) {
        super(a);
        this.title = 'Blinding light';
    }

    ngOnInit() {
        super.init();
        this.mouse = { x: 0, y: 0 };
        this.stage.addEventListener('mousemove', (e) => this.mouse = this.getMousePosition(e));

        for (let i = 0; i < this.numOfParticle; i++) {
            this.particles[i] = new Particle(Math.random() * this.stageWidth, Math.random() * this.stageHeight);
        }
    }

    ngOnDestroy() {
        super.destroy();
        this.stage.removeEventListener('mousemove', this.stage.onmousemove);
    }

    protected onEnterFrame() {
        if (this.toggle = !this.toggle) {
            this.step();
        } else {
            this.draw();
        }
    }

    private step() {
        this.particles.forEach(particle => {
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const dSq = dx * dx + dy * dy;

            if( true || dSq < particle.minDistSq ) {
                let f = dSq / particle.minDistSq;
                f = f < 0 ? 0 : f > 1 ? 1 : f;

                const a = Math.atan2(dy,dx);

                if( this.repel ) {
                    f = -f;
                }

                // Sum forces
                particle.fx += Math.cos(a) * f;
                particle.fy += Math.sin(a) * f;
            }


            particle.fx += (particle.ox - particle.x) * this.viscosity * particle.mass;
            particle.fy += (particle.oy - particle.y) * this.viscosity * particle.mass;

            // Euler integration step
            particle.vx += particle.fx / particle.mass;
            particle.vy += particle.fy / particle.mass;

            particle.x += particle.vx;
            particle.y += particle.vy;

            // Dampen velocity
            particle.vx *= 0.95;
            particle.vy *= 0.95;

            // Clear forces
            particle.fx = particle.fy = 0;
        });
    }

    private draw() {
        this.particles.forEach(particle => {
            const gradient = this.ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.mass * 300);
            gradient.addColorStop(1, 'transparent');
            gradient.addColorStop(0, particle.getColorHex(particle.radians -= .05));

            this.ctx.globalCompositeOperation = 'lighter';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, (particle.mass * 300) + Math.abs(Math.cos(particle.radians) * 2), 0, Math.PI * 2, false);
            this.ctx.closePath();

            this.ctx.globalAlpha = .8;
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        });
    }


}
