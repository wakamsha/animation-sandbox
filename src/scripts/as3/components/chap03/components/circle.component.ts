import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Ball} from '../../../../domains/entities/Ball';
import {BaseComponent, baseOptions} from '../../../../base.component';

@Component(baseOptions)
export class CircleComponent extends BaseComponent {

    private ball: Ball;
    private rail: createjs.Shape;
    private radius = 200;
    private angle = 0;
    private speed = .05;

    constructor(a: Title) {
        super(a);
        this.title = 'Circle';
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
            .drawCircle(this.centerX, this.centerY, this.radius);
        this.stage.addChildAt(this.rail, 0);
    }

    onEnterFrame() {
        this.ball.x = this.centerX + Math.cos(this.angle) * this.radius;
        this.ball.y = this.centerY + Math.sin(this.angle) * this.radius;
        this.angle += this.speed;
        this.stage.update();
    }
}
