import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {BaseComponent, baseOptions} from '../../base.component';
import {Ball} from '../../../domains/entities/Ball';
import {KeyType} from '../../../domains/valueobjects/KeyType';

@Component(baseOptions)
export class Perspective1Component extends BaseComponent {

    private ball: Ball;
    private xPos = 0;
    private yPos = 0;
    private zPos = 0;
    private focalLength = 250;
    private vpX = 0;
    private vpY = 0;

    constructor(a: Title) {
        super(a);
        this.title = 'Perspective1';
    }

    ngOnInit() {
        super.init();

        this.vpX = this.centerX;
        this.vpY = this.centerY;
        this.ball = new Ball();
        this.stage.addChild(this.ball);

        document.addEventListener('keydown', (event: KeyboardEvent) => this.onKeyDown(event));
    }

    onEnterFrame() {
        this.xPos = this.stage.mouseX - this.vpX;
        this.yPos = this.stage.mouseY - this.vpY;
        const scale = this.focalLength / (this.focalLength + this.zPos);
        this.ball.scaleX = this.ball.scaleY = scale;
        this.ball.x = this.vpX + this.xPos * scale;
        this.ball.y = this.vpY + this.yPos * scale;

        this.stage.update();
    }

    private onKeyDown(event: KeyboardEvent) {
        const keyType = KeyType.getInstance(event.keyCode);
        switch (keyType) {
            case KeyType.UP:
                this.zPos += 5;
                break;
            case KeyType.DOWN:
                this.zPos -= 5;
                break;
        }
    }
}
