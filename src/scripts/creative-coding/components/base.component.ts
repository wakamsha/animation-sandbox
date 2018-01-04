import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

export const baseOptions = {
    template: '<canvas id="stage" class="stage"></canvas>'
};

@Component(baseOptions)
export class BaseComponent implements OnInit {

    protected stage: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
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

    protected init(enableTicker: boolean = true) {
        this.titleService.setTitle(`${this.title} | Animation Sandbox w/ TypeScript`);

        this.stage = document.getElementById('stage') as HTMLCanvasElement;
        this.ctx = this.stage.getContext('2d') as CanvasRenderingContext2D;

        this.interval = Math.floor(100 / 60 * 10);
        window.addEventListener('resize', () => this.onResize());
        this.updateStageSize();

        enableTicker && setInterval(() => this.onEnterFrame(), 1000 / 30);
    }

    protected onEnterFrame() {}

    protected onResized() {}

    private onResize() {
        if (this.resizeTimer) {
            clearTimeout(this.resizeTimer);
            this.onResized();
        }
        this.resizeTimer = setTimeout(() => this.updateStageSize(), this.interval);
    }

    private updateStageSize() {
        this.stage.setAttribute('width', `${window.innerWidth}`);
        this.stage.setAttribute('height', `${window.innerHeight}`);
        this.stageWidth = this.right = this.stage.width;
        this.stageHeight = this.bottom = this.stage.height;
        this.centerX = this.stage.width / 2;
        this.centerY = this.stage.height / 2;
    }
}
