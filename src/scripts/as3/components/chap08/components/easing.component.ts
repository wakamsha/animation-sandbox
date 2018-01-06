import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(abstractOptions)
export class EasingComponent extends AbstractComponent {

    private ball: Ball;
    private easing = .1;
    private targetX = 0;
    private targetY = 0;

    constructor(a: Title) {
        super(a);
        this.title = 'Easing';
    }

    ngOnInit() {
        super.init();

        this.ball = new Ball();
        this.stage.addChild(this.ball);

        this.targetX = this.centerX;
        this.targetY = this.centerY;
    }

    onEnterFrame() {
        const vx = (this.targetX - this.ball.x) * this.easing;
        const vy = (this.targetY - this.ball.y) * this.easing;
        this.ball.x += vx;
        this.ball.y += vy;

        this.stage.update();
    }
}
