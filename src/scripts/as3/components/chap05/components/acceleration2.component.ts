import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../../../base.component';
import {Ball} from '../../../../domains/entities/Ball';
import {KeyType} from '../../../../domains/valueobjects/KeyType';

@Component(baseOptions)
export class Acceleration2Component extends BaseComponent {

    private ball: Ball;
    private vx = 0;
    private ax = 0;

    constructor(a: Title) {
        super(a);
        this.title = 'Acceleration2';
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
        this.ball.x += this.vx;

        this.stage.update();
    }

    onKeyDown(event: KeyboardEvent) {
        const keyCode = KeyType.getInstance(event.keyCode).keyCode;
        if (keyCode === KeyType.LEFT.keyCode) {
            this.ax = -.2;
        } else if(keyCode === KeyType.RIGHT.keyCode) {
            this.ax = .2;
        }
    }

    onKeyUp() {
        this.ax = 0;
    }
}
