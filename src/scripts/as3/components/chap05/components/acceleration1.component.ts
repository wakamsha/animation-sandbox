import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(abstractOptions)
export class Acceleration1Component extends AbstractComponent {

    private ball: Ball;
    private vx = 0;
    private ax = .2;

    constructor(a: Title) {
        super(a);
        this.title = 'Acceleration1';
    }

    ngOnInit() {
        super.init();

        this.ball = new Ball();
        this.ball.x = 50;
        this.ball.y = 100;
        this.stage.addChild(this.ball);
    }

    onEnterFrame() {
        this.vx += this.ax;
        this.ball.x += this.vx;

        this.stage.update();
    }
}
