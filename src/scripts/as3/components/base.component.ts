import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

export const baseOptions = {
    template: '<canvas id="stage" class="stage"></canvas>'
};

@Component(baseOptions)
export class BaseComponent implements OnInit {

    protected stage: createjs.Stage;
    protected canvas: HTMLCanvasElement;
    protected top = 0;
    protected bottom = 0;
    protected left = 0;
    protected right = 0;
    protected stageWidth = 0;
    protected stageHeight = 0;
    protected centerX = 0;
    protected centerY = 0;

    protected title: string;

    private resizeTimer: any;
    private interval = 0;

    constructor(private titleService: Title) {}

    ngOnInit() {}

    protected init() {
        this.titleService.setTitle(`${this.title} | Animation Sandbox w/ TypeScript`);

        this.stage = new createjs.Stage('stage');
        this.canvas = <HTMLCanvasElement>this.stage.canvas;
        this.interval = Math.floor(100 / 60 * 10);
        window.addEventListener('resize', () => this.onResize());
        this.updateStageSize();
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener('tick', () => this.onEnterFrame());
    }

    protected onEnterFrame() {}

    private onResize() {
        if (this.resizeTimer) {
            clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = setTimeout(() => this.updateStageSize(), this.interval);
    }

    private updateStageSize() {
        this.canvas.setAttribute('width', window.innerWidth.toString());
        this.canvas.setAttribute('height', window.innerHeight.toString());

        this.right = this.stageWidth = this.canvas.width;
        this.bottom = this.stageHeight = this.canvas.height;
        this.centerX = this.stageWidth / 2;
        this.centerY = this.stageHeight / 2;
    }
}
