import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../../../base.component';
import {Ball} from '../../../../domains/entities/Ball';

@Component(baseOptions)
export class ThrowingComponent extends BaseComponent {

    private ball: Ball;
    private vx = 0;
    private vy = 0;
    private bounce = -.7;
    private gravity = .5;
    private oldX = 0;
    private oldY = 0;

    constructor(a: Title) {
        super(a);
        this.title = 'Throwing';
    }

    ngOnInit() {
        super.init();

        this.ball = new Ball();
        this.ball.x = this.centerX;
        this.ball.y = this.centerY;
        this.stage.addChild(this.ball);

        this.vx = Math.random() * 10 - 5;
        this.vy = -10;

        this.ball.addEventListener('mousedown', () => this.onMouseDown());
    }

    onEnterFrame() {
        this.vy += this.gravity;
        this.ball.x += this.vx;
        this.ball.y += this.vy;

        if (this.ball.x + this.ball.radius > this.right) {
            this.ball.x = this.right - this.ball.radius;
            this.vx *= this.bounce;
        } else if (this.ball.x - this.ball.radius < this.left) {
            this.ball.x = this.left + this.ball.radius;
            this.vx *= this.bounce;
        }
        if (this.ball.y + this.ball.radius > this.bottom) {
            this.ball.y = this.bottom - this.ball.radius;
            this.vy *= this.bounce;
        } else if (this.ball.y - this.ball.radius < this.top) {
            this.ball.y = this.top + this.ball.radius;
            this.vy *= this.bounce;
        }

        this.stage.update();
    }

    private onMouseDown() {
        this.oldX = this.ball.x;
        this.oldY = this.ball.y;
        this.stage.addEventListener('pressup', () => this.onMouseUp());
        this.ball.startDrag();
        createjs.Ticker.removeAllEventListeners('tick');
        createjs.Ticker.addEventListener('tick', () => this.trackVelocity());
    }

    private onMouseUp() {
        this.stage.removeAllEventListeners('pressup');
        this.ball.stopDrag();
        createjs.Ticker.removeAllEventListeners('tick');
        createjs.Ticker.addEventListener('tick', () => this.onEnterFrame());
    }

    private trackVelocity() {
        this.vx = this.ball.x - this.oldX;
        this.vy = this.ball.y - this.oldY;
        this.oldX = this.ball.x;
        this.oldY = this.ball.y;

        this.stage.update();
    }
}
