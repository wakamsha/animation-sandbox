import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Ball} from '../../../domains/entities/Ball';

@Component(abstractOptions)
export class MouseMoveDragComponent extends AbstractComponent {

    private ball: Ball;

    constructor(a: Title) {
        super(a);
        this.title = 'Mouse Move Drag';
    }

    ngOnInit() {
        super.init();

        this.ball = new Ball();
        this.ball.x = this.centerX;
        this.ball.y = this.centerY;
        this.ball.addEventListener('mousedown', () => this.onMouseDown());
        this.stage.addChild(this.ball);

        this.stage.update();
    }

    onEnterFrame() {
    }

    private onMouseDown() {
        this.stage.addEventListener('pressup', () => this.onMouseUp());
        this.stage.addEventListener('pressmove', () => this.onMouseMove());
    }

    private onMouseUp() {
        this.stage.removeAllEventListeners('pressup');
        this.stage.removeAllEventListeners('pressmove');
    }

    private onMouseMove() {
        this.ball.x = this.stage.mouseX;
        this.ball.y = this.stage.mouseY;
        this.stage.update();
    }
}
