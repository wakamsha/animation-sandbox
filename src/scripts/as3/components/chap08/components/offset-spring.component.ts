import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../../../base.component';
import {Ball} from '../../../../domains/entities/Ball';

@Component(baseOptions)
export class OffsetSpringComponent extends BaseComponent {

    private ball: Ball;
    private spring = .1;
    private vx = 0;
    private vy = 0;
    private friction = .95;
    private springLength = 100;
    private line: createjs.Shape;

    constructor(a: Title) {
        super(a);
        this.title = 'Offset spring';
    }

    ngOnInit() {
        super.init();

        this.line = new createjs.Shape();
        this.stage.addChild(this.line);

        this.ball = new Ball(20);
        this.stage.addChild(this.ball);
    }

    onEnterFrame() {
        const dx = this.ball.x - this.stage.mouseX;
        const dy = this.ball.y - this.stage.mouseY;
        const angle = Math.atan2(dy, dx);
        const targetX = this.stage.mouseX + Math.cos(angle) * this.springLength;
        const targetY = this.stage.mouseY + Math.sin(angle) * this.springLength;
        this.vx += (targetX - this.ball.x) * this.spring;
        this.vy += (targetY - this.ball.y) * this.spring;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.ball.x += this.vx;
        this.ball.y += this.vy;

        this.line.graphics
            .clear()
            .beginStroke('white')
            .setStrokeStyle(1)
            .moveTo(this.stage.mouseX, this.stage.mouseY)
            .lineTo(this.ball.x, this.ball.y);

        this.stage.update();
    }
}
