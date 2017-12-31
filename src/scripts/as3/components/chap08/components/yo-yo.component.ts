import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../../../base.component';
import {Ball} from '../../../../domains/entities/Ball';

@Component(baseOptions)
export class YoYOComponent extends BaseComponent {

    private ball: Ball;
    private line: createjs.Shape;
    private spring = .1;
    private friction = .97;
    private gravity = 5;
    private vx = 0;
    private vy = 0;

    constructor(a: Title) {
        super(a);
        this.title = 'Yo-yo';
    }

    ngOnInit() {
        super.init();

        this.ball = new Ball();
        this.stage.addChild(this.ball);
        this.line = new createjs.Shape();
        this.stage.addChildAt(this.line, 0);
    }

    onEnterFrame() {
        const dx = this.stage.mouseX - this.ball.x;
        const dy = this.stage.mouseY - this.ball.y;
        const ax = dx * this.spring;
        const ay = dy * this.spring;
        this.vx += ax;
        this.vx *= this.friction;
        this.vy += ay;
        this.vy += this.gravity;
        this.vy *= this.friction;

        this.ball.x += this.vx;
        this.ball.y += this.vy;

        this.line.graphics
            .clear()
            .beginStroke('white')
            .setStrokeStyle(1)
            .moveTo(this.ball.x, this.ball.y)
            .lineTo(this.stage.mouseX, this.stage.mouseY);

        this.stage.update();
    }
}
