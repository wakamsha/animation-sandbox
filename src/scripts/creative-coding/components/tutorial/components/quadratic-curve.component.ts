import {Component} from '@angular/core';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Title} from '@angular/platform-browser';

@Component(abstractOptions)
export class QuadraticCurveComponent extends AbstractComponent {

    constructor(a: Title) {
        super(a);
        this.title = 'Quadratic curve';
    }

    ngOnInit() {
        super.init(false);

        this.ctx.beginPath();
        this.ctx.moveTo(188, 150);
        this.ctx.quadraticCurveTo(348, 500, 388, 150);
        this.ctx.lineWidth = 10;
        this.ctx.strokeStyle = 'white';
        this.ctx.stroke();
    }
}
