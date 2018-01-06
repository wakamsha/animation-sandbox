import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(abstractOptions)
export class Rotate1Component extends AbstractComponent {

    private ball: Ball;
    private angle = 0;
    private radius = 150;
    private vr = .1;

    constructor(a: Title) {
        super(a);
        this.title = 'Rotate1';
    }

    ngOnInit() {
        super.init();

        this.ball = new Ball();
        this.stage.addChild(this.ball);
    }

    onEnterFrame() {
        this.ball.x = this.centerX + Math.cos(this.angle) * this.radius;
        this.ball.y = this.centerY + Math.sin(this.angle) * this.radius;
        this.angle += this.vr;

        this.stage.update();
    }
}
