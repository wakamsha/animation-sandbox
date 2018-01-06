import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractComponent, abstractOptions} from '../../abstract.component';

@Component(abstractOptions)
export class DrawingCurveComponent extends AbstractComponent {

    private x0 = 100;
    private y0 = 200;
    private x1 = 0;
    private y1 = 0;
    private x2 = 300;
    private y2 = 200;
    private line: createjs.Shape;

    constructor(a: Title) {
        super(a);
        this.title = 'Drawing Curve';
    }

    ngOnInit() {
        super.init();

        this.line = new createjs.Shape();
        this.stage.addChild(this.line);
        this.stage.addEventListener('stagemousemove', () => this.onMouseMove());
    }

    private onMouseMove() {
        // カーソルまでの半分程度までしか曲線が届かない
        // this.x1 = this.stage.mouseX;
        // this.y1 = this.stage.mouseY;

        // 曲線がカーソルまで届く
        this.x1 = this.stage.mouseX * 2 - (this.x0 + this.x2) / 2;
        this.y1 = this.stage.mouseY * 2 - (this.y0 + this.y2) / 2;

        this.line.graphics
            .clear()
            .beginStroke('white')
            .setStrokeStyle(1)
            .moveTo(this.x0, this.y0)
            .curveTo(this.x1, this.y1, this.x2, this.y2);

        this.stage.update();
    }
}
