import {Component} from '@angular/core';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Title} from '@angular/platform-browser';

@Component(abstractOptions)
export class MatrixColorfulRainComponent extends AbstractComponent {

    private FONT_FAMILY = 'arial';
    private FONT_SIZE = 10;
    private CHAR_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    private columns = 0;
    private letters: string[];
    private drops: number[] = [];

    constructor(a: Title) {
        super(a);
        this.title = 'Matrix Colorful Rain';
    }

    ngOnInit() {
        super.init();
        this.ctx.font = `${this.FONT_SIZE}px ${this.FONT_FAMILY}`;
        this.letters = this.CHAR_SET.split('');
        this.refreshColumns();
    }

    ngOnDestroy() {
        super.destroy();
    }

    protected onEnterFrame() {
        this.rain();
    }

    protected onResized() {
        this.refreshColumns();
    }

    private rain() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

        for (let i = 0; i < this.drops.length; i = (i + 1)|0) {
            const letter = this.letters[Math.floor(Math.random() * this.letters.length)];
            this.ctx.fillStyle = this.getRandomColor();
            this.ctx.fillText(letter, this.FONT_SIZE * i, this.FONT_SIZE * this.drops[i]);

            if (Math.random() > .99) {
                this.drops[i] = 0;
            }
            this.drops[i] = this.drops[i] + 1;
        }
    }

    private refreshColumns() {
        this.columns = this.stageWidth / this.FONT_SIZE;
        for (let i = 0; i < this.columns; i = (i + 1)|0) {
            this.drops[i] = Math.floor(Math.random() * this.stageHeight);
        }
    }

    private getRandomColor(): string {
        const hue = new Date().getTime() / 50 % 360;
        return `hsl(${hue}, 80%, 70%)`;
    }
}
