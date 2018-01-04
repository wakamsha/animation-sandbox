import {Component} from '@angular/core';
import {baseOptions, BaseComponent} from '../../base.component';
import {Ball} from '../../../../domains/entities/Ball';
import {Title} from '@angular/platform-browser';

@Component(baseOptions)
export class Wave1Component extends BaseComponent {

    private ball: Ball;
    private angle = 0;
    private range = 50;
    private speedX = 1;
    private speedY = .05;

    constructor(a: Title) {
        super(a);
        this.title = 'Wave1';
    }

    ngOnInit() {
        super.init();

        this.ball = new Ball();
        this.ball.x = 0;
        this.stage.addChild(this.ball);
    }

    onEnterFrame() {
        this.ball.x += this.speedX;
        this.ball.y = this.centerY + Math.sin(this.angle) * this.range;
        this.angle += this.speedY;

        this.stage.update();
    }
}
