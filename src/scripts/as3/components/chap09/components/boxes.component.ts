import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Box} from '../../../domains/entities/Box';

@Component(abstractOptions)
export class BoxesComponent extends AbstractComponent {

    private box: Box;
    private boxes: Box[] = [];
    private gravity = .2;

    constructor(a: Title) {
        super(a);
        this.title = 'Boxes';
    }

    ngOnInit() {
        super.init();

        this.createBox();
    }

    onEnterFrame() {
        this.box.vy += this.gravity;
        this.box.y += this.box.vy;
        if ( this.box.y + this.box.height / 2 > this.canvas.height) {
            this.box.y = this.canvas.height - this.box.height / 2;
            this.createBox();
        }
        for (let i = 0; i < this.boxes.length; i++) {
            const point = this.boxes[i].localToLocal(0, 0, this.box);
            if (this.box !== this.boxes[i] && this.box.hitTest(point.x, point.y)) {
                this.box.y = this.boxes[i].y - this.boxes[i].height / 2 - this.box.height / 2;
                this.createBox();
            }
        }

        this.stage.update();
    }

    private createBox() {
        this.box = new Box(Math.random() * 40 + 10, Math.random() * 40 + 10, `#${Math.floor(Math.random() * 16777215).toString(16)}`);
        this.box.alpha = .8;
        this.box.x = Math.random() * this.canvas.width;
        this.boxes.push(this.box);
        this.stage.addChild(this.box);
    }
}
