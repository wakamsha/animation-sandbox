import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../base.component';

@Component(baseOptions)
export class Wave2Component extends BaseComponent {

    private angle = 0;
    private range = 50;
    private speedX = 1;
    private speedY = 1;
    private posX = 0;
    private posY = 0;
    private line: createjs.Shape;

    constructor(a: Title) {
        super(a);
        this.title = 'Wave2';
    }

    ngOnInit() {
        super.init();

        this.line = new createjs.Shape();
        this.stage.addChild(this.line);
        this.line.graphics
            .beginStroke('white')
            .setStrokeStyle(1)
            .moveTo(0, this.centerY);
    }

    onEnterFrame() {
        this.posX += this.speedX;
        this.angle += this.speedY;
        this.posY = this.centerY + Math.sin(this.angle) * this.range;
        this.line.graphics.lineTo(this.posX, this.posY);

        this.stage.update();
    }
}
