import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {BaseComponent, baseOptions} from '../../base.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(baseOptions)
export class SpringComponent extends BaseComponent {

    private ball: Ball;
    private spring = .1;
    private friction = .97;
    // private targetX = 0;  // demo: spring1,2,3
    // private targetY = 0;  // demo: spring1,2,3
    private vx = 0;
    private vy = 0;

    constructor(a: Title) {
        super(a);
        this.title = 'Spring';
    }

    ngOnInit() {
        super.init();

        // this.targetX = this.centerX;  // demo: spring1,2,3
        // this.targetY = this.centerY;  // demo: spring1,2,3

        this.ball = new Ball();
        this.stage.addChild(this.ball);
    }

    onEnterFrame() {
        // const dx = this.targetX - this.ball.x;  // demo: spring1,2,3
        // const dy = this.targetY - this.ball.y;  // demo: spring1,2,3
        const dx = this.stage.mouseX - this.ball.x;  // demo: spring4
        const dy = this.stage.mouseY - this.ball.y;  // demo: spring4

        const ax = dx * this.spring;
        const ay = dy * this.spring;
        this.vx += ax;
        this.vx *= this.friction;
        this.vy += ay;
        this.vy *= this.friction;
        this.ball.x += this.vx;
        this.ball.y += this.vy;

        this.stage.update();
    }
}
