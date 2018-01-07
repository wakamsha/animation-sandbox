import {Component} from '@angular/core';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Title} from '@angular/platform-browser';

@Component(abstractOptions)
export class ArcComponent extends AbstractComponent {

    constructor(a: Title) {
        super(a);
        this.title = 'Arc';
    }

    ngOnInit() {
        super.init(false);

        const radius = 200;
        const startAngle = 1 * Math.PI;
        const endAngle = 2.5 * Math.PI;

        this.ctx.beginPath();
        this.ctx.strokeStyle = 'white';
        this.ctx.arc(this.centerX, this.centerY, radius, startAngle, endAngle);
        this.ctx.lineWidth = 15;
        this.ctx.stroke();
    }
}
