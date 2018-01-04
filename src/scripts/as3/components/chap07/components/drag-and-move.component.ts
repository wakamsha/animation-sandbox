import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {BaseComponent, baseOptions} from '../../base.component';
import {Ball} from '../../../../domains/entities/Ball';

@Component(baseOptions)
export class DragAndMoveComponent extends BaseComponent {

    private ball: Ball;
    private vx = 0;
    private vy = 0;
    private bounce = -.7;
    private gravity = .5;

    constructor(a: Title) {
        super(a);
        this.title = 'Drag and Move';
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
        if (!this.ball.isDragging) {
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
        }

        this.stage.update();
    }

    private onMouseDown() {
        this.vx = this.vy = 0;
        this.stage.addEventListener('pressup', () => this.onMouseUp());
        this.ball.startDrag();
    }

    private onMouseUp() {
        this.stage.removeAllEventListeners('pressup');
        this.ball.stopDrag();
    }
}
