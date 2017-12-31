import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../../../base.component';
import {Ball} from '../../../../domains/entities/Ball';

@Component(baseOptions)
export class Friction1Component extends BaseComponent {

    private ball: Ball;
    private vx = 0;
    private vy = 0;
    private friction = .1;

    constructor(a: Title) {
        super(a);
        this.title = 'Friction';
    }

    ngOnInit() {
        super.init();

        this.ball = new Ball();
        this.ball.x = this.centerX;
        this.ball.y = this.centerY;
        this.stage.addChild(this.ball);

        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;
    }

    onEnterFrame() {
        let speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const angle = Math.atan2(this.vy, this.vx);
        if (speed > this.friction) {
            speed -= this.friction;
        } else {
            speed = 0;
        }
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.ball.x += this.vx;
        this.ball.y += this.vy;

        this.stage.update();
    }
}

