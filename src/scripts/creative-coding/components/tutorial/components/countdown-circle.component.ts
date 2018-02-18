import {Component} from '@angular/core';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Title} from '@angular/platform-browser';

@Component(abstractOptions)
export class CountdownCircleComponent extends AbstractComponent {

    private COLOR_GAUGE = '#B0CCF5';
    private COLOR_BG = '#0B41A0';
    private RADIUS_GAUGE = 152;
    private RADIUS_BG = 136;
    private FONT_SIZE = 120;

    private angle = 0;
    private maxTime = 8000;
    private timeSpent = 0;
    private lastTime = -1;

    private label = '-1';

    constructor(a: Title) {
        super(a);
        this.title = 'Countdown circle';
    }

    ngOnInit() {
        super.init();
        this.update();
    }

    ngOnDestroy() {
        super.destroy();
    }

    onEnterFrame() {
        this.update();
    }

    private draw() {
        // ゲージ
        this.ctx.fillStyle = this.COLOR_GAUGE;
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.arc(this.centerX, this.centerY, this.RADIUS_GAUGE, (-this.angle - 90) * Math.PI / 180, (0 - 90) * Math.PI / 180, false);
        this.ctx.fill();
        this.ctx.closePath();

        // 背景塗り
        this.ctx.fillStyle = this.COLOR_BG;
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.arc(this.centerX, this.centerY, this.RADIUS_BG, 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.closePath();

        // ラベル
        this.ctx.textAlign = 'center';

        this.ctx.font = 'bold 24px Hiragino Kaku Gothic Pro';
        this.ctx.fillStyle = this.COLOR_GAUGE;
        this.ctx.fillText('先読みタイム', this.centerX, this.centerY - 76);

        this.ctx.font = `bold ${this.FONT_SIZE}px Helvetica`;
        this.ctx.fillStyle = this.COLOR_GAUGE;
        this.ctx.fillText(this.label, this.centerX, this.centerY + 40);

        this.ctx.font = 'bold 20px Hiragino Kaku Gothic Pro';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText('スキップする', this.centerX, this.centerY + 86);
    }

    private update() {
        const now = Date.now();
        if (this.lastTime > 0) {
            this.timeSpent += (now - this.lastTime);
        }
        this.lastTime = now;
        const remainTime = this.maxTime - this.timeSpent;
        const time = remainTime < 0 ? 0 : remainTime;
        this.angle = 360 * (time / this.maxTime);
        this.label = Math.round(time / 1000).toString();

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageWidth);
        this.draw();
    }
}
