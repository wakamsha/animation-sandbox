import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../base.component';
import {Arrow} from '../../../domains/entities/Arrow';

@Component(baseOptions)
export class PointerComponent extends BaseComponent {

    private lineX: createjs.Shape;
    private lineY: createjs.Shape;
    private square: createjs.Shape;
    private arrow: Arrow;
    private textField: createjs.Text;
    private isDrawing = false;

    constructor(a: Title) {
        super(a);
        this.title = 'Pointer';
    }

    ngOnInit() {
        super.init();

        this.arrow = new Arrow();
        this.arrow.x = this.centerX;
        this.arrow.y = this.centerY;

        this.lineX = new createjs.Shape();
        this.lineY = new createjs.Shape();

        this.square = new createjs.Shape();
        this.square.graphics
            .beginStroke('white')
            .setStrokeStyle(2)
            .moveTo(-10, -10)
            .lineTo(-10, 10)
            .lineTo(10, 10)
            .lineTo(10, -10)
            .lineTo(-10, -10)
            .endStroke();
        this.square.alpha = 0;

        this.textField = new createjs.Text('ステージ上をクリックしてドラッグしてみてください。', 'normal 14px Arial');
        this.textField.color = 'white';
        this.textField.x = this.textField.y = 10;

        this.stage.addChild(this.arrow);
        this.stage.addChild(this.lineX);
        this.stage.addChild(this.lineY);
        this.stage.addChild(this.square);
        this.stage.addChild(this.textField);

        this.stage.addEventListener('stagemousedown', () => this.onMouseDown());
        this.stage.addEventListener('stagemouseup', () => this.onMouseUp());

        this.stage.update();
    }

    onEnterFrame() {
        const mousePoint = this.getMousePoint();
        if (this.isDrawing) {
            this.drawPointer(mousePoint);
            this.rotateArrow(mousePoint);

            this.stage.update();
        }
    }

    private onMouseDown() {
        this.isDrawing = true;
    }

    private onMouseUp() {
        this.lineX.graphics.clear();
        this.lineY.graphics.clear();
        this.square.alpha = 0;
        this.isDrawing = false;

        this.stage.update();
    }

    private drawPointer(point: createjs.Point) {
        this.lineX.graphics
            .clear()
            .beginStroke('white')
            .setStrokeStyle(1)
            .moveTo(this.left, point.y)
            .lineTo(this.right, point.y);
        this.lineY.graphics
            .clear()
            .beginStroke('white')
            .setStrokeStyle(1)
            .moveTo(point.x, 0)
            .lineTo(point.x, this.bottom);
        this.square.alpha = 1;
        this.square.x = point.x;
        this.square.y = point.y;
    }

    private rotateArrow(point: createjs.Point) {
        const dx = point.x - this.arrow.x;
        const dy = point.y - this.arrow.y;
        const radians = Math.atan2(dy, dx);
        this.arrow.rotation = radians * 180 / Math.PI;
    }

    private getMousePoint(): createjs.Point {
        return new createjs.Point(this.stage.mouseX, this.stage.mouseY);
    }
}
