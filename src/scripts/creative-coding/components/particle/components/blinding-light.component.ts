import {Component} from '@angular/core';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Title} from '@angular/platform-browser';
import {Particle} from '../domains/entities/Particle';
import {Position} from '../../../../declares/interface';

@Component(abstractOptions)
export class BlindingLightComponent extends AbstractComponent {

    private NUM_OF_PARTICLE = 200;
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
        this.stage.addEventListener('mousedown', () => this.repel = false);
        this.stage.addEventListener('mouseup', () => this.repel = true);

        for (let i = 0; i < this.NUM_OF_PARTICLE; i++) {
            this.particles[i] = new Particle(Math.random() * this.stageWidth, Math.random() * this.stageHeight);
        }
    }

    ngOnDestroy() {
        super.destroy();
        this.stage.removeEventListener('mousemove', this.stage.onmousemove);
        this.stage.removeEventListener('mousedown', this.stage.onmousedown);
        this.stage.removeEventListener('mouseup', this.stage.onmouseup);
    }

    protected onEnterFrame() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.ctx.globalCompositeOperation = 'lighter';
        this.ctx.globalAlpha = .8;
        for (let particle of this.particles) {
            if (this.toggle = !this.toggle) {
                this.stepParticle(particle);
            } else {
                this.drawParticle(particle);
            }
        }
    }

    private stepParticle(p: Particle) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dsq = dx * dx + dy * dy;

        if (true || dsq < p.minDistSq) {
            let f = dsq / p.minDistSq;
            f = f < 0 ? 0 : f > 1 ? 1 : f;

            const a = Math.atan2(dy, dx);

            if (this.repel) {
                f = -f;
            }

            p.fx += Math.cos(a) * f;
            p.fy += Math.sin(a) * f;
        }

        p.fx += (p.ox - p.x) * this.viscosity * p.mass;
        p.fy += (p.oy - p.y) * this.viscosity * p.mass;

        p.vx += p.fx / p.mass;
        p.vy += p.fy / p.mass;

        p.x += p.vx;
        p.y += p.vy;

        p.vx *= 0.95;
        p.vy *= 0.95;

        p.fx = p.fy = 0;
    }

    private drawParticle(p: Particle) {
        const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.mass * 300);
        gradient.addColorStop(0, p.getColorHex(p.radians -= 0.05));
        gradient.addColorStop(1, 'transparent');

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, (p.mass  *300) + Math.abs(Math.cos(p.radians) * 2), 0, Math.PI * 2, false);
        this.ctx.closePath();

        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
}
