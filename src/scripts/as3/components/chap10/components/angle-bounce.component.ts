import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {BaseComponent, baseOptions} from '../../base.component';
import {Ball} from '../../../../domains/entities/Ball';

@Component(baseOptions)
export class AngleBounceComponent extends BaseComponent {

    private ball: Ball;
    private line: createjs.Shape;
    private gravity = .3;
    private bounce = -.6;
    private cos = 0;
    private sin = 0;

    constructor(a: Title) {
        super(a);
        this.title = 'Angle bounce';
    }

    ngOnInit() {
        super.init();

        this.ball = new Ball();
        this.ball.x = 100;
        this.ball.y = 100;
        this.stage.addChild(this.ball);

        this.line = new createjs.Shape();
        this.line.graphics
            .beginStroke('white')
            .setStrokeStyle(1)
            .moveTo(0, 0)
            .lineTo(300, 0);
        this.line.x = 50;
        this.line.y = 300;
        this.line.rotation = 30;
        this.stage.addChild(this.line);
    }

    onEnterFrame() {
        // this.line.rotation = (this.centerX - this.stage.mouseX) * .1;

        // 通常のモーションコード
        this.ball.vy += this.gravity;
        this.ball.x += this.ball.vx;
        this.ball.y += this.ball.vy;

        // 角度とサイン、コサインの取得
        const angle = this.line.rotation * Math.PI / 180;
        this.cos = Math.cos(angle);
        this.sin = Math.sin(angle);

        // 線を基準にしたボールの位置の取得
        let x1 = this.ball.x - this.line.x;
        let y1 = this.ball.y - this.line.y;

        // 座標の回転
        let y2 = this.cos * y1 - this.sin * x1;

        // 回転させた値を使った跳ね返りの実行
        if (y2 > -this.ball.radius) {
            // 座標の回転
            const x2 = this.cos * x1 + this.sin * y1;

            // 速度の回転
            const vx1 = this.cos * this.ball.vx + this.sin * this.ball.vy;
            let   vy1 = this.cos * this.ball.vy - this.sin * this.ball.vx;

            y2 = -this.ball.radius;
            vy1 *= this.bounce;

            // 全てを回転させ元に戻す
            x1 = this.cos * x2 - this.sin * y2;
            y1 = this.cos * y2 + this.sin * x2;
            this.ball.vx = this.cos * vx1 - this.sin * vy1;
            this.ball.vy = this.cos * vy1 + this.sin * vx1;
            this.ball.x = this.line.x + x1;
            this.ball.y = this.line.y + y1;
        }

        this.stage.update();
    }
}
