import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {BaseComponent, baseOptions} from '../../base.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(baseOptions)
export class VelocityComponent extends BaseComponent {

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
