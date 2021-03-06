import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(abstractOptions)
export class PointHitTestComponent extends AbstractComponent {

    private ball: Ball;

    constructor(a: Title) {
        super(a);
        this.title = 'Point hit test';
    }

    ngOnInit() {
        super.init();

        this.ball = new Ball();
        this.ball.x = this.centerX;
        this.ball.y = this.centerY;
        this.ball.alpha = .2;
        this.stage.addChild(this.ball);
    }

    onEnterFrame() {
        const point = this.ball.globalToLocal(this.stage.mouseX, this.stage.mouseY);
        if (this.ball.hitTest(point.x, point.y)) {
            this.ball.alpha = 1;
        } else {
            this.ball.alpha = .2;
        }
        this.stage.update();
    }
}
