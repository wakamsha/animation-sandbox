import {Component} from '@angular/core';
import {abstractOptions, AbstractComponent} from '../../abstract.component';
import {Arrow} from '../../../domains/entities/Arrow';
import {Title} from '@angular/platform-browser';

@Component(abstractOptions)
export class RotateToMouseComponent extends AbstractComponent {

    private arrow: Arrow;

    constructor(a: Title) {
        super(a);
        this.title = 'RotateToMouse';
    }

    ngOnInit() {
        super.init();
        this.arrow = new Arrow();
        this.stage.addChild(this.arrow);
    }

    onEnterFrame() {
        const dx = this.stage.mouseX - this.arrow.x;
        const dy = this.stage.mouseY - this.arrow.y;
        const radians = Math.atan2(dy, dx);
        this.arrow.rotation = radians * 180 / Math.PI;

        this.arrow.x = this.centerX;
        this.arrow.y = this.centerY;

        this.stage.update();
    }
}
