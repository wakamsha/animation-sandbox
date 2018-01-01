import {Component} from '@angular/core';
import {BaseComponent, baseOptions} from '../../../../base.component';
import {Title} from '@angular/platform-browser';
import {Star} from '../../../../domains/entities/Star';

@Component(baseOptions)
export class BitmapCompareComponent extends BaseComponent {

    private line: createjs.Shape;
    private bitmap1: createjs.Shape;

    constructor(a: Title) {
        super(a);
        this.title = 'Bitmap Compare';
    }

    ngOnInit() {
        super.init();
        this.line = new createjs.Shape();
        this.line.graphics
            .beginStroke('white')
            .setStrokeStyle(1);
        for (let i = 0; i < 100; i++) {
            this.line.graphics.lineTo(Math.random() * this.stageWidth, Math.random() * this.stageHeight);
        }
        this.stage.addChild(this.line);

        this.bitmap1 = new createjs.Shape();
        this.bitmap1.graphics
            .beginFill('white')
            .drawRect(-50, -50, 100, 100)
            .endFill();
        this.bitmap1.alpha = .5;
        this.bitmap1.x = Math.random() * this.stageWidth;
        this.bitmap1.y = Math.random() * this.stageHeight;
        this.stage.addChild(this.bitmap1);

        const star = new Star(50, '#ff0000');
        star.x = Math.random() * this.stageWidth;
        star.y = Math.random() * this.stageHeight;
        this.stage.addChild(star);
    }

    onEnterFrame() {
        this.stage.update();
    }
}
