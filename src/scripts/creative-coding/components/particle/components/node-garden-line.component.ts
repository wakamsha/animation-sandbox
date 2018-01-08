import {Component} from '@angular/core';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Title} from '@angular/platform-browser';
import {Position} from '../../../../declares/interface';

@Component(abstractOptions)
export class NodeGardenLineComponent extends AbstractComponent {

    private particles: Particle[];
    private mousePos: Position;

    constructor(a: Title) {
        super(a);
        this.title = 'Node garden - Line';
    }

    ngOnInit() {
        super.init();

        this.mousePos = {x: 0, y: 0};
        this.stage.addEventListener('mousemove', (e) => this.mousePos = this.getMousePosition(e));

        const num = Math.random() * 50 + 100;
        this.particles = [];
        for (let i = 0; i < num; i++) {
            const p = new Particle();
            p.radius = (Math.random() * ((this.stage.width > this.stage.height) ? this.stage.width : this.stage.height) * 0.33) + 40;
            p.maxRadius = (Math.random() * ((this.stage.width > this.stage.height) ? this.stage.width : this.stage.height) * 0.45);
            this.particles[i] = p;
        }
    }

    ngOnDestroy() {
        super.destroy();
        this.stage.removeEventListener('mousemove', this.stage.onmousemove);
    }

    protected onEnterFrame() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        const distanceFromCenter = this.getDistanceFromCenter(this.mousePos);
        this.particles.forEach((p, i) => {
            this.ctx.lineTo(p.x, p.y);
            this.update(p, distanceFromCenter);
            this.render(p);
            if (p.connected && this.particles[i + 1]) {
                const p2 = this.particles[i + 1];
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.strokeStyle = '#fff';
                this.ctx.globalAlpha = p.opacity * 0.33;
                this.ctx.moveTo(p.x, p.y);
                this.ctx.lineTo(p2.x, p2.y);
                this.ctx.stroke();
                this.ctx.restore();
            }
        })
    }

    private getDistanceFromCenter(pos: Position): number {
        return Math.sqrt(Math.pow(pos.x - (this.stage.width / 2), 2) + Math.pow(pos.y - (this.stage.height / 2), 2));
    }

    private update(p: Particle, distanceFromCenter: number) {
        p.theta += p.speed / 750 * p.direction;
        p.x = this.centerX + (Math.cos(p.theta) * p.radius) * (distanceFromCenter / p.maxRadius);
        p.y = this.centerY + (Math.sin(p.theta) * p.radius) * (distanceFromCenter / p.maxRadius);
        p.radius += p.radialChange;
        if (Math.abs(p.radius) > p.maxRadius) {
            p.radialChange *= -1;
        }
    }

    private render(p: Particle) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = 'white';
        this.ctx.strokeStyle = '#444';
        this.ctx.globalAlpha = p.opacity;
        this.ctx.arc(p.x, p.y, p.size / 2, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();
    }

    private getMousePosition(e: MouseEvent): Position {
        const rect = this.stage.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
}

class Particle {
    public theta = Math.random() * Math.PI * 2;
    public radius = 0;
    public maxRadius = 0;
    public radialChange = Math.random() * 0.1 * ((Math.random() > 0.5) ? 1 : -1);
    public opacity = Math.random();
    public size = Math.round(Math.random() * 6) + 4;
    public speed = Math.round(Math.random() * 4) + 1;
    public direction = (Math.random() > 0.5) ? 1 : -1;
    public x = 0;
    public y = 0;
    public connected = (Math.random() < 0.75);
}
