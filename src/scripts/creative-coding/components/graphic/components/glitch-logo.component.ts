import {Component} from '@angular/core';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Title} from '@angular/platform-browser';

@Component(abstractOptions)
export class GlitchLogoComponent extends AbstractComponent {

    private img: HTMLImageElement;
    private imageSize = 500;
    private lastTime = 0;

    constructor(a: Title) {
        super(a);
        this.title = 'Glitch logo';
    }

    ngOnInit() {
        super.init();
        this.img = new Image();
        this.img.src = '/assets/images/logo-wakamsha@500.jpg';
        this.lastTime = new Date().getTime();
    }

    ngOnDestroy() {
        super.destroy();
    }

    onEnterFrame() {
        const t = new Date().getTime();
        if (t - this.lastTime < 500 ) return;
        this.lastTime = t;

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.ctx.drawImage(this.img, this.centerX - (this.imageSize / 2), this.centerY - (this.imageSize / 2), this.imageSize, this.imageSize);
        setTimeout(() => this.glitch(), this.randomInt(250, 1000));
    }

    private glitch() {
        for(let i =0; i < this.randomInt(1, 13); i++) {
            const x = Math.random() * this.stageWidth / 2;
            const y = Math.random() * this.stageHeight;
            const spliceWidth = this.stageWidth - x;
            const spliceHeight = this.randomInt(5, this.stageHeight / 10);
            this.ctx.drawImage(this.stage, this.stageWidth / 3, y, spliceWidth, spliceHeight, x, y, spliceWidth, spliceHeight);
            this.ctx.drawImage(this.stage, spliceWidth, y, x, spliceHeight, 0, y, x, spliceHeight);
        }
    }

    private randomInt(a: number, b: number): number {
        return ~~(Math.random() * (b - a) + a);
    }
}
