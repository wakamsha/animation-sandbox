import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(abstractOptions)
export class VelocityComponent extends AbstractComponent {

    private ball: Ball;
    private vx = 5;
    private vy = 5;

    constructor(a: Title) {
        super(a);
        this.title = 'Velocity';
    }

    ngOnInit() {
        super.init();

        this.ball = new Ball();
        this.ball.x = 50;
        this.ball.y = 100;
        this.stage.addChild(this.ball);
    }

    onEnterFrame() {
        this.ball.x += this.vx;
        this.ball.y += this.vy;

        this.stage.update();
    }
}
