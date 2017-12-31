import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../../../base.component';

@Component(baseOptions)
export class MultiCurveComponent extends BaseComponent {

    private line: createjs.Shape;
    private numPoints = 5;

    constructor(a: Title) {
        super(a);
        this.title = 'Multi Curve';
    }

    ngOnInit() {
        super.init();

        const points: createjs.Point[] = [];
        for (let i = 0; i < this.numPoints; i++) {
            points[i] = new createjs.Point(Math.random() * this.stageWidth, Math.random() * this.stageHeight);
        }

        this.line = new createjs.Shape();
        this.line.graphics
            .beginStroke('white')
            .setStrokeStyle(1)
            .moveTo(points[0].x, points[0].y);

        // for (let i = 1; i < this.numPoints; i += 2) {
        //     this.line.graphics
        //         .curveTo(points[i].x, points[i].y, points[i+1].x, points[i+1].y);
        // }

        // 中間点を使って自然なカーブを描く
        for (let i = 1; i < this.numPoints - 2; i++) {
            const cx = (points[i].x + points[i+1].x) / 2;
            const cy = (points[i].y + points[i+1].y) / 2;
            this.line.graphics
                .curveTo(points[i].x, points[i].y, cx, cy);
        }

        this.stage.addChild(this.line);
        this.stage.update();
    }
}
