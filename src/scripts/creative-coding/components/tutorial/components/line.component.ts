import {Component} from '@angular/core';
import {AbstractComponent, abstractOptions} from '../../abstract.component';
import {Title} from '@angular/platform-browser';
import {Position} from '../../../../declares/interface';

@Component(abstractOptions)
export class LineComponent extends AbstractComponent {

    private mousePos: Position;

    constructor(a: Title) {
        super(a);
        this.title = 'Line';
    }

    ngOnInit() {
        super.init();
        this.mousePos = { x: 0, y: 0 };
        this.stage.addEventListener('mousemove', (e) => this.mousePos = this.getMousePosition(e));
    }

    ngOnDestroy() {
        super.destroy();
        this.stage.removeEventListener('mousemove', this.stage.onmousemove);
    }

    onEnterFrame() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 6;
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.lineTo(this.mousePos.x, this.mousePos.y);
        this.ctx.stroke();
    }

    private getMousePosition(e: MouseEvent): Position {
        const rect = this.stage.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
}
