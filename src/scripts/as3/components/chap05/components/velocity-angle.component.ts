import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {BaseComponent, baseOptions} from '../../base.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(baseOptions)
export class VelocityAngleComponent extends BaseComponent {

    private ball: Ball;
    private angle = 45;
    private speed = 3;

    constructor(a: Title) {
        super(a);
        this.title = 'Velocity angle';
    }

    ngOnInit() {
        super.init();

        this.ball = new Ball();
        this.ball.x = 50;
        this.ball.y = 100;
        this.stage.addChild(this.ball);
    }

    onEnterFrame() {
        const radians = this.angle * Math.PI / 180;
        const vx = Math.cos(radians) * this.speed;
        const vy = Math.sin(radians) * this.speed;

        this.ball.x += vx;
        this.ball.y += vy;

        this.stage.update();
    }
}
