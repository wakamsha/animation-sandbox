import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {KeyType} from '../../../domains/valueobjects/KeyType';
import {Ball} from '../../../domains/entities/Ball';

@Component(abstractOptions)
export class Velocity3DComponent extends AbstractComponent {

    private ball: Ball;
    private xPos = 0;
    private yPos = 0;
    private zPos = 0;
    private vx = 0;
    private vy = 0;
    private vz = 0;
    private friction = .98;
    private focalLength = 250;
    private vpX = 0;
    private vpY = 0;

    constructor(a: Title) {
        super(a);
        this.title = 'Velocity 3D';
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
        this.xPos += this.vx;
        this.yPos += this.vy;
        this.zPos += this.vz;

        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vz *= this.friction;

        if (this.zPos > -this.focalLength) {
            const scale = this.focalLength / (this.focalLength + this.zPos);
            this.ball.scaleX = this.ball.scaleY = scale;
            this.ball.x = this.vpX + this.xPos * scale;
            this.ball.y = this.vpY + this.yPos * scale;
            this.ball.visible = true;
        } else {
            this.ball.visible = false;
        }

        this.stage.update();
    }

    private onKeyDown(event: KeyboardEvent) {
        const keyType = KeyType.getInstance(event.keyCode);
        switch (keyType) {
            case KeyType.UP:
                this.vy -= 1;
                break;
            case KeyType.DOWN:
                this.vy += 1;
                break;
            case KeyType.LEFT:
                this.vx -= 1;
                break;
            case KeyType.RIGHT:
                this.vx += 1;
                break;
            case KeyType.SHIFT:
                this.vz += 1;
                break;
            case KeyType.CONTROL:
                this.vz -= 1;
                break;
            default:
                break;
        }
    }
}
