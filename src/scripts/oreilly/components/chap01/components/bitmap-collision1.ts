import {Component} from '@angular/core';
import {BaseComponent, baseOptions} from '../../../../base.component';
import {Star} from '../../../../domains/entities/Star';
import {Title} from '@angular/platform-browser';

@Component(baseOptions)
export class BitmapCollision1 extends BaseComponent {
    private star1: Star;
    private star2: Star;

    constructor(a: Title) {
        super(a);
        this.title = 'Bitmap Collision';
    }

    ngOnInit() {
        super.init();

        this.star1 = new Star(40, '#ffffff');
        this.star1.x = Math.random() * this.stageWidth;
        this.star1.y = Math.random() * this.stageHeight;
        this.stage.addChild(this.star1);

        this.star2 = new Star(40, '#ff0000');
        this.star2.x = Math.random() * this.stageWidth;
        this.star2.y = Math.random() * this.stageHeight;
        this.stage.addChild(this.star2);
    }

    onEnterFrame() {
        this.star2.x = this.stage.mouseX;
        this.star2.y = this.stage.mouseY;

        const point = this.star2.localToLocal(0, 0, this.star1);
        if (this.star1.hitTest(point.x, point.y)) {
            this.star2.alpha = 1;
        } else {
            this.star2.alpha = .2;
        }
        this.stage.update();
    }
}
