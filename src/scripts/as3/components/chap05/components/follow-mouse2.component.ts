import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {baseOptions, BaseComponent} from '../../../../base.component';
import {Arrow} from '../../../../domains/entities/Arrow';

@Component(baseOptions)
export class FollowMouse2Component extends BaseComponent {

    private arrow: Arrow;
    private vx = 0;
    private vy = 0;
    private force = .5;

    private friction = .97;  // Chapter.6 で追加

    constructor(a: Title) {
        super(a);
        this.title = 'Follow mouse 2';
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

        const ax = Math.cos(angle) * this.force;
        const ay = Math.sin(angle) * this.force;
        this.vx += ax;
        this.vy += ay;

        this.vx *= this.friction;  // Chapter.6 で追加
        this.vy *= this.friction;  // Chapter.6 で追加

        this.arrow.x += this.vx;
        this.arrow.y += this.vy;

        this.stage.update();
    }
}
