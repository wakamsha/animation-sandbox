import {Component} from '@angular/core';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Title} from '@angular/platform-browser';

@Component(abstractOptions)
export class SphereComponent extends AbstractComponent {

    private time = 0;

    constructor(a: Title) {
        super(a);
        this.title = 'Sphere';
    }

    ngOnInit() {
        super.init();
    }

    ngOnDestroy() {
        super.destroy();
    }

    protected onEnterFrame() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.ctx.fillStyle = 'rgba(0, 255, 255, .5)';
        this.ctx.globalCompositeOperation = 'lighter';

        this.time += .1;

        let i = 10000;
        while (i--) {
            const r = ((this.stageWidth + this.stageHeight) * .4) *( Math.cos((this.time + i) * (.05 + ((Math.sin(this.time * .00002) / Math.PI) * .2))) / Math.PI);
            this.ctx.fillRect(Math.sin(i) * r + this.centerX, Math.cos(i) * r + this.centerY, 1, 1);
        }
    }
}
