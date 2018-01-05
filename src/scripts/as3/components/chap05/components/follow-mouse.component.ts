import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {BaseComponent, baseOptions} from '../../base.component';
import {Arrow} from '../../../domains/entities/Arrow';

@Component(baseOptions)
export class FollowMouseComponent extends BaseComponent {

    private arrow: Arrow;
    private speed = 5;

    constructor(a: Title) {
        super(a);
        this.title = 'Follow mouse';
    }

    ngOnInit() {
        super.init();

        this.arrow = new Arrow();
        this.stage.addChild(this.arrow);
    }

    onEnterFrame() {
        const dx = this.stage.mouseX - this.arrow.x;
        const dy = this.stage.mouseY - this.arrow.y;
        const angle = Math.atan2(dy, dx);
        this.arrow.rotation = angle * 180 / Math.PI;
        const vx = Math.cos(angle) * this.speed;
        const vy = Math.sin(angle) * this.speed;
        this.arrow.x += vx;
        this.arrow.y += vy;

        this.stage.update();
    }
}
