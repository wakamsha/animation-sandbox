import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../../../base.component';
import {Ball} from '../../../../domains/entities/Ball';

@Component(baseOptions)
export class Rotate2Component extends BaseComponent {

    private ball: Ball;
    private vr = .05;
    private cos = Math.cos(this.vr);
    private sin = Math.sin(this.vr);

    constructor(a: Title) {
        super(a);
        this.title = 'Rotate2';
    }

    ngOnInit() {
        super.init();

        this.ball = new Ball();
        this.ball.x = Math.random() * this.stageWidth;
        this.ball.y = Math.random() * this.stageHeight;
        this.stage.addChild(this.ball);
    }

    onEnterFrame() {
        const x1 = this.ball.x - this.stageWidth / 2;
        const y1 = this.ball.y - this.stageHeight / 2;
        const x2 = this.cos * x1 - this.sin * y1;
        const y2 = this.cos * y1 + this.sin * x1;
        this.ball.x = this.stageWidth / 2 + x2;
        this.ball.y = this.stageHeight / 2 + y2;

        this.stage.update();
    }
}
