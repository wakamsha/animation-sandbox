import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {BaseComponent, baseOptions} from '../../base.component';
import {Ball} from '../../../../domains/entities/Ball';

@Component(baseOptions)
export class MultiSpringComponent extends BaseComponent {

    private ball: Ball;
    private handles: Ball[];
    private line: createjs.Shape;
    private spring = .1;
    private friction = .8;
    private numOfHandles = 3;

    constructor(a: Title) {
        super(a);
        this.title = 'Multi spring';
    }

    ngOnInit() {
        super.init();

        this.line = new createjs.Shape();
        this.stage.addChild(this.line);

        this.ball = new Ball(20);
        this.stage.addChild(this.ball);

        this.handles = [];
        for (let i = 0; i < this.numOfHandles; i++) {
            const handle = new Ball(10, '#0000ff');
            handle.x = Math.random() * this.canvas.width;
            handle.y = Math.random() * this.canvas.height;
            handle.addEventListener('mousedown', (event: MouseEvent) => this.onPress(event));
            this.handles[i] = handle;
            this.stage.addChild(handle);
        }
        this.stage.addEventListener('pressup', () => this.onRelease());
    }

    onEnterFrame() {
        for (let i = 0; i < this.numOfHandles; i++) {
            const handle = this.handles[i];
            const dx = handle.x - this.ball.x;
            const dy = handle.y - this.ball.y;
            this.ball.vx += dx * this.spring;
            this.ball.vy += dy * this.spring;
        }
        this.ball.vx *= this.friction;
        this.ball.vy *= this.friction;
        this.ball.x += this.ball.vx;
        this.ball.y += this.ball.vy;

        this.line.graphics
            .clear()
            .beginStroke('white')
            .setStrokeStyle(1);
        for (let i = 0; i < this.numOfHandles; i++) {
            this.line.graphics
                .moveTo(this.ball.x, this.ball.y)
                .lineTo(this.handles[i].x, this.handles[i].y);
        }

        this.stage.update();
    }

    private onPress(event: MouseEvent) {
        const ball = <Ball>event.target;
        ball.startDrag();
    }

    private onRelease() {
        for (let i = 0; i < this.numOfHandles; i++) {
            this.handles[i].stopDrag();
        }
    }
}
