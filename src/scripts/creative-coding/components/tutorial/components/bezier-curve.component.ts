import {Component} from '@angular/core';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Title} from '@angular/platform-browser';

@Component(abstractOptions)
export class BezierCurveComponent extends AbstractComponent {

    constructor(a: Title) {
        super(a);
        this.title = 'Hello Canvas';
    }

    ngOnInit() {
        super.init(false);

        this.ctx.moveTo(188, 130);
        this.ctx.bezierCurveTo(140, 10, 388, 10, 388, 170);
        this.ctx.lineWidth = 10;
        this.ctx.strokeStyle = 'white';
        this.ctx.stroke();
    }
}
