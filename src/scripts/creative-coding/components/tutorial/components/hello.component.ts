import {Component} from '@angular/core';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Title} from '@angular/platform-browser';

@Component(abstractOptions)
export class HelloComponent extends AbstractComponent {

    constructor(a: Title) {
        super(a);
        this.title = 'Hello Canvas';
    }

    ngOnInit() {
        super.init(false);
        this.ctx.font = '40pt arial';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText('Hello World', this.centerX, this.centerY);
    }
}
