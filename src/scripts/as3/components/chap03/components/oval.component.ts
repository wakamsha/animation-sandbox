import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../base.component';
import {Ball} from '../../../../domains/entities/Ball';

@Component(baseOptions)
export class OvalComponent extends BaseComponent {

    private ball: Ball;
    private rail: createjs.Shape;
    private angle = 0;
    private radiusX = 250;
    private radiusY = 150;
    private speed = .05;

    constructor(a: Title) {
        super(a);
        this.title = 'Oval';
    }

    ngOnInit() {
        super.init();

        this.ball = new Ball();
        this.ball.x = 0;
        this.stage.addChild(this.ball);

        this.rail = new createjs.Shape();
        this.rail.graphics
            .beginStroke('white')
            .setStrokeStyle(1)
            .drawEllipse(this.centerX - this.radiusX, this.centerY - this.radiusY, this.radiusX * 2, this.radiusY * 2);
        this.stage.addChildAt(this.rail, 0);
    }

    onEnterFrame() {
        this.ball.x = this.centerX + Math.cos(this.angle) * this.radiusX;
        this.ball.y = this.centerY + Math.sin(this.angle) * this.radiusY;
        this.angle += this.speed;

        this.stage.update();
    }
}
