import {Component} from '@angular/core';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Title} from '@angular/platform-browser';

@Component(abstractOptions)
export class BlightComponent extends AbstractComponent {

    private NUM_OF_PARTICLE = 50;

    constructor(a: Title) {
        super(a);
        this.title = 'Blight';
    }

    ngOnInit() {
        super.init();
        this.ctx.globalCompositeOperation = 'lighter';
        for (let _i = 0; _i < this.NUM_OF_PARTICLE; _i++) {
            this.draw();
        }
    }

    private draw() {
        const x = Math.random() * this.stageWidth;
        const y = Math.random() * this.stageHeight;
        const radius = Math.random() * this.stageWidth / 3;

        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(1, 'transparent');
        gradient.addColorStop(0, this.getColorHue(radius));

        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        this.ctx.closePath();

        this.ctx.globalAlpha = .8;
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }

    private getColorHue(radians: number): string {
        const r = this.getChannel(radians);
        const g = this.getChannel(radians + Math.PI * 2 / 3);
        const b = this.getChannel(radians + Math.PI * 2 / 3 * 2);
        return `rgb(${r}, ${g}, ${b})`;
    }

    private getChannel(angle: number): number {
        return Math.round(Math.cos(angle) * 127 + 128);
    }
}
