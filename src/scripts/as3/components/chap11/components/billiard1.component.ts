import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {BaseComponent, baseOptions} from '../../base.component';
import {Ball} from '../../../../domains/entities/Ball';

@Component(baseOptions)
export class Billiard1Component extends BaseComponent {

    private ball0: Ball;
    private ball1: Ball;

    constructor(a: Title) {
        super(a);
        this.title = 'Billiard1';
    }

    ngOnInit() {
        super.init();

        this.ball0 = new Ball();
        this.ball0.mass = 2;
        this.ball0.x = 50;
        this.ball0.y = this.centerY;
        this.ball0.vx = 1;
        this.stage.addChild(this.ball0);

        this.ball1 = new Ball(25);
        this.ball1.mass = 1;
        this.ball1.x = 300;
        this.ball1.y = this.centerY;
        this.ball1.vx = -1;
        this.stage.addChild(this.ball1);
    }

    onEnterFrame() {
        this.ball0.x += this.ball0.vx;
        this.ball1.x += this.ball1.vx;
        const dist = this.ball1.x - this.ball0.x;

        if (Math.abs(dist) < this.ball0.radius + this.ball1.radius) {
            const vxTotal = this.ball0.vx - this.ball1.vx;
            // const vx0Final = ((this.ball0.mass - this.ball1.mass) * this.ball0.vx + 2 * this.ball1.mass * this.ball1.vx) / (this.ball0.mass + this.ball1.mass);
            // const vx1Final = ((this.ball1.mass - this.ball0.mass) * this.ball1.vx + 2 * this.ball0.mass * this.ball0.vx) / (this.ball0.mass + this.ball1.mass);
            this.ball0.vx = ((this.ball0.mass - this.ball1.mass) * this.ball0.vx + 2 * this.ball1.mass * this.ball1.vx) / (this.ball0.mass + this.ball1.mass);
            this.ball1.vx = vxTotal + this.ball0.vx;
            this.ball0.x += this.ball0.vx;
            this.ball1.x += this.ball1.vx;
        }

        this.stage.update();
    }
}
