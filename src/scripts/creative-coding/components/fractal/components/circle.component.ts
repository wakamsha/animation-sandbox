import {Component} from '@angular/core';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Title} from '@angular/platform-browser';

@Component(abstractOptions)
export class CircleComponent extends AbstractComponent {

    constructor(a: Title) {
        super(a);
        this.title = 'Circle';
    }

    ngOnInit() {
        super.init(false);

        this.drawCircle({x: this.centerX, y: this.centerY, r: 226});
    }

    private drawCircle({x, y, r}: {
        x: number;
        y: number;
        r: number
    }) {
        const startingHue = 113;
        this.ctx.beginPath();
        this.ctx.strokeStyle = `hsla(${startingHue * r / 5 % 360}, 80%, 70%, .8)`;
        this.ctx.arc(x, y, r, 1, 3 * Math.PI);
        this.ctx.stroke();

        if (r > 60) {
            this.drawCircle({x: x + r / 2, y, r: r / 2});
            this.drawCircle({x: x - r / 2, y, r: r / 2});
            this.drawCircle({x, y: y + r / 2, r: r / 2});
            this.drawCircle({x, y: y - r / 2, r: r / 2});
        }
    }
}
