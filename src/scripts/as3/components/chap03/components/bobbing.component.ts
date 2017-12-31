import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Ball} from '../../../../domains/entities/Ball';
import {BaseComponent, baseOptions} from '../../../../base.component';

@Component(baseOptions)
export class BobbingComponent extends BaseComponent {

    private ball: Ball;
    private angle = 0;
    private range = 50;
    private speed = .1;

    constructor(a: Title) {
        super(a);
        this.title = 'Bobbing';
    }

    ngOnInit() {
        super.init();

        this.ball = new Ball();
        this.stage.addChild(this.ball);
        this.ball.x = this.centerX;
    }

    onEnterFrame() {
        this.ball.y = this.centerY + Math.sin(this.angle) * this.range;
        this.angle += this.speed;
        this.stage.update();
    }
}
