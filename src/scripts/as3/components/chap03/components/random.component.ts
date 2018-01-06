import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {abstractOptions, AbstractComponent} from '../../abstract.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(abstractOptions)
export class RandomComponent extends AbstractComponent {

    private ball: Ball;
    private angleX = 0;
    private angleY = 0;
    private range = 50;
    private speedX = .07;
    private speedY = .11;

    constructor(a: Title) {
        super(a);
        this.title = 'Random';
    }

    ngOnInit() {
        super.init();

        this.ball = new Ball();
        this.ball.x = 0;
        this.stage.addChild(this.ball);
    }

    onEnterFrame() {
        this.ball.x = this.centerX + Math.cos(this.angleX) * this.range;
        this.ball.y = this.centerY + Math.sin(this.angleY) * this.range;
        this.angleX += this.speedX;
        this.angleY += this.speedY;

        this.stage.update();
    }
}
