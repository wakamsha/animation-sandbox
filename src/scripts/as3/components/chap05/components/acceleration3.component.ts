import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {BaseComponent, baseOptions} from '../../base.component';
import {Ball} from '../../../../domains/entities/Ball';
import {KeyType} from '../../../../domains/valueobjects/KeyType';

@Component(baseOptions)
export class Acceleration3Component extends BaseComponent {

    private ball: Ball;
    private vx = 0;
    private vy = 0;
    private ax = 0;
    private ay = 0;

    constructor(a: Title) {
        super(a);
        this.title = 'Acceleration3';
    }

    ngOnInit() {
        super.init();

        this.ball = new Ball();
        this.ball.x = this.centerX;
        this.ball.y = this.centerY;
        this.stage.addChild(this.ball);

        document.addEventListener('keydown', (event: KeyboardEvent) => this.onKeyDown(event));
        document.addEventListener('keyup', () => this.onKeyUp());
    }

    onEnterFrame() {
        this.vx += this.ax;
        this.vy += this.ay;
        this.ball.x += this.vx;
        this.ball.y += this.vy;

        this.stage.update();
    }

    onKeyDown(event: KeyboardEvent) {
        const keyType = KeyType.getInstance(event.keyCode);
        switch (keyType) {
            case KeyType.LEFT:
                this.ax = -.2;
                break;
            case KeyType.RIGHT:
                this.ax = .2;
                break;
            case KeyType.UP:
                this.ay = -.2;
                break;
            case KeyType.DOWN:
                this.ay = .2;
                break;
        }
    }

    onKeyUp() {
        this.ax = this.ay = 0;
    }
}
