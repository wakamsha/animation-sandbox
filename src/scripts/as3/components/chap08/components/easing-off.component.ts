import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(abstractOptions)
export class EasingOffComponent extends AbstractComponent {

    private ball: Ball;
    private easing = .1;
    private targetX = 0;

    constructor(a: Title) {
        super(a);
        this.title = 'Easing off';
    }

    ngOnInit() {
        super.init();

        this.targetX = this.centerX;

        this.ball = new Ball();
        this.ball.y = this.centerY;
        this.stage.addChild(this.ball);
    }

    onEnterFrame() {
        const dx = this.targetX - this.ball.x;
        if (Math.abs(dx) < 1) {
            this.ball.x = this.targetX;
            createjs.Ticker.removeAllEventListeners('tick');
            console.log('complete!');
        } else {
            const vx = dx * this.easing;
            this.ball.x += vx;
            this.stage.update();
        }
    }
}
