import {Component} from '@angular/core';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Title} from '@angular/platform-browser';

@Component(abstractOptions)
export class TvNoiseComponent extends AbstractComponent {

    private dt: ImageData;
    private dd: Uint8ClampedArray;
    private dl: number;

    constructor(a: Title) {
        super(a);
        this.title = 'Noise';
    }

    ngOnInit() {
        super.init();
        this.setupData();
    }

    ngOnDestroy() {
        super.destroy();
    }

    protected onEnterFrame() {
        this.generateNoise();
        this.ctx.fillStyle = this.ctx.createPattern(this.stage, 'repeat');
        this.ctx.fillRect(0, 0, this.stageWidth >> 1, this.stageHeight >> 1);
    }

    protected onResized() {
        this.setupData();
    }

    private setupData() {
        this.dt = this.ctx.createImageData(this.stageWidth, this.stageHeight);
        this.dd = this.dt.data;
        this.dl = this.dt.width * this.dt.height;
    }

    private generateNoise() {
        let p = 0;
        for (let i = 0; i < this.dl; i++) {
            const c = Math.floor(Math.random() * 256);
            this.dd[p++] = c;
            this.dd[p++] = c;
            this.dd[p++] = c;
            this.dd[p++] = 255;
        }
        this.ctx.putImageData(this.dt, 0, 0);
    }
}
