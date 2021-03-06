import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(abstractOptions)
export class EasingToMouseComponent extends AbstractComponent {

    private ball: Ball;
    private easing = .1;

    constructor(a: Title) {
        super(a);
        this.title = 'Easing to mouse';
    }

    ngOnInit() {
        super.init();

        this.ball = new Ball();
        this.stage.addChild(this.ball);
    }

    onEnterFrame() {
        const vx = (this.stage.mouseX - this.ball.x) * this.easing;
        const vy = (this.stage.mouseY - this.ball.y) * this.easing;
        this.ball.x += vx;
        this.ball.y += vy;

        this.stage.update();
    }
}
