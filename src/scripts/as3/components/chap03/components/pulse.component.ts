import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {abstractOptions, AbstractComponent} from '../../abstract.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(abstractOptions)
export class PulseComponent extends AbstractComponent {

    private ball: Ball;
    private angle = 0;
    private centerScale = 0;
    private range = 1;
    private speed = .1;

    constructor(a: Title) {
        super(a);
        this.title = 'Pulse';
    }

    ngOnInit() {
        super.init();

        this.ball = new Ball();
        this.ball.x = this.centerX;
        this.ball.y = this.centerY;
        this.stage.addChild(this.ball);
    }

    onEnterFrame() {
        this.ball.scaleX = this.ball.scaleY = this.centerScale + Math.sin(this.angle) * this.range;
        this.angle += this.speed;
        this.stage.update();
    }
}
